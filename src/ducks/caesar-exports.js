import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import apiClient from 'panoptes-client/lib/api-client';

import { config } from '../lib/config';

// Constants
const CAESAR_EXPORTS_STATUS = {
  DOWNLOADING: 'downloading',
  EXPORTING: 'exporting',
  IDLE: 'idle',
  FETCHING: 'fetching',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Initial State and PropTypes - usable in React components.
const CAESAR_EXPORTS_INITIAL_STATE = {
  caesarExport: {},
  error: null,
  requestedExports: {},
  showModal: false,
  status: CAESAR_EXPORTS_STATUS.IDLE
};

const CAESAR_EXPORTS_PROPTYPES = {
  caesarExport: PropTypes.shape({}),
  error: PropTypes.object,
  requestedExports: PropTypes.object,
  showModal: PropTypes.bool,
  status: PropTypes.string
};

// Helper Functions
function handleError(error) {
  Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.ERROR);
  Actions.caesarExports.setError(error);
  Actions.notification.setNotification({ status: 'critical', message: 'Something went wrong.' });
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

const setRequestedExports = (state, newRequestedExport) => {
  const mergedRequestedExports = Object.assign({}, state.requestedExports, newRequestedExport);
  return { ...state, requestedExports: mergedRequestedExports };
}

const showModal = (state) => {
  return { ...state, showModal: !state.showModal };
};

// Effects are for async actions and get automatically to the global Actions list
// Requests to caesar should include an Accept: 'application/json' header
Effect('getCaesarExports', (data) => {
  Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.FETCHING);
  const requestUrl = `${config.caesar}/workflows/${data.assignment.workflowId}/data_requests/`;

  return superagent.get(requestUrl)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .query({
      requested_data: 'reductions',
      subgroup: data.classroom.zooniverseGroupId
    })
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/caesarExports/getCaesarExport): No response'; }
      if (response.ok && response.body) {

        return response.body;
      }
    }).then((caesarExports) => {
      // We check if there are any complete exports and if there are, we use the most recent complete export
      if (caesarExports.length > 0) {
        const pendingExports = caesarExports.filter((caesarExport) => {
          return caesarExport.status === 'pending';
        });

        const completedExports = caesarExports.filter((caesarExport) => {
          return caesarExport.status === 'complete';
        });

        if (completedExports.length > 0 && pendingExports.length === 0) {
          Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);

          // The API returns the exports in order of most recent
          Actions.caesarExports.setCaesarExport(completedExports[0]);
        }

        if (pendingExports.length > 0) {
          Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.PENDING);

          // Store the most recent pending export
          const requestedExport = { [data.classroom.id]: pendingExports[0] };
          Actions.caesarExports.setRequestedExports(requestedExport);
        }

        if (completedExports.length === 0 || pendingExports.length === 0) {
          Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
        }
      }

      return caesarExports;
    }).catch((error) => {
      if (error.status !== 404) handleError(error);
      if (error.status === 404) {
        Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
        return error;
      }
    });
});

Effect('getCaesarExport', (data) => {
  Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.FETCHING);
  const requestUrl = `${config.caesar}/workflows/${data.assignment.workflowId}/data_requests/${data.id}`;

  return superagent.get(requestUrl)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/caesarExports/getCaesarExport): No response'; }
      if (response.ok && response.body) {
        const responseData = response.body;
        if (responseData.status === 'complete') {
          Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
          Actions.caesarExports.setCaesarExport(responseData);
          Actions.caesarExports.setRequestedExports(CAESAR_EXPORTS_INITIAL_STATE.requestedExport);

          return response.body;
        }

        if (responseData.status === 'pending') {
          Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.PENDING);
          const requestedExport = { [data.classroom.id]: responseData };
          Actions.caesarExports.setRequestedExports(requestedExport);
        }

        if (responseData.status === 'failed') {
          Actions.caesarExports.setRequestedExports(CAESAR_EXPORTS_INITIAL_STATE.requestedExport);
          Actions.caesarExports.setCaesarExport(CAESAR_EXPORTS_INITIAL_STATE.caesarExport);
          Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.ERROR);
          Actions.caesarExports.setError({ status: 'failed' });
          Actions.notification.setNotification({ status: 'critical', message: 'Something went wrong.' });
        }
      }
    }).catch((error) => {
      if (error.status !== 404) handleError(error);
      if (error.status === 404) {
        Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
        return error;
      }
    });
});

Effect('createCaesarExport', (data) => {
  Actions.caesarExports.setCaesarExport(CAESAR_EXPORTS_INITIAL_STATE.caesarExport);
  const requestUrl = `${config.caesar}/workflows/${data.assignment.workflowId}/data_requests/`;

  return superagent.post(requestUrl)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .send({
      requested_data: 'reductions',
      subgroup: data.classroom.zooniverseGroupId
    })
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/caesarExports/getCaesarExport): No response'; }
      if (response.ok && response.body) {
        const responseData = response.body;
        if (responseData.status === 'pending') {
          const requestedExport = { [data.classroom.id]: responseData };
          Actions.caesarExports.setRequestedExports(requestedExport);
          Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.PENDING);
        }
      }
    }).catch((error) => {
      if (error.status !== 404) handleError(error);
      if (error.status === 404) {
        Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
        return error;
      }
    });
});

Effect('exportToGoogleDrive', (csv) => {
  // This is using the multipart upload as specified in the Google Drive v3 REST API documentation
  // https://developers.google.com/drive/v3/web/multipart-upload
  // And borrows a lot from this stack overflow example
  // https://stackoverflow.com/questions/41539600/javascript-google-drive-api-v3-upload-a-file-to-a-folder
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelim = `\r\n--${boundary}--`;
  const metadata = {
    name: 'Test', // Replace with actual file name
    mimeType: 'application/vnd.google-apps.spreadsheet'
  };
  const multipartRequestBody = `${delimiter}Content-Type: application/json\r\n\r\n${JSON.stringify(metadata)}${delimiter}Content-Type: text/csv\r\n\r\n${csv}${closeDelim}`;

  Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.EXPORTING);


  return gapi.client.request({
      path: 'https://www.googleapis.com/upload/drive/v3/files',
      method: 'POST',
      params: { uploadType: 'multipart' },
      headers: { 'Content-Type': `multipart/related; boundary="${boundary}"` },
      body: multipartRequestBody
    }).then((response) => {
      if (response && response.body && response.status === 200) {
        Actions.caesarExports.setStatus(CAESAR_EXPORTS_STATUS.SUCCESS);
        Actions.classrooms.setToastState({ status: 'ok', message: 'Sent CSV to your Google Drive' });
        Actions.caesarExports.showModal();
      }
    }).catch((error) => { handleError(error); });
});

const caesarExports = State('caesarExports', {
  // Initial state
  initial: CAESAR_EXPORTS_INITIAL_STATE,
  // Actions
  setStatus,
  setCaesarExport,
  setError,
  setRequestedExports,
  showModal
});

export default caesarExports;
export {
  CAESAR_EXPORTS_STATUS,
  CAESAR_EXPORTS_INITIAL_STATE,
  CAESAR_EXPORTS_PROPTYPES
};
