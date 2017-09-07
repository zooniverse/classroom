import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get, post, put, httpDelete } from '../lib/edu-api';

// Constants
const CLASSROOMS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  CREATING: 'creating',
  UPDATING: 'updating',
  DELETING: 'deleting',
  REMOVING_STUDENT: 'removing-student',
  'JOINING': 'joining',
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
  status: CLASSROOMS_STATUS.IDLE,
  toast: {
    message: null,
    status: null
  }
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
  Actions.notification.setNotification({ status: 'critical' , message: 'Something went wrong.' });
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

const setToastState = (state, toast) => {
  return { ...state, toast };
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

  return get('/teachers/classrooms/')
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

Effect('getClassroom', (id) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.FETCHING);

  return get(`/teachers/classrooms/${id}`)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/getClassroom): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return response.body.data;
      }
      throw 'ERROR (ducks/classrooms/getClassroom): Invalid response';
    })
    .then((classroom) => {
      Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      Actions.classrooms.selectClassroom(classroom);
      return classroom;
    }).then((classroom) => {
      Actions.getAssignments(classroom.id);
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

Effect('createClassroom', (data) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.CREATING);

  return post('/teachers/classrooms/', { data: { attributes: data } })
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

// Hmm.... Effects can only take one argument?
Effect('updateClassroom', (data) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.UPDATING);
  return put(`/teachers/classrooms/${data.id}`, data.payload)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/updateClassroom): No response'; }
      if (response.ok) {
        return Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/classrooms/updateClassroom): Invalid response';
    })
    .catch((error) => {
      handleError(error);
    });
});

Effect('deleteClassroom', (id) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.DELETING);

  return httpDelete(`/teachers/classrooms/${id}`)
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

Effect('removeStudentFromClassroom', (data) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.REMOVING_STUDENT);

  return httpDelete(`/teachers/classrooms/${data.classroomId}/student_users/${data.studentId}`)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/deleteClassroom): No response'; }
      if (response.ok) {
        return Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/classrooms/deleteClassroom): Invalid response';
    }).catch(error => handleError(error));
});

Effect('joinClassroom', (data) => {
  Actions.classrooms.setStatus(CLASSROOMS_STATUS.JOINING);

  return post(`/students/classrooms/${data.classroomId}/join`, { join_token: data.joinToken })
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/classrooms/joinClassroom): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return Actions.classrooms.setStatus(CLASSROOMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/classrooms/joinClassroom): Invalid response';
    }).catch(error => handleError(error));
});

const classrooms = State('classrooms', {
  // Initial state
  initial: CLASSROOMS_INITIAL_STATE,
  // Actions
  setStatus,
  selectClassroom,
  setClassrooms,
  setError,
  setToastState,
  toggleFormVisibility,
  updateFormFields
});

export default classrooms;
export {
  CLASSROOMS_STATUS,
  CLASSROOMS_INITIAL_STATE,
  CLASSROOMS_PROPTYPES
};
