/*
WildCam Map - Data Connection and Duck
--------------------------------------

Part of the WildCam Map feature.

This component has two functions:
- store the common data values (e.g. the selected filters) used across each
  WildCam Map component.
- Connect to the external database containing the necessary map (geoJson) data.

--------------------------------------------------------------------------------
 */

import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import { constructWhereClause, sqlString } from '../lib/wildcam-map-helpers.js';

/*
--------------------------------------------------------------------------------
 */

// Constants
// ---------

const WILDCAMMAP_MARKERS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error'
};

const WILDCAMMAP_CAMERA_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error'
};

/*
--------------------------------------------------------------------------------
 */

// Initial State / Default Values
// ------------------------------

/*  WILDCAMMAP_INITIAL_STATE defines the default/starting values of the Redux
    store. To use this in your Redux-connected React components, try...
    Usage:
      MyReactComponent.defaultProps = {
        ...WILDCAMMAP_INITIAL_STATE,
        otherProp: 'default value'
      };
 */
const WILDCAMMAP_INITIAL_STATE = {
  markersData: null,
  markersStatus: WILDCAMMAP_MARKERS_STATUS.IDLE,
  markersError: null,
  markersDataCount: 0,

  activeCameraId: null,
  activeCameraMetadata: null,
  activeCameraMetadataStatus: WILDCAMMAP_CAMERA_STATUS.IDLE,
  activeCameraData: null,
  activeCameraDataStatus: WILDCAMMAP_CAMERA_STATUS.IDLE,

  filters: {}, // Selected filters

  showHelp: null, // If set to a valid string value, shows the help/tutoria/guide for the specified activity.

  // Connection between WildCam Classroom and WildCam Map
  wccwcmMapPath: '', // The URL/path that the Teacher is taken to when they click on "Select subject" in the WildCam Classroom - Create Assignment stage. Must be registered early on in the Program.
  wccwcmAssignmentPath: '', // The URL/path that the Teacher is returned to when they finally finish selecting subjects on the WildCam Map.
  wccwcmSavedAssignmentState: null,
  wccwcmSelectedSubjects: null,
  wccwcmSelectedFilters: null
};

/*
--------------------------------------------------------------------------------
 */

// React-Redux Helper Objects/Functions
// ------------------------------------

/*  WILDCAMMAP_PROPTYPES is used to define the property types of the data, and
    only matters to Redux-connected React components, and can be used like...
    Usage:
      MyReactComponent.propTypes = {
        ...WILDCAMMAP_PROPTYES,
        otherProp: PropTypes.string,
      };
 */
const WILDCAMMAP_PROPTYPES = {
  markersData: PropTypes.object, // GeoJSON object.
  markersError: PropTypes.object,
  markersStatus: PropTypes.string,
  markersDataCount: PropTypes.number,

  activeCameraId: PropTypes.string,
  activeCameraMetadata: PropTypes.object,
  activeCameraMetadataStatus: PropTypes.string,
  activeCameraData: PropTypes.arrayOf(PropTypes.object),
  activeCameraDataStatus: PropTypes.string,

  filters: PropTypes.object, // Dynamically constructed object.

  showHelp: PropTypes.string,

  wccwcmMapPath: PropTypes.string,
  wccwcmAssignmentPath: PropTypes.string,
  wccwcmSavedAssignmentState: PropTypes.object,
  wccwcmSelectedSubjects: PropTypes.array,
  wccwcmSelectedFilters: PropTypes.object
};

/*  WILDCAMMAP_MAP_STATE is used as a convenience feature in mapStateToProps()
    functions in Redux-connected React components.
    Usage:
      mapStateToProps = (state) => {
        return {
          ...WILDCAMMAP_MAP_STATE(state),
          someOtherValue: state.someOtherStore.someOtherValue
        }
      }
 */
const WILDCAMMAP_MAP_STATE = (state, prefix = '') => {
  const dataStore = state.wildcamMap;
  const mappedObject = {};
  Object.keys(WILDCAMMAP_INITIAL_STATE).map((key) => {
    // The prefix is optional, and is useful to avoid naming collisions.
    mappedObject[prefix + key] = dataStore[key];
  });
  return mappedObject;
};

/*
--------------------------------------------------------------------------------
 */

// Jumpstate Synchronous Actions
// -----------------------------

const setMarkersStatus = (state, markersStatus) => ({ ...state, markersStatus });

const setMarkersData = (state, markersData) => ({ ...state, markersData });

const setMarkersError = (state, markersError) => ({ ...state, markersError });

const setMarkersDataCount = (state, markersDataCount) => ({ ...state, markersDataCount });

const resetActiveCamera = (state) => ({
  ...state,
  activeCameraId: WILDCAMMAP_INITIAL_STATE.activeCameraId,
  activeCameraMetadata: WILDCAMMAP_INITIAL_STATE.activeCameraMetadata,
  activeCameraMetadataStatus: WILDCAMMAP_INITIAL_STATE.activeCameraMetadataStatus,
  activeCameraData: WILDCAMMAP_INITIAL_STATE.activeCameraData,
  activeCameraDataStatus: WILDCAMMAP_INITIAL_STATE.activeCameraDataStatus
});

const setActiveCameraId = (state, activeCameraId) => ({ ...state, activeCameraId });

const setActiveCameraMetadata = (state, activeCameraMetadata) => ({ ...state, activeCameraMetadata });

const setActiveCameraMetadataStatus = (state, activeCameraMetadataStatus) => ({ ...state, activeCameraMetadataStatus });

const setActiveCameraData = (state, activeCameraData) => ({ ...state, activeCameraData });

const setActiveCameraDataStatus = (state, activeCameraDataStatus) => ({ ...state, activeCameraDataStatus });

const setFilters = (state, filters) => ({ ...state, filters });

/*  Adds to a multi-choice filter selection.
 */
const addFilterSelectionItem = (state, item) => {
  const filters = { ...state.filters };
  const { key } = item;
  const { value } = item;
  const newValues = (Array.isArray(filters[key])) ? filters[key].slice() : []; // If filter doesn't exist (undefined) or isn't an array, init an array. Also, make a new array.
  if (newValues.indexOf(value) === -1) { // Add the item value if it doesn't exist.
    newValues.push(value);
    filters[key] = newValues;
  }
  return { ...state, filters };
};

/*  Removes from a multi-choice filter selection.
 */
const removeFilterSelectionItem = (state, item) => {
  const filters = { ...state.filters };
  const { key } = item;
  const { value } = item;
  if (!Array.isArray(filters[key])) filters[key] = []; // If filter doesn't exist (undefined) or isn't an array, init an array.
  filters[key] = filters[key].filter((cur) => cur !== value); // Remove the matching item value. Note that this creates a new array.
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

/*  Shows or Hides help for the respective activity.
 */
const showHelp = (state, activity) => ({ ...state, showHelp: activity });
const hideHelp = (state) => ({ ...state, showHelp: null });

/*  WildCam Classroom-WildCam Map connection functions
 */
const resetWccWcmAssignmentData = (state) => ({
  ...state,
  // Maintain the Map Path, however
  wccwcmAssignmentPath: WILDCAMMAP_INITIAL_STATE.wccwcmAssignmentPath,
  wccwcmSavedAssignmentState: WILDCAMMAP_INITIAL_STATE.wccwcmSavedAssignmentState,
  wccwcmSelectedSubjects: WILDCAMMAP_INITIAL_STATE.wccwcmSelectedSubjects,
  wccwcmSelectedFilters: WILDCAMMAP_INITIAL_STATE.wccwcmSelectedFilters
});
const setWccWcmMapPath = (state, wccwcmMapPath) => ({ ...state, wccwcmMapPath });
const setWccWcmAssignmentPath = (state, wccwcmAssignmentPath) => ({ ...state, wccwcmAssignmentPath });
const setWccWcmSavedAssignmentState = (state, wccwcmSavedAssignmentState) => ({ ...state, wccwcmSavedAssignmentState });
const setWccWcmSelectedSubjects = (state, wccwcmSelectedSubjects) => ({ ...state, wccwcmSelectedSubjects });
const setWccWcmSelectedFilters = (state, wccwcmSelectedFilters) => ({ ...state, wccwcmSelectedFilters });

/*
--------------------------------------------------------------------------------
 */

// Jumpstate Effects
// -----------------
// Effects are for async actions and get automatically to the global Actions
// list. NOTE: Effects can only have one argument.

Effect('wcm_getMapMarkers', (payload = {}) => {
  const { mapConfig } = payload;
  const selectedFilters = payload.filters;

  if (!mapConfig) return; // We absolutely need mapConfig, but we're fine if filters is null or undefined (i.e. user has not selected any filters.)

  Actions.wildcamMap.setMarkersStatus(WILDCAMMAP_MARKERS_STATUS.FETCHING);
  const where = constructWhereClause(mapConfig, selectedFilters);
  const url = mapConfig.database.urls.geojson.replace(
    '{SQLQUERY}',
    encodeURIComponent(mapConfig.database.queries.selectCameraCount.replace('{WHERE}', where))
  );

  superagent.get(url)
    .then((response) => {
      if (!response) { throw 'ERROR (wildcam-map/ducks/getMapMarkers): No response'; }
      if (response.ok && response.body) {
        return response.body;
      }
      throw 'ERROR (wildcam-map/ducks/getMapMarkers): invalid response';
    })
    .then((geojson) => {
      Actions.wildcamMap.setMarkersStatus(WILDCAMMAP_MARKERS_STATUS.SUCCESS);
      Actions.wildcamMap.setMarkersData(geojson);

      let count = 0;
      if (geojson && geojson.features) {
        count = geojson.features.reduce((total, item) => {
          if (item.properties && item.properties.count) {
            return total + item.properties.count;
          }
          return total;
        }, 0);
      }
      Actions.wildcamMap.setMarkersDataCount(count);
    })
    .catch((err) => {
      Actions.wildcamMap.setMarkersStatus(WILDCAMMAP_MARKERS_STATUS.ERROR);
      console.error(err);
    });
});

//----------------------------------------------------------------

Effect('wcm_getActiveCamera', (payload = {}) => {
  const { mapConfig } = payload;
  const selectedFilters = payload.filters;
  const { cameraId } = payload;

  if (!mapConfig) return;
  if (!cameraId) return;

  Actions.wildcamMap.setActiveCameraId(cameraId);
  Actions.wildcamMap.setActiveCameraDataStatus(WILDCAMMAP_CAMERA_STATUS.FETCHING);
  Actions.wildcamMap.setActiveCameraMetadataStatus(WILDCAMMAP_CAMERA_STATUS.FETCHING);

  let where; let
    url;

  // Get Camera Data
  //--------------------------------
  where = constructWhereClause(mapConfig, selectedFilters);
  where = (where === '') // TODO: Move this to the project config. This is very project-specific.
    ? ` WHERE camera LIKE '${sqlString(cameraId)}'`
    : `${where} AND camera LIKE '${sqlString(cameraId)}'`;
  url = mapConfig.database.urls.json.replace(
    '{SQLQUERY}',
    encodeURIComponent(mapConfig.database.queries.selectCameraData.replace('{WHERE}', where))
  );
  superagent.get(url)
    .then((response) => {
      if (!response) { throw 'ERROR (wildcam-map/ducks/getActiveCamera Data): No response'; }
      if (response.ok && response.body) {
        return response.body;
      }
      throw 'ERROR (wildcam-map/ducks/getActiveCamera Data): invalid response';
    })
    .then((json) => {
      Actions.wildcamMap.setActiveCameraDataStatus(WILDCAMMAP_CAMERA_STATUS.SUCCESS);
      Actions.wildcamMap.setActiveCameraData(json.rows);
    })
    .catch((err) => {
      Actions.wildcamMap.setActiveCameraDataStatus(WILDCAMMAP_CAMERA_STATUS.ERROR);
      console.error(err);
    });
  //--------------------------------

  // Get Camera Metadata
  //--------------------------------
  where = ` WHERE id LIKE '${sqlString(cameraId)}'`; // TODO: Move this to the project config. This is very project-specific.
  url = mapConfig.database.urls.json.replace(
    '{SQLQUERY}',
    encodeURIComponent(mapConfig.database.queries.selectCameraMetadata.replace('{WHERE}', where))
  );
  superagent.get(url)
    .then((response) => {
      if (!response) { throw 'ERROR (wildcam-map/ducks/getActiveCamera Metadata): No response'; }
      if (response.ok && response.body) {
        return response.body;
      }
      throw 'ERROR (wildcam-map/ducks/getActiveCamera Metadata): invalid response';
    })
    .then((json) => {
      Actions.wildcamMap.setActiveCameraMetadataStatus(WILDCAMMAP_CAMERA_STATUS.SUCCESS);
      if (json && json.rows) {
        Actions.wildcamMap.setActiveCameraMetadata(json.rows[0]); // SELECT query should only return one result.
      } else {
        Actions.wildcamMap.setActiveCameraMetadata(null);
      }
    })
    .catch((err) => {
      Actions.wildcamMap.setActiveCameraMetadataStatus(WILDCAMMAP_CAMERA_STATUS.ERROR);
      console.error(err);
    });
  //--------------------------------
});

/*
--------------------------------------------------------------------------------
 */

const wildcamMap = State('wildcamMap', {
  // Initial state
  initial: WILDCAMMAP_INITIAL_STATE,
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
  setFilters,
  addFilterSelectionItem,
  removeFilterSelectionItem,
  setFilterSelectionItem,
  showHelp,
  hideHelp,
  resetWccWcmAssignmentData,
  setWccWcmMapPath,
  setWccWcmAssignmentPath,
  setWccWcmSavedAssignmentState,
  setWccWcmSelectedSubjects,
  setWccWcmSelectedFilters
});

export default wildcamMap;
export {
  WILDCAMMAP_MARKERS_STATUS,
  WILDCAMMAP_CAMERA_STATUS,
  WILDCAMMAP_INITIAL_STATE,
  WILDCAMMAP_PROPTYPES,
  WILDCAMMAP_MAP_STATE
};
