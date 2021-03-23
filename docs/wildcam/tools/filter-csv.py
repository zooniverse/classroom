# Filter CSV
# ----------
#
# Reads a CSV file (usually a Zooniverse Subjects export or Classifications
# export) and filters for rows with specific values.
#
# Usage:
#   python3 filter-csv.py inputFilename.csv outputFilename.csv columnName columnValue
#
# Example
#   "Get all classifications made by user darkeshard"
#   python3 filter-csv.py gorongosa-classifications.csv output.csv user_name darkeshard
#
# (@shaunanoordin 20210322)

import sys, csv

if len(sys.argv) < 5:
  print('ERROR: not enough arguments')
  sys.exit()

inputFilename = sys.argv[1]
outputFilename = sys.argv[2]
columnName = sys.argv[3]
columnValue = sys.argv[4]

with open(inputFilename, mode='r', newline='') as inputFile, \
     open(outputFilename, mode='w+', newline='') as outputFile:
  
  inputReader = csv.DictReader(inputFile)
  outputWriter = csv.DictWriter(outputFile, fieldnames=inputReader.fieldnames)
  outputWriter.writeheader()
  
  for inRow in inputReader:
    if inRow[columnName] == columnValue:
      outputWriter.writerow(inRow)
      print(inRow)
