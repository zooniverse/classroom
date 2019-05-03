/*
ClassroomForm
-------------

Component for viewing, editing, or deleting a single classroom.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import CopyToClipboard from 'react-copy-to-clipboard';

import { config } from '../../../lib/config';
import { TEXT } from '../text.js';

import StatusWorking from './StatusWorking';
import StatusNotFound from './StatusNotFound';
import StatusBorked from './StatusBorked';
import StudentsList from './StudentsList';
import AssignmentsList from './AssignmentsListForEducators';
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

import CloseIcon from 'grommet/components/icons/base/Close';
import CopyIcon from 'grommet/components/icons/base/Copy';
import HelpIcon from 'grommet/components/icons/base/Help';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
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
  VIEW_EXISTING: 'view',
  EDIT_EXISTING: 'edit',
  NOT_FOUND: 'not found',
}

const INITIAL_FORM_DATA = {
  name: '',
  subject: '',
  school: '',  //Not used
  description: '',  //Not used
};

/*
--------------------------------------------------------------------------------
 */

class ClassroomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      view: VIEWS.CREATE_NEW,
      form: INITIAL_FORM_DATA,
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
      //Fetch the selected classroom data.
      
      Based on the route/URL, we'll either create a new classroom or edit an existing one.
        .../classrooms/new - create a new classroom (i.e. no classroom_id parameter)
        .../classrooms/123 - edit classroom 123 (i.e. classroom_id=123 supplied.)
   */
  initialise(props = this.props) {
    const state = this.state;
    
    const classroom_id = (props.match && props.match.params)
      ? props.match.params.classroom_id : undefined;
    
    //Create a new classroom
    if (!classroom_id) {  //Note: there should never be classroom_id === 0 or ''
      this.setState({ view: VIEWS.CREATE_NEW });
      this.initialiseForm(null);
    
    //Edit an existing classroom... if we can find it.
    } else {
      //Find the classroom
      const selectedClassroom = props.classroomsList &&
        props.classroomsList.find((classroom) => {
          return classroom.id === classroom_id
        });
      
      //If classroom is found, edit it.
      if (selectedClassroom) {
        const previousClassroomId = props.selectedClassroom && props.selectedClassroom.id;
        const shouldFetchAssignments = (previousClassroomId !== selectedClassroom.id) || (props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.IDLE);
        
        //Set the selected classroom...
        Actions.wildcamClassrooms.setSelectedClassroom(selectedClassroom);
        
        //...and if either the selected classroom changed, or the assignments haven't been fetched yet, fetch those assignments. 
        if (shouldFetchAssignments) {
          Actions.wcc_fetchAssignments({ selectedClassroom });
        }
        
        //View update
        this.setState({ view: VIEWS.VIEW_EXISTING });
        this.initialiseForm(selectedClassroom);
        
      //Otherwise, uh oh.
      } else {
        //Data store update
        Actions.wildcamClassrooms.resetSelectedClassroom();
        
        //View update
        this.setState({ view: VIEWS.NOT_FOUND });
      }
      
    }
  }
  
  /*  Initialises the classroom form.
   */
  initialiseForm(selectedClassroom) {
    if (!selectedClassroom) {
      this.setState({ form: INITIAL_FORM_DATA });
    } else {
      const originalForm = INITIAL_FORM_DATA;
      const updatedForm = {};
      Object.keys(originalForm).map((key) => {
        updatedForm[key] = (selectedClassroom && selectedClassroom[key])
          ? selectedClassroom[key]
          : originalForm[key];
      });
      this.setState({ form: updatedForm });
    }
  }
  
  // ----------------------------------------------------------------
  
  updateForm(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value
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
    if (state.view === VIEWS.VIEW_EXISTING && !props.selectedClassroom) return;
    
    //Submit Form: create new classroom
    if (state.view === VIEWS.CREATE_NEW) {
      return Actions.wcc_teachers_createClassroom({
        selectedProgram: props.selectedProgram,
        classroomData: this.state.form,
      })
      .then(() => {
        //Message
        Actions.wildcamClassrooms.setToast({ message: TEXT.STATUS.SUCCESSES.CLASSROOM_CREATED, status: 'ok' });
        
        //Refresh
        return Actions.wcc_teachers_refreshData({ selectedProgram: props.selectedProgram })
        .then(() => {
          //Transition to: View All Classrooms
          props.history && props.history.push('../');
        });
      }).catch((err) => {
        //Error messaging done in Actions.wcc_teachers_createClassroom()
      });
    
    //Submit Form: update existing classroom
    } else if (state.view === VIEWS.EDIT_EXISTING) {
      return Actions.wcc_teachers_editClassroom({
        selectedClassroom: props.selectedClassroom,
        classroomData: this.state.form,
      }).then(() => {
        //Message
        Actions.wildcamClassrooms.setToast({ message: TEXT.STATUS.SUCCESSES.CLASSROOM_EDITED, status: 'ok' });
        
        //Refresh
        return Actions.wcc_teachers_refreshData({
          selectedProgram: props.selectedProgram,
          selectedClassroom: props.selectedClassroom,
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
    if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING || props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING) {
      return (
        <Box
          className="classroom-form"
          margin="medium"
          pad="medium"
        >
          {this.render_workingState()}
        </Box>
      );
    }
    
    //State: Ready
    //Page is now ready to accept user input.
    if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
      return (
        <Box
          className="classroom-form"
          margin="medium"
          pad="medium"
        >
          {(state.view === VIEWS.VIEW_EXISTING) ? this.render_viewState() : null }
          {(state.view === VIEWS.CREATE_NEW || state.view === VIEWS.EDIT_EXISTING) ? this.render_editState() : null }
          {(state.view === VIEWS.NOT_FOUND) ? this.render_notFoundState() : null }

          <ScrollToTopOnMount />
        </Box>
      );
    }
    
    //State: Error
    if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.ERROR) {
      return (
        <Box
          className="classroom-form"
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
  
  render_viewState() {
    const props = this.props;
    const state = this.state;
    
    //Sanity check
    if (!props.selectedClassroom) return;
    
    const joinURL = `${config.origin}/#/${props.selectedProgram.slug}/students/classrooms/${props.selectedClassroom.id}/join?token=${props.selectedClassroom.joinToken}`;
    
    return (
      <Box
        className="details"
        onSubmit={this.submitForm.bind(this)}
      >
        <Heading tag="h2">
          {TEXT.TITLES.CLASSROOM} - {props.selectedClassroom.name}
        </Heading>
        
        <List className="details-list">
          {(props.selectedClassroom.subject) ? (
            <ListItem pad="small" separator="none">
              <Label>{TEXT.CLASSROOM_FORM.SUBJECT}</Label>
              <span>{props.selectedClassroom.subject}</span>
            </ListItem>
          ) : null}
          <ListItem pad="small" separator="none">
            <Label>{TEXT.LABELS.JOIN_URL}</Label>
            <span>
              {joinURL}
              <CopyToClipboard
                text={joinURL}
                onCopy={() => { Actions.wildcamClassrooms.setToast({ status: 'ok', message: TEXT.STATUS.SUCCESSES.COPIED_TO_CLIPBOARD }); }}>
                <Button
                  type="button"
                  className="button"
                  icon={<CopyIcon size="small" />}
                  plain={true}
                  onClick={() => {}}
                />
              </CopyToClipboard>
              <div className="helper-text">
                {TEXT.HELPERS.EDUCATORS_JOIN_URL}
              </div>
            </span>
          </ListItem>
        </List>

        <Footer
          className="actions-panel"
          pad="medium"
        >
          <Button
            className="button"
            icon={<LinkPreviousIcon size="small" />}
            label={TEXT.ACTIONS.BACK}
            onClick={() => {
              //Transition to: View All Classrooms
              props.history && props.history.push('../');
            }}
          />
          
          <Button
            className="button"
            icon={<LinkNextIcon size="small" />}
            label={TEXT.ACTIONS.EDIT}
            onClick={() => {
              //In-page transition to: Edit mode
              this.setState({ view: VIEWS.EDIT_EXISTING });
            }}
          />
        </Footer>
        
        <AssignmentsList
          selectedClassroom={props.selectedClassroom}
          assignmentsList={props.assignmentsList}
          history={props.history}
          location={props.location}
          match={props.match}
        />
        
        <StudentsList
          selectedClassroom={props.selectedClassroom}
          selectedAssignment={null}
          doDeleteStudent={(student) => {
            const studentId = student && student.id;
            
            return Actions.wcc_teachers_deleteStudentFromClassroom({ studentId, selectedClassroom: props.selectedClassroom })
            .then(() => {
              //Message
              Actions.wildcamClassrooms.setToast({ message: TEXT.STATUS.SUCCESSES.STUDENT_DELETED_FROM_CLASSROOM, status: 'ok' });

              //Refresh
              return Actions.wcc_teachers_refreshData({ selectedProgram: props.selectedProgram, selectedClassroom: props.selectedClassroom });
            }).catch((err) => {
              //Error messaging done in Actions.wcc_teachers_deleteStudentFromClassroom()
            });
          }}
        />
      </Box>
    );
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
              case VIEWS.CREATE_NEW: return TEXT.TITLES.CREATE_NEW_CLASSROOM;
              case VIEWS.EDIT_EXISTING: return TEXT.TITLES.EDIT_CLASSROOM;
              default: return '???';  //This should never trigger
            }
          })()}
        </Heading>

        <fieldset>
          <FormField htmlFor="name" label={TEXT.CLASSROOM_FORM.NAME}>
            <TextInput
              id="name"
              required={true}
              value={this.state.form.name}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <fieldset>
          <FormField htmlFor="subject" label={TEXT.CLASSROOM_FORM.SUBJECT}>
            <TextInput
              id="subject"
              value={this.state.form.subject}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        {
        //Removed at the request of HHMI
        //--------
        //<fieldset>
        //  <FormField htmlFor="school" label={TEXT.CLASSROOM_FORM.SCHOOL}>
        //    <TextInput
        //      id="school"
        //      value={this.state.form.school}
        //      onDOMChange={this.updateForm.bind(this)}
        //    />
        //  </FormField>
        //</fieldset>
        //--------
        }

        {
        //Removed at the request of HHMI, based on teacher feedback
        //--------
        //<fieldset>
        //  <FormField htmlFor="school" label={TEXT.CLASSROOM_FORM.DESCRIPTION}>
        //    <TextInput
        //      id="description"
        //      value={this.state.form.description}
        //      onDOMChange={this.updateForm.bind(this)}
        //    />
        //  </FormField>
        //</fieldset>
        //--------
        }

        <Footer
          className="actions-panel"
          pad="medium"
        >
          <Button
            className="button"
            icon={<LinkPreviousIcon size="small" />}
            label={TEXT.ACTIONS.BACK}
            onClick={() => {
              if (state.view === VIEWS.CREATE_NEW) {
                //Transition to: View All Classrooms
                props.history && props.history.push('../');
              } else if (state.view === VIEWS.EDIT_EXISTING) {
                //In-page transition to: Edit mode
                this.setState({ view: VIEWS.VIEW_EXISTING });
              }
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
                  return Actions.wcc_teachers_deleteClassroom(props.selectedClassroom)
                  .then(() => {
                    //Message
                    Actions.wildcamClassrooms.setToast({ message: TEXT.STATUS.SUCCESSES.CLASSROOM_DELETED, status: 'ok' });
                    
                    //Refresh
                    return Actions.wcc_teachers_refreshData({ selectedProgram: props.selectedProgram })
                    .then(() => {
                      //Transition to: View All Classrooms
                      props.history && props.history.push('../');
                    });
                  }).catch((err) => {
                    //Error messaging done in Actions.wcc_teachers_deleteClassroom()
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

ClassroomForm.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

ClassroomForm.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.programs.selectedProgram,
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(ClassroomForm);