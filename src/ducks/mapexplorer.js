import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import superagent from 'superagent';

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
};

const MAPEXPLORER_PROPTYPES = {
  markersData: PropTypes.object,  //GeoJSON object.
  markersError: PropTypes.object,
  markersStatus: PropTypes.string,
};

// Synchonous actions
const setMarkersStatus = (state, markersStatus) => {
  return { ...state, markersStatus };
};

const setMarkersData = (state, markersData) => {
  return { ...state, markersData };
};

const setMarkersError = (state, markersError) => {
  return { ...state, markersError };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getMapMarkers', (mapConfig) => {
  if (!mapConfig) return;
  
  Actions.mapexplorer.setMarkersStatus(MAPEXPLORER_MARKERS_STATUS.FETCHING);
  const where = '';  //TODO: construct WHERE from 
  const url = mapConfig.database.url.replace(
    '{SQLQUERY}',
    mapConfig.database.queries.selectCameraCount.replace('{WHERE}', where)
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

const mapexplorer = State('mapexplorer', {
  // Initial state
  initial: MAPEXPLORER_INITIAL_STATE,
  // Actions
  setMarkersStatus,
  setMarkersData,
  setMarkersError,
});

export default mapexplorer;
export {
  MAPEXPLORER_MARKERS_STATUS,
  MAPEXPLORER_INITIAL_STATE,
  MAPEXPLORER_PROPTYPES,
};
