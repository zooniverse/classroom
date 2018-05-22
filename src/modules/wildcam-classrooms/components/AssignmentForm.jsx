/*
AssignmentForm
-------------

Component for viewing, editing, or deleting a single assignment.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

//import { config } from '../../../lib/config';

const VIEWS = {
  CREATE: 'create',
  EDIT: 'edit',
}

const TEXT = {};

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
} from '../ducks/index.js';

const INITIAL_FORM_DATA = {
  name: '',
};

class AssignmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      form: INITIAL_FORM_DATA,
      //Note: the reason this object structure is one level deep is because
      //the state previously had other things stored here, e.g. state.mode.
    };
  }
  
  // ----------------------------------------------------------------
  
  /*  Initialises the classroom form.
   */
  initialiseForm(selectedClassroom) {
    if (this.props.view === VIEWS.CREATE) {
      this.setState({ form: INITIAL_FORM_DATA });
    } else {
      const originalForm = INITIAL_FORM_DATA;
      const updatedForm = {};
      //Object.keys(originalForm).map((key) => {
      //  updatedForm[key] = (selectedClassroom && selectedClassroom[key])
      //    ? selectedClassroom[key]
      //    : originalForm[key];
      //});
      //this.setState({ form: updatedForm });
    }
  }
  
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
    
    //Prevent standard browser actions
    e.preventDefault();
  }
  
  // ----------------------------------------------------------------

  componentDidMount() {
    this.initialiseForm(this.props.selectedAssignment);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedAssignment !== nextProps.selectedAssignment) {
      this.initialiseForm(nextProps.selectedAssignment);
    }
  }

  // ----------------------------------------------------------------

  render() {
    const props = this.props;
    
    return (
      <Box
        className="assignment-form"
        margin="medium"
        pad="medium"
      >
        {(() => {
          if (props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
            return this.render_readyState();
          } else if (props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING || props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING) {
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
            switch (props.view) {
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
              Actions.wildcamClassrooms.resetSelectedClassroom();
              Actions.wildcamClassrooms.setComponentMode(WILDCAMCLASSROOMS_COMPONENT_MODES.VIEW_ALL_CLASSROOMS);
            }}
          />
          <Button
            className="button"
            icon={<LinkNextIcon size="small" />}
            label={(() => {
              switch (props.view) {
                case VIEWS.CREATE: return TEXT.ACTIONS.CREATE;
                case VIEWS.EDIT: return TEXT.ACTIONS.UPDATE;
                default: return TEXT.ACTIONS.SUBMIT;  //This should never trigger
              }
            })()}
            primary={true}
            type="submit"
          />
          {(props.view !== VIEWS.EDIT || !props.selectedClassroom) ? null
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
                      Actions.wildcamClassrooms.resetSelectedClassroom();
                      Actions.wildcamClassrooms.setComponentMode(WILDCAMCLASSROOMS_COMPONENT_MODES.VIEW_ALL_CLASSROOMS);
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

AssignmentForm.VIEWS = VIEWS;
AssignmentForm.defaultProps = {
  view: VIEWS.CREATE,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,
  // ----------------
  componentMode: WILDCAMCLASSROOMS_INITIAL_STATE.componentMode,
  classroomsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsStatus,
  selectedClassroom: WILDCAMCLASSROOMS_INITIAL_STATE.selectedClassroom,
  assignmentsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsStatus,
  selectedAssignments: WILDCAMCLASSROOMS_INITIAL_STATE.selectedAssignments,
};

AssignmentForm.propTypes = {
  view: PropTypes.string,
  // ----------------
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  // ----------------
  componentMode: WILDCAMCLASSROOMS_PROPTYPES.componentMode,
  classroomsStatus: WILDCAMCLASSROOMS_PROPTYPES.classroomsStatus,
  selectedClassroom: WILDCAMCLASSROOMS_PROPTYPES.selectedClassroom,
  assignmentsStatus: WILDCAMCLASSROOMS_PROPTYPES.assignmentsStatus,
  selectedAssignments: WILDCAMCLASSROOMS_PROPTYPES.selectedAssignments,
};

export default AssignmentForm;
