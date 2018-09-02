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
import { TEXT } from '../text.js'

/*
--------------------------------------------------------------------------------
 */

// Constants
// ---------

const WILDCAMCLASSROOMS_COMPONENT_MODES = {
  IDLE: 'idle',  //Initial state. 
  VIEW_ALL_CLASSROOMS: 'view all classrooms',
  EDIT_ONE_CLASSROOM: 'edit one classroom',
  CREATE_NEW_CLASSROOM: 'create new classroom',
};

const WILDCAMCLASSROOMS_DATA_STATUS = {
  IDLE: 'idle',  //Initial state. 
  FETCHING: 'fetching',  //Fetching classrooms/assignments...
  SENDING: 'sending',  //Updating classrooms/assignments...
  SUCCESS: 'success',  //SUCCESS! ...of whatever we just did.
  ERROR: 'error',  //Something effed up.
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
  classroomsStatus: WILDCAMCLASSROOMS_DATA_STATUS.IDLE,  //The status of the data fetch/send.
  classroomsStatusDetails: null,
  classroomsList: [],
  classroomsStudents: [],
  selectedClassroom: null,
  
  assignmentsStatus: WILDCAMCLASSROOMS_DATA_STATUS.IDLE,  //The status of the data fetch/send.
  assignmentsStatusDetails: null,
  assignmentsList: [],
  assignmentsAuxData: [],  //Auxilliary data from assignments.included.
  selectedAssignment: null,
  
  toast: {
    message: null,
    status: null,
  },
  showHelp: null,  //If set to a valid string value, shows the help/tutoria/guide for the specified activity.
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
  classroomsStatus: PropTypes.string,
  classroomsStatusDetails: PropTypes.object,
  classroomsList: PropTypes.array,
  classroomsStudents: PropTypes.array,
  selectedClassroom: PropTypes.object,
  
  assignmentsStatus: PropTypes.string,
  assignmentsStatusDetails: PropTypes.object,
  assignmentsList: PropTypes.array,
  assignmentsAuxData: PropTypes.array,
  selectedAssignment: PropTypes.object,
  
  toast: PropTypes.object,
  showHelp: PropTypes.string,
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

const resetClassrooms = (state) => {
  return {
    ...state,
    
    classroomsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsStatus,
    classroomsStatusDetails: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsDetails,
    classroomsList: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsList,
    classroomsStudents: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsStudents,
    selectedClassroom: WILDCAMCLASSROOMS_INITIAL_STATE.selectedClassroom,
    
    //Reset dependencies as well.
    assignmentsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsStatus,
    assignmentsStatusDetails: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsStatusDetails,
    assignmentsList: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsList,
    assignmentsAuxData: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsAuxData,
    selectedAssignment: WILDCAMCLASSROOMS_INITIAL_STATE.selectedAssignment,
  };
};

const setClassroomsStatus = (state, classroomsStatus) => {
  return { ...state, classroomsStatus };
};

const setClassroomsStatusDetails = (state, classroomsStatusDetails) => {
  return { ...state, classroomsStatusDetails };
};

const setClassroomsList = (state, classroomsList) => {
  return { ...state, classroomsList };
};

const setClassroomsStudents = (state, classroomsStudents) => {
  return { ...state, classroomsStudents };
};

const setSelectedClassroom = (state, selectedClassroom) => {
  return { ...state, selectedClassroom };
};

const resetSelectedClassroom = (state) => {
  return {
    ...state,
    selectedClassroom: null,
    selectedAssignment: null,  //Reset dependencies: selected assignment
  };
};

const resetAssignments = (state) => {
  return {
    ...state,
    
    assignmentsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsStatus,
    assignmentsStatusDetails: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsStatusDetails,
    assignmentsList: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsList,
    assignmentsAuxData: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsAuxData,
    selectedAssignment: WILDCAMCLASSROOMS_INITIAL_STATE.selectedAssignment,
  };
};

const setAssignmentsStatus = (state, assignmentsStatus) => {
  return { ...state, assignmentsStatus };
};

const setAssignmentsStatusDetails = (state, assignmentsStatusDetails) => {
  return { ...state, assignmentsStatusDetails };
};

const setAssignmentsList = (state, assignmentsList) => {
  return { ...state, assignmentsList };
};

const setAssignmentsAuxData = (state, assignmentsAuxData) => {
  return { ...state, assignmentsAuxData };
};

const setSelectedAssignment = (state, selectedAssignment) => {
  return { ...state, selectedAssignment };
};

const resetSelectedAssignment = (state) => {
  return {
    ...state,
    selectedAssignment: null,
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

/*  Shows or Hides help for the respective activity.
 */
const showHelp = (state, activity) => {
  return { ...state, showHelp: activity };
};
const hideHelp = (state) => {
  return { ...state, showHelp: null };
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
    
    API notes: 
      GET /teachers/classrooms/?program_id=123
 */
Effect('wcc_teachers_fetchClassrooms', ({ selectedProgram }) => {
  //Sanity check
  if (!selectedProgram) return;
  
  const program_id = selectedProgram.id;
  
  Actions.wildcamClassrooms.resetClassrooms();
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.FETCHING);
  
  return get('/teachers/classrooms/', [{ program_id }])
  
  .then((response) => {
    if (!response) { throw 'ERROR (wildcam-classrooms/ducks/wcc_teachers_fetchClassrooms): No response'; }
    if (response.ok && response.body) {
      return response.body;
    }
    throw 'ERROR (wildcam-classrooms/ducks/wcc_teachers_fetchClassrooms): Invalid response';
  })
  
  .then((body) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    Actions.wildcamClassrooms.setClassroomsList(body.data);
    Actions.wildcamClassrooms.setClassroomsStudents(body.included);
    return body;
  })
  
  .catch((err) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
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
Effect('wcc_teachers_createClassroom', ({ selectedProgram, classroomData }) => {
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
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_createClassroom): No response'; }
    if (response.ok &&
        response.body && response.body.data) {
      Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
      return response.body.data;
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_createClassroom): Invalid response';
  })
  .catch((err) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
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
  
  return put(`/teachers/classrooms/${selectedClassroom.id}`, { data: { attributes: classroomData } })
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
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });
});

/*  Deletes a classroom.

    API notes:
      DELETE /teachers/classrooms/12345
 */
Effect('wcc_teachers_deleteClassroom', (selectedClassroom) => {
  //Sanity check
  if (!selectedClassroom) return;
  
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);
  
  return httpDelete(`/teachers/classrooms/${selectedClassroom.id}`)
  .then((response) => {
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteClassroom): No response'; }
    if (response.ok) {
      return Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteClassroom): Invalid response';
  })
  .catch((err) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });  
});

/*  Deletes a student from a classroom.

    API notes:
      DELETE /teachers/classrooms/12345/student_users/67890
 */
Effect('wcc_teachers_deleteStudentFromClassroom', ({ studentId, selectedClassroom }) => {
  //Sanity check
  if (!selectedClassroom) return;
  
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);  //WARNING: does this make sense to update Classrooms status?
  
  return httpDelete(`/teachers/classrooms/${selectedClassroom.id}/student_users/${studentId}`)
  .then((response) => {
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteStudentFromClassroom): No response'; }
    if (response.ok) {
      return Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteStudentFromClassroom): Invalid response';
  })
  .catch((err) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });  
});

/*
--------------------------------------------------------------------------------
 */

/*  Fetch all the Classrooms for the selected Program from the Education API.
    Implicit: the list of Classrooms is limited to what's available to the
    logged-in user.
    
    API notes: 
      GET /students/classrooms/?program_id=123
 */
Effect('wcc_students_fetchClassrooms', ({ selectedProgram }) => {
  //Sanity check
  if (!selectedProgram) return;
  
  const program_id = selectedProgram.id;
  
  Actions.wildcamClassrooms.resetClassrooms();
  Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.FETCHING);
  
  return get('/students/classrooms/', [{ program_id }])
  
  .then((response) => {
    if (!response) { throw 'ERROR (wildcam-classrooms/ducks/wcc_students_fetchClassrooms): No response'; }
    if (response.ok && response.body) {
      return response.body;
    }
    throw 'ERROR (wildcam-classrooms/ducks/wcc_students_fetchClassrooms): Invalid response';
  })
  
  .then((body) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    Actions.wildcamClassrooms.setClassroomsList(body.data);
    Actions.wildcamClassrooms.setClassroomsStudents(body.included);
    return body;
  })
  
  .catch((err) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });
});

/*
--------------------------------------------------------------------------------
 */

/*  Refreshes the current view by fetching the latest data fromt he server..
    Called when, e.g. a Classroom is edited, to sync local data with the
    updated server data.
 */
Effect('wcc_teachers_refreshData', ({ selectedProgram, selectedClassroom = null, selectedAssignment = null }) => {
  //Sanity check
  if (!selectedProgram) return;
  
  //Save the current view, so we can retrieve it for after the refresh fetch is complete.
  const saved_selectedClassroom_id = (selectedClassroom) ? selectedClassroom.id : null;
  const saved_selectedAssignment_id = (selectedAssignment) ? selectedAssignment.id : null;
  
  //Fetch the latest data...
  return Actions.wcc_teachers_fetchClassrooms({ selectedProgram })
  .then((body) => {
    const classrooms = body.classrooms;
    
    //...then restore the user's previous view .
    const retrieved_selectedClassroom = (saved_selectedClassroom_id && classrooms)
      ? classrooms.find((classroom) => { return classroom.id === saved_selectedClassroom_id })
      : null;
    Actions.wildcamClassrooms.setSelectedClassroom(retrieved_selectedClassroom);
    
    //Also restore assignments, if any apply.
    if (retrieved_selectedClassroom && saved_selectedAssignment_id) {
      return Actions.wcc_fetchAssignments({ selectedClassroom: retrieved_selectedClassroom })
      .then((body) => {
        const assignments = body.data;
        
        const retrieved_selectedAssignment = (saved_selectedAssignment_id && assignments)
          ? assignments.find((assignment) => { return assignment.id === saved_selectedAssignment_id })
          : null;
        Actions.wildcamClassrooms.setSelectedAssignment(retrieved_selectedAssignment);
      })
      .catch((err) => {
        Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
        Actions.wildcamClassrooms.setAssignmentsStatusDetails(err);
        //showErrorMessage(err);
        throw(err);
      });
    } else {
      return null;
    }
  })
  .catch((err) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });
});

/*
--------------------------------------------------------------------------------
 */

/*  Fetch all the Assignments (optionally: for the selected Classroom) from the
    Education API.
    
    Implicit: the list of Assignments is limited to what's available to the
    logged-in user.
    
    NOTE: this fetches all assignments this user is a part of, whether they are
    a teacher or a student!
    
    API notes: 
      GET /assignments/?classroom_id=123
 */
Effect('wcc_fetchAssignments', ({ selectedClassroom }) => {
  //NOTE: if selectedClassroom isn't specified, this will pull a list of ALL
  //Assignments belonging to the user. This is useful in certain circumstances.
  //However, do note that the argument needs to be an empty object, e.g.
  //  `Actions.wcc_fetchAssignments({})`
  
  const classroom_id = (selectedClassroom) ? selectedClassroom.id : undefined;
  
  Actions.wildcamClassrooms.resetAssignments();
  Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.FETCHING);
  
  return get('/assignments/', [{ classroom_id }])
  
  .then((response) => {
    if (!response) { throw 'ERROR (wildcam-classrooms/ducks/wcc_fetchAssignments): No response'; }
    if (response.ok && response.body) {
      return response.body;
    }
    throw 'ERROR (wildcam-classrooms/ducks/wcc_fetchAssignments): Invalid response';
  })
  
  .then((body) => {
    Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    Actions.wildcamClassrooms.setAssignmentsList(body.data);
    Actions.wildcamClassrooms.setAssignmentsAuxData(body.included);
    return body;
  })
  
  .catch((err) => {
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });
});

/*  Creates an assignment.
    
    API notes:
      POST /assignments/ accepts the following payload structure:
      {
        "data": {
          "attributes": {
            "name": "Lion Cubs",
            "metadata": {
              "classifications_target": "1",
              "description": "An example assignment",
              "duedate": "2018-01-01",
              "filters": {
                "species": ["lioncub"]
              },
              "subjects": [
                "711506",
                "711514"
              ]
            },
            "workflow_id": "338"
          },
          "relationships": {
            "classroom": {
              "data": {
                "id": "1265",
                "type": "classrooms"
              }
            },
            "student_users": {
              "data": [
                { "id": "4245", "type": "student_user" },
                { "id": "4247", "type": "student_user"},
                { "id": "4248", "type": "student_user"}
              ]
            },
            "subjects": {
              "data": [
                { "id": "711506", "type": "subjects" },
                { "id": "711514", "type":"subjects"}
              ]
            }
          }
        }
      }
 */
Effect('wcc_teachers_createAssignment', ({ selectedProgram, selectedClassroom, assignmentData, students = [], filters = {}, subjects = []}) => {
  //Sanity check
  if (!selectedProgram || !selectedClassroom || !assignmentData) return;
  
  Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);
  
  const requestBody = {
    data: {
      attributes: {
        name: assignmentData.name || '',
        metadata: {
          classifications_target: (/\d+/.test(assignmentData.classifications_target)) ? assignmentData.classifications_target : '0',
          description: assignmentData.description || '',
          duedate: assignmentData.duedate || '',  //TODO: Validation
          filters: filters,
          subjects: subjects,
        },
        workflow_id: selectedProgram.metadata.workflowId,
      },
      relationships: {
        classroom: {
          data: {
            id: selectedClassroom.id,
            type: 'classrooms'
          }
        },
        student_users: {
          data: students.map((student_id) => {
            return {
              id: student_id,
              type: 'student_user',
            }
          })
        },
        subjects: {
          data: subjects.map((subject_id) => {
            return {
              id: subject_id,
              type: 'subjects',
            }
          })
        }
      }
    }
  };
  
  return post('/assignments/', requestBody)
  .then((response) => {
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_createAssignment): No response'; }
    if (response.ok &&
        response.body && response.body.data) {
      Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
      return response.body.data;
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_createAssignment): Invalid response';
  })
  .catch((err) => {
    Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setAssignmentsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });
});

/*  Edits an assignment.
    
    API notes:
      PUT /assignments/12345 accepts the following payload structure:
        {
          "data": {
            "attributes": {
              "name": "Lion Cubs Mk2",
              "metadata": {
                "classifications_target": "1",
                "description": "An example update",
                "duedate": "2018-01-01",
                "filters": {
                  "species": ["lioncub"]
                },
                "subjects":[
                  "711506",
                  "711514"
                ]
              }
            },
            "relationships": {
              "student_users": {
                "data": [
                  {"id":"4245","type":"student_user"}
                ]
              }
            }
          }
        }
 */
Effect('wcc_teachers_editAssignment', ({ selectedAssignment, assignmentData, students = [], filters = {}, subjects = [] }) => {
  //Sanity check
  if (!selectedAssignment || !assignmentData) return;
  
  Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);
  
  const requestBody = {
    data: {
      attributes: {        
        name: assignmentData.name || '',
        metadata: {
          classifications_target: (/\d+/.test(assignmentData.classifications_target)) ? assignmentData.classifications_target : '0',
          description: assignmentData.description || '',
          duedate: assignmentData.duedate || '',  //TODO: Validation
          filters: filters,
          subjects: subjects,
        },
      },
      relationships: {
        student_users: {
          data: students.map((student_id) => {
            return {
              id: student_id,
              type: 'student_user'
            };
          })
        }
      }
    }
  };
  
  return put(`/assignments/${selectedAssignment.id}`, requestBody)
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
    Actions.wildcamClassrooms.setClassroomsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setClassroomsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });
});

/*  Deletes an assignment.

    API notes:
      DELETE /assignments/12345
 */
Effect('wcc_teachers_deleteAssignment', (selectedAssignment) => {
  //Sanity check
  if (!selectedAssignment) return;
  
  Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SENDING);
  
  return httpDelete(`/assignments/${selectedAssignment.id}`)
  .then((response) => {
    if (!response) { throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteAssignment): No response'; }
    if (response.ok) {
      return Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS);
    }
    throw 'ERROR (ducks/wildcam-classrooms/ducks/wcc_teachers_deleteAssignment): Invalid response';
  })
  .catch((err) => {
    Actions.wildcamClassrooms.setAssignmentsStatus(WILDCAMCLASSROOMS_DATA_STATUS.ERROR);
    Actions.wildcamClassrooms.setAssignmentsStatusDetails(err);
    showErrorMessage(err);
    throw(err);
  });
  
});
/*
--------------------------------------------------------------------------------
 */

function showErrorMessage(err) {
  //Critical Error
  Actions.notification.setNotification({ status: 'critical', message: TEXT.STATUS.ERRORS.GENERAL });
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
  setClassroomsStatusDetails,
  setClassroomsList,
  setClassroomsStudents,
  setSelectedClassroom,
  resetSelectedClassroom,
  resetAssignments,
  setAssignmentsStatus,
  setAssignmentsStatusDetails,
  setAssignmentsList,
  setAssignmentsAuxData,
  setSelectedAssignment,
  resetSelectedAssignment,
  setToast,
  resetToast,
  showHelp,
  hideHelp,
});

export default wildcamClassrooms;
export {
  WILDCAMCLASSROOMS_COMPONENT_MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
};
