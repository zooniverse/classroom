/*
WildCam Classrooms - Data Connection and Duck
---------------------------------------------

Part of the WildCam Classrooms feature.

--------------------------------------------------------------------------------
 */

import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
//import superagent from 'superagent';
import { get, post, put, httpDelete } from '../../../lib/edu-api';

/*
--------------------------------------------------------------------------------
 */

// Constants
// ---------

const WILDCAMCLASSROOMS_COMPONENT_MODES = {
  IDLE: 'idle',  //Initial state. 
  VIEW_ALL_CLASSROOMS: 'view all classrooms',
  VIEW_ONE_CLASSROOM: 'view one classroom',
  CREATE_NEW_CLASSROOM: 'create new classroom',
};

const WILDCAMCLASSROOMS_DATA_STATUS = {
  IDLE: 'idle',  //Initial state. 
  FETCHING: 'fetching',  //Fetching classrooms/assignments...
  SENDING: 'sending',  //Updating classrooms/assignments...
  SUCCESS: 'success',  //SUCCESS! ...of whatever we just did.
  ERROR: 'error',  //Something effed up.
};

const TEXT = {
  ERROR: {
    GENERAL: 'Something went wrong',
  }
};

/*
--------------------------------------------------------------------------------
 */

// Initial State / Default Values
// ------------------------------

/*  WILDCAMCLASSROOMS_INITIAL_STATE defines the default/starting values of the
    Redux store. To use this in your Redux-connected React components, try...
    Usage:
      MyReactComponent.defaultProps = {
        ...WILDCAMCLASSROOMS_INITIAL_STATE,
        otherProp: 'default value'
      };
 */
const WILDCAMCLASSROOMS_INITIAL_STATE = {
  componentMode: WILDCAMCLASSROOMS_COMPONENT_MODES.IDLE,  //The mode of the component, e.g. user is editing a classroom.
  
  classroomsStatus: WILDCAMCLASSROOMS_DATA_STATUS.IDLE,  //The status of the data fetch/send.
  classroomsStatusDetails: null,
  
  classroomsList: [],
  selectedClassroom: null,
  
  toast: {
    message: null,
    status: null,
  },
};

/*
--------------------------------------------------------------------------------
 */

// React-Redux Helper Objects/Functions
// ------------------------------------

/*  WILDCAMCLASSROOMS_PROPTYPES is used to define the property types of the
    data, and only matters to Redux-connected React components, and can be used
    like...
    Usage:
      MyReactComponent.propTypes = {
        ...WILDCAMCLASSROOMS_PROPTYES,
        otherProp: PropTypes.string,
      };
 */
const WILDCAMCLASSROOMS_PROPTYPES = {
  componentMode: PropTypes.string,
  classroomsStatus: PropTypes.string,
  classroomsStatusDetails: PropTypes.object,
  classroomsList: PropTypes.array,
  selectedClassroom: PropTypes.object,
  toast: PropTypes.object,
};

/*  WILDCAMCLASSROOMS_MAP_STATE is used as a convenience feature in
    mapStateToProps() functions in Redux-connected React components.
    Usage:
      mapStateToProps = (state) => {
        return {
          ...WILDCAMCLASSROOMS_MAP_STATE(state),
          someOtherValue: state.someOtherStore.someOtherValue
        }
      }
 */
const WILDCAMCLASSROOMS_MAP_STATE = (state, prefix = '') => {
  const dataStore = state.wildcamClassrooms;
  const mappedObject = {};
  Object.keys(WILDCAMCLASSROOMS_INITIAL_STATE).map((key) => {
    //The prefix is optional, and is useful to avoid naming collisions.
    mappedObject[prefix + key] = dataStore[key];
  });
  return mappedObject;
};

/*
--------------------------------------------------------------------------------
 */

// Jumpstate Synchronous Actions
// -----------------------------

const setComponentMode = (state, componentMode) => {
  return { ...state, componentMode };
};

const resetClassrooms = (state) => {
  return {
    ...state,
    
    classroomsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsStatus,
    classroomsStatusDetails: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsDetails,
    
    classroomsList: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsList,
    selectedClassroom: WILDCAMCLASSROOMS_INITIAL_STATE.selectedClassroom,
    
    //TODO: reset assignments and selected assignments as well.
  };
};

const setClassroomsStatus = (state, classroomsStatus, classroomsStatusDetails = null) => {
  return { ...state, classroomsStatus, classroomsStatusDetails };
};

const setClassroomsList = (state, classroomsList) => {
  return { ...state, classroomsList };
};

const setSelectedClassroom = (state, selectedClassroom) => {
  return { ...state, selectedClassroom };
};

const resetSelectedClassroom = (state) => {
  return {
    ...state,
    selectedClassroom: null,
    //TODO: reset selected assignment as well.
  };
};

const setToast = (state, toast = { message: null, state: null }) => {
  return {
    ...state,
    toast,
  };
};

const resetToast = (state) => {
  return {
    ...state,
    toast: { message: null, status: null },
  };
};

/*
--------------------------------------------------------------------------------
 */

// Jumpstate Effects
// -----------------
// Effects are for async actions and get automatically to the global Actions
// list. NOTE: Effects can only have one argument.

/*  Fetch all the Classrooms for the selected Program from the Education API.
    Implicit: the list of Classrooms is limited to what's available to the
    logged-in user.
 */
Effect('wcc_teachers_fetchClassrooms', (program) => {
  //Sanity check
  if (!program) return;
  
  const program_id = program.id;
  
  Actions.wildcamClassrooms.resetClassrooms();
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.FETCHING);
  
  return get('/teachers/classrooms/', [{ program_id }])
  
  .then((response) => {
    if (!response) { throw 'ERROR (wildcam-classrooms/ducks/wcc_teachers_fetchClassrooms): No response'; }
    if (response.ok &&
        response.body && response.body.data) {
      return response.body.data;
    }
    throw 'ERROR (wildcam-classrooms/ducks/wcc_teachers_fetchClassrooms): Invalid response';
  })
  
  .then((data) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    Actions.wildcamClassrooms.setClassroomsList(data);
    return data;
  })
  
  .catch((err) => {
    setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR, err);
    showErrorMessage(err);
    throw(err);
  });
});

  
/*  Creates a classroom.
    
    API notes:
      POST /teachers/classrooms/ accepts the following payload structure:
      {
        data: {
          attributes: {
            name: 'Example 101',
            subject: 'Exampleology',
            school: 'University of Example',
            description: 'An example classroom'
          },
          relationships: {
            program: {
              data: {
                id: "1",
                type: "programs"
              }
            }
          }
        }
      }
 */
Effect('wcc_teachers_createClassroom', ({selectedProgram, classroomData}) => {
  //Sanity check
  if (!selectedProgram || !classroomData) return;
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);
  
  const requestBody = {
    data: {
      attributes: classroomData,
      relationships: {
        program: {
          data: {
            id: String(selectedProgram.id),
            type: "programs"
          }
        }
      }
    }
  };

  return post('/teachers/classrooms/', requestBody)
  .then((response) => {
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_createClassrooms): No response'; }
    if (response.ok &&
        response.body && response.body.data) {
      Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
      return response.body.data;
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_createClassrooms): Invalid response';
  })
  .catch((err) => {
    setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR, err);
    showErrorMessage(err);
    throw(err);
  });
});

/*  Edits a classroom.

    API notes:
      POST /teachers/classrooms/12345 accepts the following payload structure:
      {
        "data": {
          "attributes": {
            name: 'Example 101',
            subject: 'Exampleology',
            school: 'University of Example',
            description: 'An example classroom'
          }
        }
      }
 */
Effect('wcc_teachers_editClassroom', ({ selectedClassroom, classroomData }) => {
  //Sanity check
  if (!selectedClassroom || !classroomData) return;
  
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);
  
  return put(`/teachers/classrooms/${selectedClassroom.id}`, classroomData)  //NOTE: the put() function requires a different argument format than post().
  .then((response) => {
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_editClassrooms): No response'; }
    if (response.ok) {
      Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
      
      //TODO: Update selectedClassroom
      return null;
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_editClassrooms): Invalid response';
  })
  .catch((err) => {
    setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR, err);
    showErrorMessage(err);
    throw(err);
  });
});

/*  Deletes a classroom.
 */
Effect('wcc_teachers_deleteClassroom', (selectedClassroom) => {
  //Sanity check
  if (!selectedClassroom) return;
  
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);
  
  return httpDelete(`/teachers/classrooms/${selectedClassroom.id}`)
  .then((response) => {
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteClassroom): No response'; }
    if (response.ok) {
      return Actions.classrooms.setStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteClassroom): Invalid response';
  })
  .catch((err) => {
    setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR, err);
    showErrorMessage(err);
    throw(err);
  });
  
});

/*  Refreshes the current view by fetching the latest data fromt he server..
    Called when, e.g. a Classroom is edited, to sync local data with the
    updated server data.
 */
Effect('wcc_teachers_refreshView', ({ program, componentMode, selectedClassroom }) => {
  //Sanity check
  if (!program) return;
  
  //Save the current view, so we can retrieve it for after the refresh fetch is complete.
  const saved_selectedClassroom_id = (selectedClassroom) ? selectedClassroom.id : null;
  
  //Fetch the latest data...
  Actions.wcc_teachers_fetchClassrooms(program)
  .then((classrooms) => {
    //...then restore the user's previous view.
    const retrieved_selectedClassroom = (saved_selectedClassroom_id && classrooms)
      ? classrooms.find((classroom) => { return classroom.id === saved_selectedClassroom_id })
      : null;
    
    Actions.wildcamClassrooms.setComponentMode(componentMode);
    Actions.wildcamClassrooms.setSelectedClassroom(retrieved_selectedClassroom);
    //TODO: setSelectedAssignment();
    
    return null;
  })
  .catch((err) => {
    setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR, err);
    showErrorMessage(err);
    throw(err);
  });
});
/*
--------------------------------------------------------------------------------
 */

function showErrorMessage(err) {
  //Critical Error
  Actions.notification.setNotification({ status: 'critical', message: TEXT.ERROR.GENERAL });
  console.error(err);
}

/*
--------------------------------------------------------------------------------
 */

const wildcamClassrooms = State('wildcamClassrooms', {
  // Initial state
  initial: WILDCAMCLASSROOMS_INITIAL_STATE,
  // Actions
  setComponentMode,
  resetClassrooms,
  setClassroomsStatus,
  setClassroomsList,
  setSelectedClassroom,
  resetSelectedClassroom,
  setToast,
  resetToast,
});

export default wildcamClassrooms;
export {
  WILDCAMCLASSROOMS_COMPONENT_MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
};
