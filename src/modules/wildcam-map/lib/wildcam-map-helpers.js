/*
WildCam Map - Helpers
---------------------

Part of the WildCam Map feature.

This library contains general utility functions required by the WildCam Map.

--------------------------------------------------------------------------------
 */

export function constructWhereClause(mapConfig, selectedFilters) {
  if (!mapConfig || !mapConfig.map || !mapConfig.map.filters || !selectedFilters) return '';

  let sqlWhere = '';

  const keys = Object.keys(selectedFilters);

  // For each filter type...
  const sqlSelectedFilters = keys.map((key) => {
    const filter = mapConfig.map.filters[key];

    if (filter.type === 'multichoice') {
      let sqlSelectedOptions = selectedFilters[key].map((val) => `[${sqlString(key)}] LIKE '${sqlString(val)}'`);
      sqlSelectedOptions = sqlSelectedOptions.join(' OR ');
      return `(${sqlSelectedOptions})`;
    }
    // TODO: Add more choices

    return '(1 = 1)'; // Default true statement
  });

  sqlWhere = sqlSelectedFilters.join(' AND ');

  if (sqlWhere !== '') sqlWhere = ` WHERE ${sqlWhere} `;

  return sqlWhere;
}

export function sqlString(str) {
  return str.replace(/'/ig, '\'\'');
}
