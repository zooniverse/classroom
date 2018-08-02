/*
Wildcam Subjects Processor
--------------------------

A data-processing tool for WildCam-type programs in Zooniverse Classrooms
(Education API Front End).

This script processes a Subject CSV file (of a WildCam-type project, exported
from the Zooniverse.org project page) into a data format that's more compatible
with the map databases. This is required since - as in the case with WildCam
Gorongosa and WildCam Darien - the important geographical map data is buried
in the "metadata" field of the CSV, encoded as a string.

Only works for known WildCam-type programs.

Usage:
- Requires NodeJS.
- Run in command line: node (this-file) (program) (CSV-file-to-process)
  e.g. node wildcam-subject-process.js darien wildcam-darien-subjects.csv
- Output file: PROCESSED_SUBJECTS.csv

(@shaun.a.noordin, 20180720)

********************************************************************************
 */

'use strict';
var fs = require('fs');  //FileSystem; used to read/write files.

const OUTPUT_FILE = './PROCESSED_SUBJECTS.csv';
const SANITY_LIMIT = 10000001;  //Some CSV files are HUGE. Let's not break our
                            //machines with them.

if (process.argv.length < 4) {
  console.log('Not enough arguments.');
  return;
}

fs.readFile(process.argv[3], 'utf8', function (err, data) {
  if (err) {  //Error? Bleargh!
    throw err;
  }
  
  parseSubjectsCsv(data, process.argv[2]);
});

/*
================================================================================
 */

function parseSubjectsCsv(rawText, program) {
  //Setup
  //----------------------------------------------------------------
  let csvRows = [];
  if (rawText.indexOf('\r\n') >= 0) {
    csvRows = rawText.split('\r\n');
  } else if (rawText.indexOf('\n\r') >= 0) {
    csvRows = rawText.split('\n\r');
  } else if (rawText.indexOf('\n') >= 0) {
    csvRows = rawText.split('\n');
  } else if (rawText.indexOf('\r') >= 0) {
    csvRows = rawText.split('\r');
  }  
  if (csvRows.length == 0) {
    console.log('Nothing to process.');
    return '';
  }
  console.log('CSV rows:             ' + csvRows.length);
  console.log('Rows being processed: ' + Math.min(csvRows.length, SANITY_LIMIT));
  console.log('(Includes headers)');
  //----------------------------------------------------------------
  
  //Select Program
  //----------------------------------------------------------------
  let programObject = {};
  //The Program object maps the data fields from the input (i.e. the Zooniverse
  //Subject CSV) onto data fields that the map database wants. For example,
  //let's say the map database wants a field called 'camera_id', but that value
  //is buried in the Zooniverse Subject as 'zooniverse_subject.metadata.camera'.
  //We'll get that data by specifying an 'extractor' function like...
  //  programObject["camera_id"] = (inputRow) => {
  //    return inputRow.metadata.camera || '';
  //  }
  
  //Program objects are of course SPECIFIC to a certain Education Program.
  
  switch (program) {
    case "darien":
      programObject = {
        'subject_id': i => i.subject_id || '',
        'darien_id': i => (i.metadata && (i.metadata.Darien_id || i.metadata.darien_id)) || '',
        'camera': i => (i.metadata && i.metadata.camera && i.metadata.camera.replace(/[ab]$/i, '').toUpperCase()) || '',  //Flatten all cameras, e.g. `cp01a` -> `CP01`
        'location': i => (i.locations && i.locations[0]) || '',
        'season': i => (i.metadata && i.metadata.season) || '',
        'month': i => (i.metadata && i.metadata.month) || '',
        'time': i => (i.metadata && (i.metadata.Time || i.metadata.time)) || '',
        'date': i => (i.metadata && (i.metadata.Date || i.metadata.date)) || '',
        'year': i => (i.metadata && i.metadata.year) || '',
        'time_period': i => (i.metadata && i.metadata.time_period) || '',
        'classification_count': i => i.classification_count || '0',
        'subject_set_id': i => i.subject_set_id || '',
        'workflow_id': i => i.workflow_id || '',
        'project_id': i => i.project_id || '',
        //'retirement_reason': i => i.retirement_reason || '',  //Not needed by WildCam Darien Lab.
        //'locations': i => i.locations || '',
        //'metadata': i => i.metadata || '',
        //'retired_at': i => i.retired_at || '',
      }
      break;
  }
  //----------------------------------------------------------------
  
  //Prepare the output CSV
  //----------------------------------------------------------------
  //The first row is the header.
  let csvOutputHeader = [];
  let csvOutputRows = [];
  
  csvOutputHeader = Object.keys(programObject);
  //----------------------------------------------------------------
  
  //Go through each row and process the data.
  //----------------------------------------------------------------
  //Process the header row first; this will be referenced later.
  let inputHeader = splitCsvRow(csvRows[0]);
  
  //Go through each item row.
  for (var i = 1; i < csvRows.length; i++) {
    //First, convert the row data, from a string to an array.
    let rowArray = splitCsvRow(csvRows[i]);
    
    //Second, convert the row array into a row object.
    let inputObject = createRowObject(inputHeader, rowArray);
    
    //Now, start mapping the row fields in the input object into the desired
    //shape that the map database requires.
    let outputRow = Object.keys(programObject).map((key) => {
      return programObject[key](inputObject);
    });
    
    //Done.
    csvOutputRows.push(outputRow);
  }
  //----------------------------------------------------------------
  
  //Convert the output object into an output string that can be written to file.
  //----------------------------------------------------------------
  const csvStr = str => '"' + str.replace(/"/g, '""') + '"';
  const NL = '\r\n';  //New line
  
  let outputText = csvOutputHeader.map(val => csvStr(val)) + NL;
  
  outputText += csvOutputRows.map(row => {
    return row.map(val => csvStr(val)).join(',');
  }).join(NL);
  //----------------------------------------------------------------
  
  //Write to file!
  //----------------------------------------------------------------
  fs.writeFile(OUTPUT_FILE, outputText, function(err) {
    if (err) {  //Error? Bleargh!
      throw err;
    }
    console.log('Completed: CSV written to ' + OUTPUT_FILE);
  });
  console.log('-'.repeat(80));
  //----------------------------------------------------------------
  
  //...and we're done.
}

/*
================================================================================
 */

/*  Reads a row from a CSV (a string) and returns an array.  
    Assumes big fields are marked by quotation marks ("), and the escape
    character is the same quotation mark ("").
    e.g. one,two,"{number:""three""}"
 */
function splitCsvRow(csvRow) {
  //Sanity check
  if (typeof(csvRow) !== 'string') return null;
  if (csvRow.trim().length === 0) return null;
  
  let outputFields = [];
  let row = csvRow.trim();
  let startIndex = 0, inQuotes = false;
  
  //Go through each character in the row, and extract each field (aka column).
  for (let i = 0; i < csvRow.length; i++) {
    let c = csvRow[i];
    if (c === '"') inQuotes = !inQuotes;    
    if (!inQuotes && (c === ',' || i+1 === csvRow.length)) {
      let field = csvRow.substring(startIndex, i);
      outputFields.push(field);
      startIndex = i + 1;
    }
  }
  
  //Parse any JSON objects.
  for (var i = 0; i < outputFields.length; i++) {
    let fieldValue = outputFields[i];
    if (/^"{.*}"$/.test(fieldValue)) {
      fieldValue = fieldValue  //Clean up the CSV-ed string into a JSON string.
        .trim()
        .replace(/^"{/, '{')
        .replace(/}"$/, '}')
        .replace(/""/g, '"');
      try {  //Now convert the cleaned JSON string into a JSON object.
        outputFields[i] = JSON.parse(fieldValue);
      } catch (err) {
        outputFields[i] = {};
      }
    }
  }
  
  return outputFields;
}

/*
================================================================================
 */

/*  Converts the extracted header and row values of a CSV file into an object
    for easy lookup.
    e.g.
    header = ["name", "profession"]
    row = ["shaun", "developer"]
    output = { "name": "shaun", "profession": "developer" }
 */
function createRowObject(header, row) {
  if (!Array.isArray(header) || !Array.isArray(row)) return {};  //Sanity check
  
  let output = {};
  for (let i = 0; i < header.length && i < row.length; i++) {
    output[header[i]] = row[i];
  }
  return output;
}

/*
================================================================================
 */
     