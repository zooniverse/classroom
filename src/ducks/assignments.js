import { State, Effect, Actions } from 'jumpstate';
import { get } from '../lib/edu-api';

// Synchonous actions
const fetchingAssignments = (state, fetching) => {
  return { ...state, fetching };
};

const setAssignments = (state, assignments) => {
  return { ...state, assignments };
};

const setError = (state, error) => {
  return { ...state, error };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getAssignments', () => {
  Actions.assignments.fetchingAssignments(true);
  get('assignments')
    .then((assignments) => {
      Actions.assignments.setAssignments(assignments);
      Actions.assignments.fetchingAssignments(false);
    }).catch((error) => {
      Actions.assignments.fetchingAssignments(false);
      Actions.assignments.setError(error);
    });
});

const assignments = State('assignments', {
  // Initial state
  initial: {
    assignments: [],
    error: null,
    fetching: false
  },
  // Actions
  fetchingAssignments,
  setAssignments,
  setError
});

export default assignments;
