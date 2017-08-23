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
  markersDataCount: 0,
  
  filters: {},  //Selected filtes
};

const MAPEXPLORER_PROPTYPES = {
  markersData: PropTypes.object,  //GeoJSON object.
  markersError: PropTypes.object,
  markersStatus: PropTypes.string,
  markersDataCount: PropTypes.number,
  
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

const setMarkersDataCount = (state, markersDataCount) => {
  return { ...state, markersDataCount };
};

// Synchonous actions: User-Selected Filters

/*  Adds to a multi-choice filter selection.
 */
const addFilterSelectionItem = (state, item) => {
  const filters = { ...state.filters };
  const key = item.key;
  const value = item.value;
  let newValues = (Array.isArray(filters[key])) ? filters[key].slice() : [];  //If filter doesn't exist (undefined) or isn't an array, init an array. Also, make a new array.
  if (newValues.indexOf(value) === -1) {  //Add the item value if it doesn't exist.
    newValues.push(value);
    filters[key] = newValues;
  }
  return { ...state, filters };
};

/*  Removes from a multi-choice filter selection.
 */
const removeFilterSelectionItem = (state, item) => {
  const filters = { ...state.filters };
  const key = item.key;
  const value = item.value;
  if (!Array.isArray(filters[key])) filters[key] = [];  //If filter doesn't exist (undefined) or isn't an array, init an array.
  filters[key] = filters[key].filter(cur => cur !== value);  //Remove the matching item value. Note that this creates a new array.
  if (filters[key].length === 0) delete filters[key];
  return { ...state, filters };
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
  
  console.log('-'.repeat(40));
  
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
    
    let count = 0;    
    if (geojson && geojson.features) {
      count = geojson.features.reduce((total, item) => {
        if (item.properties && item.properties.count) {
          return total + item.properties.count;
        }
        return total;
      }, 0);
    }
    Actions.mapexplorer.setMarkersDataCount(count);
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
  setMarkersDataCount,
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
