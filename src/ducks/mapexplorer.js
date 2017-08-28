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
import { constructWhereClause, sqlString } from '../lib/mapexplorer-helpers.js';

// Constants
const MAPEXPLORER_MARKERS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
};

const MAPEXPLORER_CAMERA_STATUS = {
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
  
  activeCameraId: null,
  activeCameraMetadata: null,
  activeCameraMetadataStatus: MAPEXPLORER_CAMERA_STATUS.IDLE,
  activeCameraData: null,
  activeCameraDataStatus: MAPEXPLORER_CAMERA_STATUS.IDLE,
  
  filters: {},  //Selected filtes
};

const MAPEXPLORER_PROPTYPES = {
  markersData: PropTypes.object,  //GeoJSON object.
  markersError: PropTypes.object,
  markersStatus: PropTypes.string,
  markersDataCount: PropTypes.number,
  
  activeCameraId: PropTypes.string,
  activeCameraMetadata: PropTypes.object,
  activeCameraMetadataStatus: PropTypes.string,
  activeCameraData: PropTypes.arrayOf(PropTypes.object),
  activeCameraDataStatus: PropTypes.string,
  
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

const resetActiveCamera = (state) => {
  return {
    ...state,
    activeCameraId: MAPEXPLORER_INITIAL_STATE.activeCameraId,
    activeCameraMetadata: MAPEXPLORER_INITIAL_STATE.activeCameraMetadata,
    activeCameraMetadataStatus: MAPEXPLORER_INITIAL_STATE.activeCameraMetadataStatus,
    activeCameraData: MAPEXPLORER_INITIAL_STATE.activeCameraData,
    activeCameraDataStatus: MAPEXPLORER_INITIAL_STATE.activeCameraDataStatus,
  };
};

const setActiveCameraId = (state, activeCameraId) => {
  return { ...state, activeCameraId };
};

const setActiveCameraMetadata = (state, activeCameraMetadata) => {
  return { ...state, activeCameraMetadata };
};

const setActiveCameraMetadataStatus = (state, activeCameraMetadataStatus) => {
  return { ...state, activeCameraMetadataStatus };
};

const setActiveCameraData = (state, activeCameraData) => {
  return { ...state, activeCameraData };
};

const setActiveCameraDataStatus = (state, activeCameraDataStatus) => {
  return { ...state, activeCameraDataStatus };
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
  const url = mapConfig.database.urls.geojson.replace('{SQLQUERY}',
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

//----------------------------------------------------------------

Effect('getActiveCamera', (payload = {}) => {
  const mapConfig = payload.mapConfig;
  const selectedFilters = payload.filters;
  const cameraId = payload.cameraId;
  
  if (!mapConfig) return;  
  if (!cameraId) return;
  
  Actions.mapexplorer.setActiveCameraId(cameraId);
  Actions.mapexplorer.setActiveCameraDataStatus(MAPEXPLORER_CAMERA_STATUS.FETCHING);
  Actions.mapexplorer.setActiveCameraMetadataStatus(MAPEXPLORER_CAMERA_STATUS.FETCHING);
  
  let where, url;
  
  //Get Camera Data
  //--------------------------------
  where = constructWhereClause(mapConfig, selectedFilters);
  where = (where === '')  //TODO: Move this to the project config. This is very project-specific.
    ? ` WHERE camera LIKE '${sqlString(cameraId)}'`
    : where + ` AND camera LIKE '${sqlString(cameraId)}'`;
  url = mapConfig.database.urls.json.replace('{SQLQUERY}',
    encodeURIComponent(mapConfig.database.queries.selectCameraData.replace('{WHERE}', where))
  );
  superagent.get(url)
  .then(response => {
    if (!response) { throw 'ERROR (ducks/mapexplorer/getActiveCamera Data): No response'; }
    if (response.ok && response.body) {
      return response.body;
    }
    throw 'ERROR (ducks/mapexplorer/getActiveCamera Data): invalid response';
  })
  .then(json => {
    Actions.mapexplorer.setActiveCameraDataStatus(MAPEXPLORER_CAMERA_STATUS.SUCCESS);
    Actions.mapexplorer.setActiveCameraData(json.rows);    
  })
  .catch(err => {
    Actions.mapexplorer.setActiveCameraDataStatus(MAPEXPLORER_CAMERA_STATUS.ERROR);
    console.error(err);
  });
  //--------------------------------
  
  //Get Camera Metadata
  //--------------------------------
  where = ` WHERE id LIKE '${sqlString(cameraId)}'`;  //TODO: Move this to the project config. This is very project-specific.
  url = mapConfig.database.urls.json.replace('{SQLQUERY}',
    encodeURIComponent(mapConfig.database.queries.selectCameraMetadata.replace('{WHERE}', where))
  );
  superagent.get(url)
  .then(response => {
    if (!response) { throw 'ERROR (ducks/mapexplorer/getActiveCamera Metadata): No response'; }
    if (response.ok && response.body) {
      return response.body;
    }
    throw 'ERROR (ducks/mapexplorer/getActiveCamera Metadata): invalid response';
  })
  .then(json => {
    Actions.mapexplorer.setActiveCameraMetadataStatus(MAPEXPLORER_CAMERA_STATUS.SUCCESS);
    if (json && json.rows) {
      Actions.mapexplorer.setActiveCameraMetadata(json.rows[0]);  //SELECT query should only return one result.
    } else {
      Actions.mapexplorer.setActiveCameraMetadata(null);
    }    
  })
  .catch(err => {
    Actions.mapexplorer.setActiveCameraMetadataStatus(MAPEXPLORER_CAMERA_STATUS.ERROR);
    console.error(err);
  });
  //--------------------------------
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
  resetActiveCamera,
  setActiveCameraId,
  setActiveCameraMetadata,
  setActiveCameraMetadataStatus,
  setActiveCameraData,
  setActiveCameraDataStatus,
  addFilterSelectionItem,
  removeFilterSelectionItem,
  setFilterSelectionItem,
});

export default mapexplorer;
export {
  MAPEXPLORER_MARKERS_STATUS,
  MAPEXPLORER_CAMERA_STATUS,
  MAPEXPLORER_INITIAL_STATE,
  MAPEXPLORER_PROPTYPES,
};
