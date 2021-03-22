# Refine CSV
# ----------
#
# Reads a CSV file (usually a Zooniverse Subjects export or Classifications
# export) and filters for specific rows. 
#
# Usage:
#   TODO

import sys, csv

if len(sys.argv) < 5:
  print('ERROR: not enough arguments')
  sys.exit()

inputFilename = sys.argv[1]
outputFilename = sys.argv[2]
columnName = sys.argv[3]
columnValue = sys.argv[4]

with open(inputFilename, newline='') as inputFile:
  inputReader = csv.DictReader(inputFile)
  for inRow in inputReader:
    if inRow[columnName] == columnValue:
      print(inRow)

