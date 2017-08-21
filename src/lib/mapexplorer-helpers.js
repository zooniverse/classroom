/*
Map Explorer - Helpers
======================

Part of the Map Explorer feature.

This library contains general utility functions required by the Map Explorer.

********************************************************************************
 */

export function constructWhereClause(mapConfig, filters) {
  
  console.log('>'.repeat(40));
  
  if (!mapConfig || !mapConfig.map || !mapConfig.map.filter || !filters)
    return '';
  
  let sqlWhere = '';
  
  const keys = Object.keys(mapConfig.map.filters);
  
  console.log('---'.repeat(40));
  
  let selectedFilters = filters.map((filter) => {
    console.log(filter);
    
    return '';
  });
  
  console.log('!!!');
  
  
  
  
  
  if (sqlWhere !== '') sqlWhere = ' WHERE ' + sqlWhere + ' ';
  
  return sqlWhere;
}