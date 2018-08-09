/*
AssignmentForm
--------------

Component for viewing, editing, or deleting a single assignment.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import { config } from '../../../lib/config';

import StatusWorking from './StatusWorking';
import StatusNotFound from './StatusNotFound';
import StatusBorked from './StatusBorked';
import StudentsList from './StudentsList';
import SubjectsList from './SubjectsList';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import TextInput from 'grommet/components/TextInput';
import NumberInput from 'grommet/components/NumberInput';

import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import CloseIcon from 'grommet/components/icons/base/Close';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES, WILDCAMMAP_MAP_STATE,
} from '../../wildcam-map/ducks/index.js';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

/*
--------------------------------------------------------------------------------
 */

const VIEWS = {
  CREATE_NEW: 'create',
  EDIT_EXISTING: 'edit',
  NOT_FOUND: 'not found',
}

const TEXT = {
  ACTIONS: {
    BACK: 'Back',
    SUBMIT: 'Submit',
    CREATE: 'Create',
    UPDATE: 'Update',
    DELETE: 'Delete',
    EDIT: 'Edit',
  },
  WORKING: 'Working...',
  JOIN_URL: 'Join URL',
  HEADINGS: {
    ASSIGNMENT: 'Assignment',
    CREATE_NEW_ASSIGNMENT: 'Create new assignment',
    EDIT_ASSIGNMENT: 'Edit assignment',
  },
  ASSIGNMENT_FORM: {
    NAME: 'Assignment name',
    DESCRIPTION: 'Instructions for students',
    CLASSIFICATIONS_TARGET: 'Number of subjects each student needs to classify',
    DUEDATE: 'Due date',
  },
  ASSIGNMENT_FORM_PLACEHOLDERS: {
    DUEDATE: 'e.g. 2020-12-31',
  },
  ERROR: {
    GENERAL: 'Something went wrong',
  },
  SUCCESS: {
    ASSIGNMENT_CREATED: 'Assignment created',
    ASSIGNMENT_EDITED: 'Changes saved',
    ASSIGNMENT_DELETED: 'Assignment deleted',
  },
};

const INITIAL_FORM_DATA = {
  name: '',
  description: '',
  classifications_target: '',
  duedate: '',
};

/*
--------------------------------------------------------------------------------
 */

class AssignmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      view: VIEWS.CREATE_NEW,
      form: INITIAL_FORM_DATA,  //Contains basic Assignment data: name, description, etc.
      formInitialised: false,  //Has initialiseForm() already been run?
      filters: {},
      subjects: [],
      students: [],  //This is a list of IDs for students selected for this Assignment.
    };
  }
  
  // ----------------------------------------------------------------
  
  componentDidMount() {
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialise(nextProps);
  }
  
  /*  //Initialise:
      //Fetch the selected assignment (and classroom) data.
      
      Based on the route/URL, we'll either create a new assignment or edit an existing one.
        .../classrooms/123/assignments/new - create a new assignment (i.e. no assignment_id parameter)
        .../classrooms/123/assignments/456 - edit assignment 456 (i.e. assignment_id=456 supplied.)
   */
  initialise(props = this.props) {
    const state = this.state;
    
    const classroom_id = (props.match && props.match.params)
      ? props.match.params.classroom_id : undefined;
    const assignment_id = (props.match && props.match.params)
      ? props.match.params.assignment_id : undefined;
    
    //Sanity check
    if (!classroom_id) return;
    const selectedClassroom = props.classroomsList &&
      props.classroomsList.find((classroom) => {
        return classroom.id === classroom_id
      });
    if (!selectedClassroom) return;
    
    //Data store update + Redundancy Check (prevent infinite loop, only trigger once)
    if (props.selectedClassroom !== selectedClassroom) {
      Actions.wildcamClassrooms.setSelectedClassroom(selectedClassroom);
    }
    
    //If we don't have a list of assignments yet, fetch it.
    //Redundancy Check: prevent infinite loop, only trigger once.
    if (props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.IDLE) {
      Actions.wcc_fetchAssignments({ selectedClassroom });
    } else {
      this.initialise_partTwo(props, classroom_id, assignment_id, props.assignmentsList);
    }
  }
  
  initialise_partTwo(props, classroom_id, assignment_id, assignmentsList) {
    //Create a new assignment
    if (!assignment_id) {  //Note: there should never be assignment_id === 0 or ''
      this.setState({ view: VIEWS.CREATE_NEW });
      this.initialiseForm(props, null);
    
    //Edit an existing assignment... if we can find it.
    } else {
      const selectedAssignment = assignmentsList &&
        assignmentsList.find((assignment) => {
          return assignment.id === assignment_id
        });

      //If classroom is found, edit it.
      if (selectedAssignment) {
        //Data store update
        Actions.wildcamClassrooms.setSelectedAssignment(selectedAssignment);
        
        //Also extract initial subjects and filters used by the Assignment
        if (!this.state.subjects || this.state.subjects.length === 0) {
          const newSubjects = (selectedAssignment.metadata && selectedAssignment.metadata.subjects)
            ? selectedAssignment.metadata.subjects.map((subject) => {
                return {
                  subject_id: subject,
                  location: null,
                };
              })
            : [];
          const newFilters = (selectedAssignment.metadata)
            ? selectedAssignment.metadata.filters
            : {};
          const newStudents = (selectedAssignment.relationships
                               && selectedAssignment.relationships.student_users
                               && selectedAssignment.relationships.student_users.data)
            ? selectedAssignment.relationships.student_users.data.map(s => s.id)
            : [];
          
          this.setState({
            subjects: newSubjects,
            filters: newFilters,
            students: newStudents,
          });
        }
        
        //View update
        this.setState({ view: VIEWS.EDIT_EXISTING });
        this.initialiseForm(props, selectedAssignment);
        
      //Otherwise, uh oh.
      } else {
        //Data store update
        Actions.wildcamClassrooms.resetSelectedAssignment();

        //View update
        this.setState({ view: VIEWS.NOT_FOUND });
      }
    }
  }
  
  /*  Initialises the classroom form.
   */
  initialiseForm(props, selectedAssignment) {
    //Only run this once per page load, thank you.
    if (this.state.formInitialised) return;
    this.setState({ formInitialised: true });
    
    if (!selectedAssignment) {
      this.setState({
        form: INITIAL_FORM_DATA,
      });
    } else {
      const originalForm = INITIAL_FORM_DATA;
      const updatedForm = {};
      Object.keys(originalForm).map((key) => {
        //The structure for Assignments is weird.
        if (selectedAssignment && selectedAssignment.metadata && selectedAssignment.metadata[key]) {
          updatedForm[key] = selectedAssignment.metadata[key];
        } else if (selectedAssignment && selectedAssignment.attributes && selectedAssignment.attributes[key]) {
          updatedForm[key] = selectedAssignment.attributes[key];
        } else {
          updatedForm[key] = originalForm[key];
        }
      });
      
      this.setState({
        form: updatedForm,
      });
    }
    
    //WildCam Map Selected Subjects:
    //Check the connection to WildCam Maps to see if the user recently selected
    //Subjects for the Assignment.
    if (props.wccwcmSelectedSubjects && props.wccwcmSavedAssignmentState) {
      this.setState({
        subjects: props.wccwcmSelectedSubjects,
        filters: props.wccwcmSelectedFilters,
        form: {
          ...this.state.form,
          ...props.wccwcmSavedAssignmentState,
          classifications_target: props.wccwcmSelectedSubjects.length,
          //TODO: reload selected students
        }
      });
      Actions.wildcamMap.resetWccWcmAssignmentData();
    }
  }
  
  // ----------------------------------------------------------------
  
  updateForm(e) {
    let val = e.target.value;
    
    //Special case: classificatons_target
    //The number of Classfications a Student needs to do cannot exceed the amount of Subjects selected.
    if (e.target.id === 'classifications_target') {
      let maxVal = (this.state.subjects) ? this.state.subjects.length : 0;
      val = parseInt(val);
      if (isNaN(val)) val = 0;
      val = Math.min(maxVal, val);
      val = Math.max(0, val);
    }
    
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: val,
      }
    });
    
    //Apparently [square_brackets] a superconvenient way of specifying an
    //object key name that's variable. Sweet.
    
  }
  
  submitForm(e) {
    const props = this.props;
    const state = this.state;
    
    //Prevent standard browser actions
    e.preventDefault();
    
    //Sanity check
    if (!props.selectedProgram) return;
    if (!props.selectedClassroom) return;
    
    //Change state values into something the API likes.
    const filters = (state.filters) ? state.filters : {};
    const subjects = (state.subjects)
      ? state.subjects.map(sub => sub.subject_id)
      : [];
    const students = (state.students) ? state.students : [];
    
    //Submit Form: create new assignment
    if (state.view === VIEWS.CREATE_NEW) {
      return Actions.wcc_teachers_createAssignment({
        selectedProgram: props.selectedProgram,
        selectedClassroom: props.selectedClassroom,
        assignmentData: state.form,
        filters,
        subjects,
        students,
      })
      .then(() => {
        //Message
        Actions.wildcamClassrooms.setToast({ message: TEXT.SUCCESS.ASSIGNMENT_CREATED, status: 'ok' });
        
        //Refresh
        return Actions.wcc_teachers_refreshData({ selectedProgram: props.selectedProgram })
        .then(() => {
          //Transition to: View Selected Classroom
          props.history && props.history.push('../');
        });
      }).catch((err) => {
        //Error messaging done in Actions.wcc_teachers_createAssignment()
      });
    
    //Submit Form: update existing classroom
    } else if (state.view === VIEWS.EDIT_EXISTING) {
      return Actions.wcc_teachers_editAssignment({
        selectedAssignment: props.selectedAssignment,
        assignmentData: state.form,
        filters,
        subjects,
        students,
      }).then(() => {
        //Message
        Actions.wildcamClassrooms.setToast({ message: TEXT.SUCCESS.ASSIGNMENT_EDITED, status: 'ok' });
        
        //Refresh
        return Actions.wcc_teachers_refreshData({
          selectedProgram: props.selectedProgram,
          selectedClassroom: props.selectedClassroom,
          selectedAssignment: props.selectedAssignment,
        })
        .then(() => {
          //Nothing
        });
      }).catch((err) => {
        //Error messaging done in Actions.wcc_teachers_createClassroom()
      });
    }
  }

  // ----------------------------------------------------------------

  render() {
    const props = this.props;
    const state = this.state;
    
    //Get students and assignments only for this classroom.
    //const students = (props.selectedClassroom && props.selectedClassroom.students) ? props.selectedClassroom.students : [];
    //const assignments = (props.selectedClassroom && props.assignments && props.assignments[props.selectedClassroom.id])
    //  ? props.assignments[props.selectedClassroom.id]
    //  : [];
    
    //State: Working
    //Data is being processed. Don't let the user do anything.
    if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING || props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING ||
        props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING || props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING) {
      return (
        <Box
          className="assignment-form"
          margin="medium"
          pad="medium"
        >
          {this.render_workingState()}
        </Box>
      );
    }
    
    //State: Ready
    //Page is now ready to accept user input.
    if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS && props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
      return (
        <Box
          className="assignment-form"
          margin="medium"
          pad="medium"
        >
          {(state.view === VIEWS.CREATE_NEW || state.view === VIEWS.EDIT_EXISTING) ? this.render_editState() : null }
          {(state.view === VIEWS.NOT_FOUND) ? this.render_notFoundState() : null }

          <ScrollToTopOnMount />
        </Box>
      );
    }
    
    //State: Error
    if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.ERROR ||
        props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.ERROR) {
      return (
        <Box
          className="assignment-form"
          margin="medium"
          pad="medium"
        >
          {this.render_errorState()}
        </Box>
      );
    }
    
    //State: WTF
    //How did we even get here?
    return null;
  }
  
  render_editState() {
    const props = this.props;
    const state = this.state;
    
    return (
      <Form
        className="form"
        onSubmit={this.submitForm.bind(this)}
      >
        <Heading tag="h2">
          {(() => {
            switch (state.view) {
              case VIEWS.CREATE_NEW: return TEXT.HEADINGS.CREATE_NEW_ASSIGNMENT;
              case VIEWS.EDIT_EXISTING: return TEXT.HEADINGS.EDIT_ASSIGNMENT;
              default: return '???';  //This should never trigger
            }
          })()}
        </Heading>

        <fieldset>
          <FormField htmlFor="name" label={TEXT.ASSIGNMENT_FORM.NAME}>
            <TextInput
              id="name"
              required={true}
              value={this.state.form.name}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <fieldset>
          <FormField htmlFor="subject" label={TEXT.ASSIGNMENT_FORM.DESCRIPTION}>
            <textarea
              id="description"
              value={this.state.form.description}
              onChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>
        
        <fieldset>
          <FormField htmlFor="name" label={TEXT.ASSIGNMENT_FORM.DUEDATE}>
            <TextInput
              id="duedate"
              value={this.state.form.duedate}
              onDOMChange={this.updateForm.bind(this)}
              placeHolder={TEXT.ASSIGNMENT_FORM_PLACEHOLDERS.DUEDATE}
            />
          </FormField>
        </fieldset>
        
        {
          //TODO: add (optional) Assignment link for students?
        }
        
        <SubjectsList
          history={props.history}
          location={props.location}
          match={props.match}
          selectedClassroom={props.selectedClassroom}
          selectedAssignment={props.selectedAssignment}
          filters={state.filters}
          subjects={state.subjects}
          wccwcmMapPath={props.wccwcmMapPath}
          assignmentStateForSaving={state.form}
        />
        
        {(state.subjects && state.subjects.length > 0) && (
          <fieldset>
            <FormField htmlFor="name" label={TEXT.ASSIGNMENT_FORM.CLASSIFICATIONS_TARGET}>
              <NumberInput
                id="classifications_target"
                value={this.state.form.classifications_target || 0}
                onChange={this.updateForm.bind(this)}
              />
            </FormField>
          </fieldset>
        )}
        
        <StudentsList
          selectedClassroom={props.selectedClassroom}
          selectedAssignment={props.selectedAssignment}
          selectedStudents={state.students}
          doSelectStudent={(studentId) => {
            //When a student is selected, add/remove them from the list.
            let updatedStudents = state.students.slice();
            if (updatedStudents.indexOf(studentId) >= 0) {
              updatedStudents = updatedStudents.filter((s) => s !== studentId)
            } else {
              updatedStudents.push(studentId);
            }
            this.setState({
              students: updatedStudents
            });
          }}
        />

        <Footer
          className="actions-panel"
          pad="medium"
        >
          <Button
            className="button"
            icon={<LinkPreviousIcon size="small" />}
            label={TEXT.ACTIONS.BACK}
            onClick={() => {
              props.history && props.history.push('../');
            }}
          />
          <Button
            className="button"
            icon={<LinkNextIcon size="small" />}
            label={(() => {
              switch (state.view) {
                case VIEWS.CREATE_NEW: return TEXT.ACTIONS.CREATE;
                case VIEWS.EDIT_EXISTING: return TEXT.ACTIONS.UPDATE;
                default: return TEXT.ACTIONS.SUBMIT;  //This should never trigger
              }
            })()}
            primary={true}
            type="submit"
          />
          {(state.view !== VIEWS.EDIT_EXISTING || !props.selectedClassroom) ? null
            : (
              <Button
                className="button"
                icon={<CloseIcon size="small" />}
                label={TEXT.ACTIONS.DELETE}
                onClick={() => {
                  return Actions.wcc_teachers_deleteAssignment(props.selectedAssignment)
                  .then(() => {
                    //Message
                    Actions.wildcamClassrooms.setToast({ message: TEXT.SUCCESS.ASSIGNMENT_DELETED, status: 'ok' });
                    
                    //Refresh
                    return Actions.wcc_teachers_refreshData({ selectedProgram: props.selectedProgram, selectedClassroom: props.selectedClassroom })
                    .then(() => {
                      //Transition to: View Selected Classroom
                      props.history && props.history.push('../');
                    });
                  }).catch((err) => {
                    //Error messaging done in Actions.wcc_teachers_deleteAssignment()
                  });
                }}
              />
            )
          }
        </Footer>
      </Form>
    );
  }
  
  render_workingState() {
    return (
      <StatusWorking />
    );
  }
  
  render_notFoundState() {
    return (
      <StatusNotFound />
    );
  }
  
  render_errorState() {
    return (
      <StatusBorked
        classroomsStatusDetails={this.props.classroomsStatusDetails}
        assignmentsStatusDetails={this.props.assignmentsStatusDetails}
      />
    );
  }
};

/*
--------------------------------------------------------------------------------
 */

AssignmentForm.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
  ...WILDCAMMAP_INITIAL_STATE,
};

AssignmentForm.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
  ...WILDCAMMAP_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.programs.selectedProgram,
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
    ...WILDCAMMAP_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(AssignmentForm);