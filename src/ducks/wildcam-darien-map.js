import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get } from '../lib/edu-api';

// Constants
const WILDCAM_DARIEN_MAP_MARKERS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Initial State and PropTypes - usable in React components.
const WILDCAM_DARIEN_MAP_INITIAL_STATE = {
  markersData: null,
  markersStatus: WILDCAM_DARIEN_MAP_MARKERS_STATUS.IDLE,
  markersError: null,
};

const WILDCAM_DARIEN_MAP_PROPTYPES = {
  markersData: PropTypes.object,
  markersError: PropTypes.object,
  markersStatus: PropTypes.string,
};

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status };
};

const setMarkersData = (state, markersData) => {
  return { ...state, markersData };
};

const setError = (state, error) => {
  return { ...state, error };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('darien_getMapMarkers', () => {
  
});

const wildcamDarienMap = State('wildcamDarienMap', {
  // Initial state
  initial: WILDCAM_DARIEN_MAP_INITIAL_STATE,
  // Actions
  setStatus,
  setMarkersData,
  setError,
});

export default wildcamDarienMap;
export {
  WILDCAM_DARIEN_MAP_MARKERS_STATUS,
  WILDCAM_DARIEN_MAP_INITIAL_STATE,
  WILDCAM_DARIEN_MAP_PROPTYPES,
};
