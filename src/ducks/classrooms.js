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
  ERROR: 'error'
};

// Initial State and PropTypes - usable in React components.
const CLASSROOMS_INITIAL_STATE = {
  classrooms: [],
  error: null,
  formFields: {
    name: '',
    subject: '',
    school: '',
    description: ''
  },
  selectedClassroom: null,
  showForm: false,
  status: CLASSROOMS_STATUS.IDLE
};

const classroomPropTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  school: PropTypes.string,
  students: PropTypes.array,
  subject: PropTypes.string
};

const CLASSROOMS_PROPTYPES = {
  selectedClassroom: PropTypes.shape(classroomPropTypes),
  classrooms: PropTypes.arrayOf(PropTypes.shape(classroomPropTypes)),  //OPTIONAL TODO: Transform this into PropTypes.shape.
  error: PropTypes.object,
  showForm: PropTypes.bool,
  status: PropTypes.string
};

// Helper Functions
function handleError(error) {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.ERROR);
  Actions.classrooms.setError(error);
  console.error(error);
}

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status };
};

// Sets the active classroom. Use null to deselect active classroom.
const selectClassroom = (state, selectedClassroom) => {
  return { ...state, selectedClassroom };
};

const setClassrooms = (state, classrooms) => {
  return { ...state, classrooms };
};

const setError = (state, error) => {
  return { ...state, error };
};

const toggleFormVisibility = (state) => {
  return { ...state, showForm: !state.showForm };
};

const updateFormFields = (state, formFields) => {
  return { ...state, formFields };
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
    if (classrooms) {
      classrooms.forEach((classroom) => {
        // TODO: If many pages of assignments exist,
        // loop through the number of pages to request all of the data
        // and concatenate the response data together for the app state
        // Neither Pagination nor infinite scroll would be good UX for current table design.
        Actions.getAssignments(classroom.id);
      });
    }
  });
});

Effect('postClassroom', (data) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.POSTING);

  return post('teachers/classrooms/', data)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/postClassroom): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/classrooms/postClassroom): Invalid response';
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
  selectClassroom,
  setClassrooms,
  setError,
  toggleFormVisibility,
  updateFormFields
});

export default classrooms;
export {
  CLASSROOMS_STATUS,
  CLASSROOMS_INITIAL_STATE,
  CLASSROOMS_PROPTYPES
};
