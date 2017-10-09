import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import apiClient from 'panoptes-client/lib/api-client';

import { config } from '../lib/config';

// Constants
const CAESAR_EXPORTS_STATUS = {
  DOWNLOADING: 'downloading',
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Initial State and PropTypes - usable in React components.
const CAESAR_EXPORTS_INITIAL_STATE = {
  caesarExport: {},
  error: null,
  showModal: false,
  status: CAESAR_EXPORTS_STATUS.IDLE
};

const CAESAR_EXPORTS_PROPTYPES = {
  exports: PropTypes.shape({}),
  error: PropTypes.object,
  showModal: PropTypes.bool,
  status: PropTypes.string
};

// Helper Functions
function handleError(error) {
  Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.ERROR);
  Actions.caesarExports.setError(error);
  Actions.notification.setNotification({ status: 'critical' , message: 'Something went wrong.' });
  console.error(error);
}

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status };
};

const setCaesarExport = (state, caesarExport) => {
  return { ...state, caesarExport };
};

const setError = (state, error) => {
  return { ...state, error };
};

const showModal = (state) => {
  return { ...state, showModal: !state.showModal };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getCaesarExport', (data) => {
  Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.FETCHING);
  const requestUrl = `${config.caesar}/workflows/${data.assignment.workflowId}/data_requests`;

  return superagent.get(requestUrl)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .query({ subgroup: data.classroom.zooniverseGroupId })
    .then((response) => {
      console.log('response', response.status)
      if (!response) { throw 'ERROR (ducks/caesarExports/getCaesarExport): No response'; };
      if (response.ok) {
        console.log('its ok')
      }

      Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
    }).catch((error) => {
      if (error.status !== 404) handleError(error)
      if (error.status === 404) {
        Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
      }
    });
});

const caesarExports = State('caesarExports', {
  // Initial state
  initial: CAESAR_EXPORTS_INITIAL_STATE,
  // Actions
  setStatus,
  setCaesarExport,
  setError,
  showModal
});

export default caesarExports;
export {
  CAESAR_EXPORTS_STATUS,
  CAESAR_EXPORTS_INITIAL_STATE,
  CAESAR_EXPORTS_PROPTYPES
};
