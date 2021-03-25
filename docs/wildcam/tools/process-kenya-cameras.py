# Process Cameras (WildWatch Kenya)
# ----------------------------------
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
  fieldnames = ['id', 'camera_name', 'latitude', 'longitude', 'season']
  outputWriter = csv.DictWriter(outputFile, fieldnames=fieldnames)
  outputWriter.writeheader()
  
  for inRow in inputReader:
    
    outRow = {}
    
    tmp = re.search('("|_|-)([A-Z]+[0-9]+)(_|-)', inRow['metadata'])
    camera_name = tmp.group(2) if tmp else ''
    # Alternatively: camera_name = inRow['Camera ID']
    
    tmp = re.search('(^|_|-)(20\d\d)(_|-)', inRow['metadata'])
    year = tmp.group(2) if tmp else ''
    
    tmp = re.search('(^|_|-)(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)(_|-)', inRow['metadata'], re.IGNORECASE)
    month = tmp.group(2).upper()[0:3] if tmp else ''
    
    # We designate "Camera ID" as a unique combination of camera name (e.g. K9), year, and month, since individual cameras tend to move position over time.
    outRow['id'] = camera_name + '_' + year + '_' + month
    
    print(inRow)
    
    outRow['camera_name'] = camera_name
    outRow['latitude'] = inRow['Lat ']
    outRow['longitude'] = inRow['Long']
    outRow['season'] = inRow['Season']
    
    # Print the output row
    outputWriter.writerow(outRow)
    print(outRow)
