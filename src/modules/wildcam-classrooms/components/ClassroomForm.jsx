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

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import TextInput from 'grommet/components/TextInput';

import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import CloseIcon from 'grommet/components/icons/base/Close';
import SpinningIcon from 'grommet/components/icons/Spinning';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

//import { config } from '../../../lib/config';

const VIEWS = {
  CREATE: 'create',
  EDIT: 'edit',
  NOT_FOUND: 'classroom not found',
}

const TEXT = {
  ACTIONS: {
    BACK: 'Back',
    SUBMIT: 'Submit',
    CREATE: 'Create',
    UPDATE: 'Update',
    DELETE: 'Delete',
  },
  WORKING: 'Working...',
  HEADINGS: {
    CREATE_NEW_CLASSROOM: 'Create new classroom',
    EDIT_CLASSROOM: 'Edit classroom',
  },
  CLASSROOM_FORM: {
    NAME: 'Classroom name',
    SUBJECT: 'Classroom subject',
    SCHOOL: 'School',
    DESCRIPTION: 'Description',
  },
  ERROR: {
    GENERAL: 'Something went wrong',
  },
  SUCCESS: {
    CLASSROOM_CREATED: 'Classroom created',
    CLASSROOM_EDITED: 'Changes saved',
    CLASSROOM_DELETED: 'Classroom deleted',
  },
};

const INITIAL_FORM_DATA = {
  name: '',
  subject: '',
  school: '',
  description: '',
};

class ClassroomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      view: VIEWS.CREATE,
      form: INITIAL_FORM_DATA,
      //Note: the reason this object structure is one level deep is because
      //the state previously had other things stored here, e.g. state.mode.
    };
  }
  
  // ----------------------------------------------------------------
  
  componentDidMount() {
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialise(nextProps);
  }
  
  //Initialise:
  //Fetch the selected classroom data.
  initialise(props = this.props) {
    const state = this.state;
    
    //Based on the route/URL, we'll either create a new classroom or edit an existing one.
    // .../classroom/new - create a new classroom (i.e. no classroom_id parameter)
    // .../classroom/123 - edit classroom 123 (i.e. classroom_id=123 supplied.)
    
    const classroom_id = (props.match && props.match.params)
      ? props.match.params.classroom_id : undefined;
    
    if (!classroom_id) {  //Note: there should never be classroom_id === 0 or ''
      console.log('+++ ClassroomForm CREATE: ', props);
      
      //Create a new classroom
      this.setState({ view: VIEWS.CREATE });
      this.initialiseForm(null);
    } else {
      console.log('+++ ClassroomForm EDIT: ', props);
      
      //Edit an existing classroom... if we can find it.
      const selectedClassroom = props.classroomsList &&
        props.classroomsList.find((classroom) => {
          return classroom.id === classroom_id
        });
      
      if (selectedClassroom) {
        console.log('+++ ClassroomForm EDIT classroom found');
        
        //Data update
        Actions.wildcamClassrooms.setSelectedClassroom(selectedClassroom);
        
        //View update
        this.setState({ view: VIEWS.EDIT });
        this.initialiseForm(selectedClassroom);
      } else {
        console.log('+++ ClassroomForm EDIT classroom NOT found...');
        
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
      console.log('+++ YEAH ', selectedClassroom);
      
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
    console.log('+++ SUBMITFORM() ', props.selectedClassroom, state.view);
    if (!props.selectedProgram) return;
    if (state.view === VIEWS.EDIT && !props.selectedClassroom) return;
    
    if (state.view === VIEWS.CREATE) {
      console.log('+++ SUBMITFORM() CREATE');
      
      return Actions.wcc_teachers_createClassroom({
        selectedProgram: props.selectedProgram,
        classroomData: this.state.form,
      })
      .then(() => {
        //Message
        Actions.wildcamClassrooms.setToast({ message: TEXT.SUCCESS.CLASSROOM_CREATED, status: 'ok' });
        
        //Refresh
        //Note: this will set the data state to 'sending'.
        Actions.wcc_teachers_fetchClassrooms(props.selectedProgram).then(() => {
          //Transition to: View All Classrooms
          props.history && props.history.push('../');
          //Actions.wildcamClassrooms.resetSelectedClassroom();
          //Actions.wildcamClassrooms.setComponentMode(WILDCAMCLASSROOMS_COMPONENT_MODES.VIEW_ALL_CLASSROOMS);
        });
      }).catch((err) => {
        //Error messaging done in Actions.wcc_teachers_createClassroom()
      });
    } else if (state.view === VIEWS.EDIT) {
      console.log('+++ SUBMITFORM() EDIT');
      
      return Actions.wcc_teachers_editClassroom({
        selectedClassroom: props.selectedClassroom,
        classroomData: this.state.form,
      }).then(() => {
        //Message
        Actions.wildcamClassrooms.setToast({ message: TEXT.SUCCESS.CLASSROOM_EDITED, status: 'ok' });
        
        //Refresh
        return Actions.wcc_teachers_refreshView({
          program: props.selectedProgram,
          componentMode: props.componentMode,
          selectedClassroom: props.selectedClassroom,
        });
      }).catch((err) => {
        //Error messaging done in Actions.wcc_teachers_createClassroom()
      });
    }
  }
  
  // ----------------------------------------------------------------

  /*componentDidMount() {
    this.initialiseForm(this.props.selectedClassroom);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedClassroom !== nextProps.selectedClassroom) {
      this.initialiseForm(nextProps.selectedClassroom);
    }
  }*/

  // ----------------------------------------------------------------

  render() {
    const props = this.props;
    //const state = this.state;
    //const joinURL = props.selectedClassroom
    //  ? `${config.origin}/#/${props.selectedProgram.slug}/students/classrooms/${props.selectedClassroom.id}/join?token=${props.selectedClassroom.joinToken}`
    //  : '';

    //Get students and assignments only for this classroom.
    //const students = (props.selectedClassroom && props.selectedClassroom.students) ? props.selectedClassroom.students : [];
    //const assignments = (props.selectedClassroom && props.assignments && props.assignments[props.selectedClassroom.id])
    //  ? props.assignments[props.selectedClassroom.id]
    //  : [];
    
    return (
      <Box
        className="classroom-form"
        margin="medium"
        pad="medium"
      >
        {(() => {
          if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
            return this.render_readyState();
          } else if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING || props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING) {
            return this.render_workingState();
          }
        })()}
      </Box>
    );
    
    return null;
  }
  
  render_readyState() {
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
              case VIEWS.CREATE: return TEXT.HEADINGS.CREATE_NEW_CLASSROOM;
              case VIEWS.EDIT: return TEXT.HEADINGS.EDIT_CLASSROOM;
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

        <fieldset>
          <FormField htmlFor="school" label={TEXT.CLASSROOM_FORM.SCHOOL}>
            <TextInput
              id="school"
              value={this.state.form.school}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <fieldset>
          <FormField htmlFor="school" label={TEXT.CLASSROOM_FORM.DESCRIPTION}>
            <TextInput
              id="description"
              value={this.state.form.description}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

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
              //Actions.wildcamClassrooms.resetSelectedClassroom();
              //Actions.wildcamClassrooms.setComponentMode(WILDCAMCLASSROOMS_COMPONENT_MODES.VIEW_ALL_CLASSROOMS);
            }}
          />
          <Button
            className="button"
            icon={<LinkNextIcon size="small" />}
            label={(() => {
              switch (state.view) {
                case VIEWS.CREATE: return TEXT.ACTIONS.CREATE;
                case VIEWS.EDIT: return TEXT.ACTIONS.UPDATE;
                default: return TEXT.ACTIONS.SUBMIT;  //This should never trigger
              }
            })()}
            primary={true}
            type="submit"
          />
          {(state.view !== VIEWS.EDIT || !props.selectedClassroom) ? null
            : (
              <Button
                className="button"
                icon={<CloseIcon size="small" />}
                label={TEXT.ACTIONS.DELETE}
                onClick={() => {
                  return Actions.wcc_teachers_deleteClassroom(props.selectedClassroom)
                  .then(() => {
                    //Message
                    Actions.wildcamClassrooms.setToast({ message: TEXT.SUCCESS.CLASSROOM_DELETED, status: 'ok' });

                    //Refresh
                    //Note: this will set the data state to 'sending'.
                    Actions.wcc_teachers_fetchClassrooms(props.selectedProgram).then(() => {
                      //Transition to: View All Classrooms
                      props.history && props.history.push('../');
                      //Actions.wildcamClassrooms.resetSelectedClassroom();
                      //Actions.wildcamClassrooms.setComponentMode(WILDCAMCLASSROOMS_COMPONENT_MODES.VIEW_ALL_CLASSROOMS);
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
      <Box
        align="center"
        alignContent="center"
        className="status-box"
        direction="column"
        pad="medium"
      >
        <SpinningIcon />
        <Label>{TEXT.WORKING}</Label>
      </Box>
    );
  }
};

ClassroomForm.VIEWS = VIEWS;
ClassroomForm.defaultProps = {
  location: null,
  history: null,
  match: null,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

ClassroomForm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
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