import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get, post } from '../lib/edu-api';
import { i2aAssignmentNames } from './programs';

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

// Helper Functions
function handleError(error) {
  Actions.assignments.setStatus(ASSIGNMENTS_STATUS.ERROR);
  Actions.assignments.setError(error);
  Actions.notification.setNotification({ status: 'critical', message: 'Something went wrong.' });
  console.error(error);
}

function sortAssignments(assignments) {
  const firstAssignment = assignments.find(assignment => assignment.name === i2aAssignmentNames.first);
  const secondAssignment = assignments.find(assignment => assignment.name === i2aAssignmentNames.second);
  const thirdAssignment = assignments.find(assignment => assignment.name === i2aAssignmentNames.third);

  if (firstAssignment && secondAssignment && thirdAssignment) {
    return [firstAssignment, secondAssignment, thirdAssignment];
  }

  return assignments;
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
Effect('getAssignments', (data) => {
  Actions.assignments.setStatus(ASSIGNMENTS_STATUS.FETCHING);
  return get('/assignments', [{ classroom_id: data.classroomId }])
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/getClassrooms): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return response.body.data;
      }
      throw 'ERROR (ducks/classrooms/getClassrooms): Invalid response';
    })
    .then((assignments) => {
      const assignmentsForClassroom = {};
      Actions.assignments.setStatus(ASSIGNMENTS_STATUS.SUCCESS);

      // If I2A style program, then sort the assignments before setting them to the app state
      if (!data.selectedProgram.custom) {
        assignmentsForClassroom[data.classroomId] = sortAssignments(assignments);
      } else {
        assignmentsForClassroom[data.classroomId] = assignments;
      }

      Actions.assignments.setAssignments(assignmentsForClassroom);
    }).catch((error) => {
      handleError(error);
    });
});

Effect('createAssignment', (data) => {
  Actions.classrooms.setStatus(ASSIGNMENTS_STATUS.CREATING);

  return post('/assignments', { data })
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
