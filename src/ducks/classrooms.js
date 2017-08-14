import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get } from '../lib/edu-api';

// Constants
const CLASSROOMS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Initial State and PropTypes - usable in React components.
const CLASSROOMS_INITIAL_STATE = {
  classrooms: [],
  error: null,
  showCreateForm: false,
  status: CLASSROOMS_STATUS.IDLE,
};

const CLASSROOMS_PROPTYPES = {
  classrooms: PropTypes.arrayOf(PropTypes.object),  //OPTIONAL TODO: Transform this into PropTypes.shape.
  error: PropTypes.object,
  showCreateForm: PropTypes.bool,
  status: PropTypes.string,
};

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status };
};

const setClassrooms = (state, classrooms) => {
  return { ...state, classrooms };
};

const setError = (state, error) => {
  return { ...state, error };
};

const setCreateFormVisibility = (state) => {
  return { ...state, showCreateForm: !state.showCreateForm };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getClassrooms', () => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.FETCHING);

  return get('teachers/classrooms/')
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/getClassrooms): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return response.body.data;
      }
      throw 'ERROR (ducks/classrooms/getClassrooms): Invalid response';
    })
    .then((data) => {
      Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      Actions.classrooms.setClassrooms(data);
    }).catch((error) => {
      Actions.classrooms.setStatus(CLASSROOMS_STATUS.ERROR);
      Actions.classrooms.setError(error);
      console.error(error);
    });
});

const classrooms = State('classrooms', {
  // Initial state
  initial: CLASSROOMS_INITIAL_STATE,
  // Actions
  setStatus,
  setClassrooms,
  setError,
  setCreateFormVisibility
});

export default classrooms;
export {
  CLASSROOMS_STATUS,
  CLASSROOMS_INITIAL_STATE,
  CLASSROOMS_PROPTYPES,
};
