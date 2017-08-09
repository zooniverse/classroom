import { State, Effect, Actions } from 'jumpstate';
import { get } from '../lib/edu-api';
<<<<<<< 037a4d70bdf37f54fcb51cda995af75ed5670343
import PropTypes from 'prop-types';

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
  status: CLASSROOMS_STATUS.IDLE,
};

const CLASSROOMS_PROPTYPES = {
  classrooms: PropTypes.arrayOf(PropTypes.object),  //OPTIONAL TODO: Transform this into PropTypes.shape.
  error: PropTypes.object,
  status: PropTypes.string,
};
=======
>>>>>>> Figured out how to get assignments

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status }
};

const setClassrooms = (state, classrooms) => {
  return { ...state, classrooms };
};

const setError = (state, error) => {
  return { ...state, error };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getClassrooms', () => {
<<<<<<< 037a4d70bdf37f54fcb51cda995af75ed5670343
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.FETCHING);
  
  get('teachers/classrooms/')
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
  });
=======
  Actions.classrooms.fetchingClassrooms(true);
  return get('teachers/classrooms/', [{ include: 'assignments' }])
    .then((classrooms) => {
      Actions.classrooms.setClassrooms(classrooms);
      Actions.classrooms.fetchingClassrooms(false);
    }).catch((error) => {
      Actions.classrooms.fetchingClassrooms(false);
      Actions.classrooms.setError(error);
    });
>>>>>>> Figured out how to get assignments
});

const classrooms = State('classrooms', {
  // Initial state
  initial: CLASSROOMS_INITIAL_STATE,
  // Actions
  setStatus,
  setClassrooms,
  setError,
});

export default classrooms;
export {
  CLASSROOMS_STATUS,
  CLASSROOMS_INITIAL_STATE,
  CLASSROOMS_PROPTYPES,
};