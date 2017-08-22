/*
Map Explorer - Data Connection and Duck
=======================================

Part of the Map Explorer feature.

This component has two functions:
* store the common data values (e.g. the selected filters) used across each Map
  Explorer component.
* Connect to the external database containing the necessary map (geoJson) data.

********************************************************************************
 */

import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import { constructWhereClause } from '../lib/mapexplorer-helpers.js';

// Constants
const MAPEXPLORER_MARKERS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Initial State and PropTypes - usable in React components.
const MAPEXPLORER_INITIAL_STATE = {
  markersData: null,
  markersStatus: MAPEXPLORER_MARKERS_STATUS.IDLE,
  markersError: null,
  
  filters: {},  //Selected filtes
};

const MAPEXPLORER_PROPTYPES = {
  markersData: PropTypes.object,  //GeoJSON object.
  markersError: PropTypes.object,
  markersStatus: PropTypes.string,
  
  filters: PropTypes.object,  //Dynamically constructed object.
};

/*
--------------------------------------------------------------------------------
 */

// Synchonous actions: Map Markers
const setMarkersStatus = (state, markersStatus) => {
  return { ...state, markersStatus };
};

const setMarkersData = (state, markersData) => {
  return { ...state, markersData };
};

const setMarkersError = (state, markersError) => {
  return { ...state, markersError };
};

// Synchonous actions: User-Selected Filters

/*  Adds to a multi-choice filter selection.
 */
const addFilterSelectionItem = (state, item) => {
  const filters = { ...state.filters };
  const key = item.key;
  const value = item.value;
  if (!Array.isArray(filters[key])) filters[key] = [];  //If filter doesn't exist (undefined) or isn't an array, init an array.
  if (filters[key].indexOf(value) === -1) {  //Add the item value if it doesn't exist.
    filters[key].push(value);
  }
  return { ...state, filters };
  //Warning: existing filters[key] are changed as-is, no new object is created.
};

/*  Removes from a multi-choice filter selection.
 */
const removeFilterSelectionItem = (state, item) => {
  const filters = { ...state.filters };
  const key = item.key;
  const value = item.value;
  if (!Array.isArray(filters[key])) filters[key] = [];  //If filter doesn't exist (undefined) or isn't an array, init an array.
  filters[key] = filters[key].filter(cur => cur !== value);  //Remove the matching item value.
  if (filters[key].length === 0) delete filters[key];
  return { ...state, filters };
  //Warning: existing filters[key] are changed as-is, no new object is created.
};

/*  Sets (or delete) a filter selection.
 */
const setFilterSelectionItem = (state, key, value) => {
  const filters = { ...state.filters };
  if (value === null || value === undefined) {
    delete filters[key];
  } else {
    filters[key] = value;
  }
  return { ...state, filters };
};

/*
--------------------------------------------------------------------------------
 */

// Effects are for async actions and get automatically to the global Actions list
Effect('getMapMarkers', (payload = {}) => {
  const mapConfig = payload.mapConfig;
  const selectedFilters = payload.filters;
  
  if (!mapConfig) return;  //We absolutely need mapConfig, but we're fine if filters is null or undefined (i.e. user has not selected any filters.) 
  
  Actions.mapexplorer.setMarkersStatus(MAPEXPLORER_MARKERS_STATUS.FETCHING);
  const where = constructWhereClause(mapConfig, selectedFilters);
  const url = mapConfig.database.urls.geojson.replace(
    '{SQLQUERY}',
    encodeURIComponent(mapConfig.database.queries.selectCameraCount.replace('{WHERE}', where))
  );
  
  superagent.get(url)
  .then(response => {
    if (!response) { throw 'ERROR (ducks/mapexplorer/getMapMarkers): No response'; }
    if (response.ok && response.body) {
      return response.body;
    }
    throw 'ERROR (ducks/mapexplorer/getMapMarkers): invalid response';
  })
  .then(geojson => {
    Actions.mapexplorer.setMarkersStatus(MAPEXPLORER_MARKERS_STATUS.SUCCESS);
    Actions.mapexplorer.setMarkersData(geojson);
  })
  .catch(err => {
    Actions.mapexplorer.setMarkersStatus(MAPEXPLORER_MARKERS_STATUS.ERROR);
    console.error(err);
  });
});

/*
--------------------------------------------------------------------------------
 */

const mapexplorer = State('mapexplorer', {
  // Initial state
  initial: MAPEXPLORER_INITIAL_STATE,
  // Actions
  setMarkersStatus,
  setMarkersData,
  setMarkersError,
  addFilterSelectionItem,
  removeFilterSelectionItem,
  setFilterSelectionItem,
});

export default mapexplorer;
export {
  MAPEXPLORER_MARKERS_STATUS,
  MAPEXPLORER_INITIAL_STATE,
  MAPEXPLORER_PROPTYPES,
};
