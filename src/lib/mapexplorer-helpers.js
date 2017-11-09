/*
Map Explorer - Helpers
======================

Part of the Map Explorer feature.

This library contains general utility functions required by the Map Explorer.

********************************************************************************
 */

export function constructWhereClause(mapConfig, selectedFilters) {
  if (!mapConfig || !mapConfig.map || !mapConfig.map.filters || !selectedFilters)
    return '';

  let sqlWhere = '';

  const keys = Object.keys(selectedFilters);

  //For each filter type...
  let sqlSelectedFilters = keys.map((key) => {
    const filter = mapConfig.map.filters[key];

    if (filter.type === 'multichoice') {
      let sqlSelectedOptions = selectedFilters[key].map(val => `${sqlString(key)} LIKE '${sqlString(val)}'`);
      sqlSelectedOptions = sqlSelectedOptions.join(' OR ');
      return `(${sqlSelectedOptions})`;
    }
    //TODO: Add more choices

    return '(1 = 1)';  //Default true statement
  });

  sqlWhere = sqlSelectedFilters.join(' AND ');

  if (sqlWhere !== '') sqlWhere = ' WHERE ' + sqlWhere + ' ';

  return sqlWhere;
}

export function sqlString(str) {
  return str.replace(/'/ig, "''");
}
