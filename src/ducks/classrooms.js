import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get, post, httpDelete } from '../lib/edu-api';

// Constants
const CLASSROOMS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  POSTING: 'posting',
  DELETING: 'deleting',
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

// Helper Functions
function handleError(error) {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.ERROR);
  Actions.classrooms.setError(error);
  console.error(error);
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
      return data;
    }).catch((error) => {
      handleError(error);
    });
});

Effect('getClassroomsAndAssignments', () => {
  Actions.getClassrooms().then((classrooms) => {
    classrooms.forEach((classroom) => {
      // TODO: If many pages of assignments exist,
      // loop through the number of pages to request all of the data
      // and concatenate the response data together for the app state
      // Neither Pagination nor infinite scroll would be good UX for current table design.
      Actions.getAssignments(classroom.id);
    });
  });
});

Effect('createClassroom', (data) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.POSTING);

  return post('teachers/classrooms/', data)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/createClassroom): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/classrooms/createClassroom): Invalid response';
    })
    .catch((error) => {
      handleError(error);
    });
});

Effect('deleteClassroom', (id) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.DELETING);

  return httpDelete(`teachers/classrooms/${id}`)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/deleteClassroom): No response'; }
      if (response.ok) {
        return Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/classrooms/deleteClassroom): Invalid response';
    })
    .catch((error) => {
      handleError(error);
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
