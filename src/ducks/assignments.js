import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get } from '../lib/edu-api';

// Constants
const ASSIGNMENTS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
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
