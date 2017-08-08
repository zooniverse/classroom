import { State, Effect, Actions } from 'jumpstate';
import { get } from '../lib/edu-api';
// import { config } from '../lib/config';

// Synchonous actions
const fetchingClassrooms = (state, fetching) => {
  return { ...state, fetching };
};

const setClassrooms = (state, classrooms) => {
  return { ...state, classrooms };
};

const setError = (state, error) => {
  return { ...state, error };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getClassrooms', () => {
  Actions.classrooms.fetchingClassrooms(true);
  get('teachers/classrooms/')
    .then((classrooms) => {
      Actions.classrooms.setClassrooms(classrooms);
      Actions.classrooms.fetchingClassrooms(false);
    }).catch((error) => {
      Actions.classrooms.fetchingClassrooms(false);
      Actions.classrooms.setError(error);
    });
});

const classrooms = State('classrooms', {
  // Initial state
  initial: {
    classrooms: [],
    error: null,
    fetching: false
  },
  // Actions
  fetchingClassrooms,
  setClassrooms,
  setError
});

export default classrooms;
