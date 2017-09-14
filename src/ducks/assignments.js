import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get, post } from '../lib/edu-api';
import { config } from '../lib/config';

// Constants
const ASSIGNMENTS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  FETCHING_EXPORTS: 'fetchingExports',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Initial State and PropTypes - usable in React components.
const ASSIGNMENTS_INITIAL_STATE = {
  assignments: {},
  error: null,
  status: ASSIGNMENTS_STATUS.IDLE
};

const ASSIGNMENTS_PROPTYPES = {
  assignments: PropTypes.shape({}),
  error: PropTypes.object,
  status: PropTypes.string
};

// Helper Functions
function handleError(error) {
  Actions.assignments.setStatus(ASSIGNMENTS_STATUS.ERROR);
  Actions.assignments.setError(error);
  Actions.notification.setNotification({ status: 'critical' , message: 'Something went wrong.' });
  console.error(error);
}

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status };
};

const setAssignments = (state, assignments) => {
  const mergedAssignments = Object.assign({}, state.assignments, assignments);
  return { ...state, assignments: mergedAssignments };
};

const setError = (state, error) => {
  return { ...state, error };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getAssignments', (classroomId) => {
  Actions.assignments.setStatus(ASSIGNMENTS_STATUS.FETCHING);
  return get('/assignments', [{ classroom_id: classroomId }])
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/getClassrooms): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return response.body.data;
      }
      throw 'ERROR (ducks/classrooms/getClassrooms): Invalid response';
    })
    .then((data) => {
      const assignmentsForClassroom = { [classroomId]: data };
      Actions.assignments.setStatus(ASSIGNMENTS_STATUS.SUCCESS);
      Actions.assignments.setAssignments(assignmentsForClassroom);
    }).catch((error) => {
      handleError(error);
    });
});

Effect('createAssignment', (data) => {
  Actions.classrooms.setStatus(ASSIGNMENTS_STATUS.CREATING);

  return post('/assignments', data)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/assignments/createAssignment): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return Actions.assignments.setStatus(ASSIGNMENTS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/assignments/createAssignment): Invalid response';
    })
    .catch((error) => {
      handleError(error);
    });
});

Effect('getCaesarExports', (id) => {
  // const query = {

  // };

  Actions.assignments.setStatus(ASSIGNMENTS_STATUS.FETCHING_EXPORTS);

  // GraphQL request
  superagent.get(`${config.caesar}/workflows/${id}/data_requests`)
    .then((response) => {
      console.log('response', response)
    }).catch((error) => {
      Actions.assignments.setStatus(ASSIGNMENTS_STATUS.ERROR);
      Actions.assignments.setError(error);
      console.error(error);
    });
});

const assignments = State('assignments', {
  // Initial state
  initial: ASSIGNMENTS_INITIAL_STATE,
  // Actions
  setStatus,
  setAssignments,
  setError
});

export default assignments;
export {
  ASSIGNMENTS_STATUS,
  ASSIGNMENTS_INITIAL_STATE,
  ASSIGNMENTS_PROPTYPES
};
