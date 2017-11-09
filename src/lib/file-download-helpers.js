/*  Auto-generated a filename, for downloading purposes.
 */
export function generateFilename(basename = 'download-', extension = '.csv') {
  let timeString = new Date();
  timeString =
    timeString.getDate() +
    ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][timeString.getMonth()] +
    timeString.getFullYear();
  return basename + timeString + extension;
}

/*  Transforms data into a blobby blob for downloading purposes.
 */
export function blobbifyData(data, contentType = 'text/csv') {
  if (data) {
    let dataBlob = new Blob([data], {type: contentType});
    return dataBlob;
  }
  return null;
}
