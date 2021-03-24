# Process Subjects (WildWatch Kenya)
# ----------------------------------
#
# Reads a Zooniverse Subject export CSV file and makes it ready to be added to
# the map database. Usually, this is used to extract information buried in the
# subjects.locations and subjects.metadata fields, and bring that info to the
# top-level.
#
# Usage:
#   python3 process-kenya-subjects.py inputFilename.csv outputFilename.csv
#
# (@shaunanoordin 20210322)

import sys, csv, json, re

if len(sys.argv) < 3:
  print('ERROR: not enough arguments')
  sys.exit()

inputFilename = sys.argv[1]
outputFilename = sys.argv[2]

with open(inputFilename, mode='r', newline='') as inputFile, \
     open(outputFilename, mode='w+', newline='') as outputFile:
  
  # Read the input CSV
  inputReader = csv.DictReader(inputFile)
  
  # Prepare the output CSV
  fieldnames = ['subject_id', 'kenya_id', 'camera', 'location', 'subject_set_id', 'workflow_id', 'project_id', 'camera_name', 'year', 'month']
  outputWriter = csv.DictWriter(outputFile, fieldnames=fieldnames)
  outputWriter.writeheader()
  
  for inRow in inputReader:
    
    # Make a copy of the input row
    outRow = {}
    for col in fieldnames:
      if col in inRow.keys():
        outRow[col] = inRow[col]
    
    # Prepare JSON fields
    locations = json.loads(inRow['locations'])
    metadata = json.loads(inRow['metadata'])
    
    # --------------------------------
    
    # Extract project-specific information
    metadata_name = re.sub('_(\d)+\.JPG$', '', metadata['name'])
    
    tmp = re.search('(^|_|-)([A-Z]+[0-9]+)(_|-)', metadata_name)
    camera_name = tmp.group(2) if tmp else ''
    
    tmp = re.search('(^|_|-)(20\d\d)(_|-)', metadata_name)
    year = tmp.group(2) if tmp else ''
    
    tmp = re.search('(^|_|-)(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)(_|-)', metadata_name, re.IGNORECASE)
    month = tmp.group(2).upper()[0:3] if tmp else ''
    
    # Save the project-specific information
    outRow['kenya_id'] = metadata['name']
    outRow['camera'] = camera_name + '_' + year + '_' + month
    outRow['location'] = locations['0']
    outRow['camera_name'] = camera_name
    outRow['year'] = year
    outRow['month'] = month
    
    # --------------------------------
    
    # Print the output row
    outputWriter.writerow(outRow)
    print(outRow)
