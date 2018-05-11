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

const WILDCAMCLASSROOMS_DATA_STATUS = {
  IDLE: 'idle',  //Initial state. 
  FETCHING: 'fetching',  //Fetching classrooms/assignments...
  SENDING: 'sending',  //Updating classrooms/assignments...
  SUCCESS: 'success',  //SUCCESS! ...of whatever we just did.
  ERROR: 'error',  //Something effed up.
};

const LOG_PREFIX = 'ducks/wildcam-classrooms';

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
  classroomsStatus: WILDCAMCLASSROOMS_DATA_STATUS.IDLE,
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

const resetClassrooms = (state, classroomsStatus) => {
  return {
    ...WILDCAMCLASSROOMS_INITIAL_STATE,
  };
};

const setClassroomsStatus = (state, classroomsStatus, classroomsStatusDetails = null) => {
  return { ...state, classroomsStatus, classroomsStatusDetails };
};

const setClassroomsList = (state, setClassroomsList) => {
  return { ...state, setClassroomsList };
};

const setSelectedClassroom = (state, selectedClassroom) => {
  return { ...state, selectedClassroom };
};

const setToast = (state, message, status) => {
  return {
    ...state,
    toast: { message, status },
  };
};

/*
--------------------------------------------------------------------------------
 */

// Jumpstate Effects
// -----------------
// Effects are for async actions and get automatically to the global Actions
// list.

/*  Fetch all the Classrooms for the selected Program from the Education API.
    Implicit: the list of Classrooms is limited to what's available to the
    logged-in user.
 */
Effect('wcc_teachers_fetchClassrooms', (program) => {
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
  });
});

/*
--------------------------------------------------------------------------------
 */

function showErrorMessage(err) {
  Actions.notification.setNotification({ status: 'critical', message: 'Something went wrong.' });
  console.error(err);
}

/*
--------------------------------------------------------------------------------
 */

const wildcamClassrooms = State('wildcamClassrooms', {
  // Initial state
  initial: WILDCAMCLASSROOMS_INITIAL_STATE,
  // Actions
  resetClassrooms,
  setClassroomsStatus,
  setClassroomsList,
  setSelectedClassroom,
  setToast,
});

export default wildcamClassrooms;
export {
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
};
