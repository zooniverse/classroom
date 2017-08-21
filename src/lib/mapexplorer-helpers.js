/*
Map Explorer - Helpers
======================

Part of the Map Explorer feature.

This library contains general utility functions required by the Map Explorer.

********************************************************************************
 */

export function constructWhereClause(mapConfig, filters) {
  //let sqlWhere = ' data_choice LIKE \'nothinghere\' ';
  let sqlWhere = '';
  
  if (sqlWhere !== '') sqlWhere = ' WHERE ' + sqlWhere + ' ';
  
  return sqlWhere;
}