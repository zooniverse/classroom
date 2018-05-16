/*
ClassroomForm
-------------

Component for viewing, editing, or deleting a single classroom.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Heading from 'grommet/components/Heading';
import TextInput from 'grommet/components/TextInput';

//import { config } from '../../../lib/config';

const MODES = {
  CREATE: 'create',
  EDIT: 'edit',
}

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
} from '../ducks/index.js';

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
      form: INITIAL_FORM_DATA,
      //Note: the reason this object structure is one level deep is because
      //the state previously had other things stored here, e.g. state.mode.
    };
  }
  
  // ----------------------------------------------------------------
  
  /*  Initialises the classroom form.
   */
  initialiseForm(selectedClassroom) {
    if (this.props.mode === MODES.CREATE) {
      this.setState({ form: INITIAL_FORM_DATA });
    } else {
      const originalForm = INITIAL_FORM_DATA;
      const updatedForm = {};
      Object.keys(originalForm).map((key) => {
        updatedForm[key] = (selectedClassroom[key])
          ? selectedClassroom[key]
          : originalForm[key];
      });
      console.log('+++ ', updatedForm);
      this.setState({ form: updatedForm });
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
    e.preventDefault();
    
    //Sanity check
    if (!this.props.selectedProgram) return;
    
    if (this.props.mode === MODES.CREATE) {
      return Actions.wcc_teachers_createClassroom({
        attributes: this.state.form,
        relationships: {
          program: {
            data: {
              id: String(this.props.selectedProgram.id),
              type: "programs"
            }
          }
        }
      });
    }
  }
  
  // ----------------------------------------------------------------

  componentDidMount() {
    this.initialiseForm(this.props.selectedClassroom);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedClassroom !== nextProps.selectedClassroom) {
      this.initialiseForm(nextProps.selectedClassroom);
    }
  }

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
          } else if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING) {
            return this.render_sendingState();
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
        onSubmit={this.submitForm.bind(this)}
      >
        <Heading tag="h2">
          {(()=>{
            switch (props.mode) {
              case MODES.CREATE:
                return 'Create new classroom';
              case MODES.EDIT:
                return 'Edit classroom';
              default:
                return '???';
            }
          })()}
        </Heading>

        <fieldset>
          <FormField htmlFor="name" label="Classroom Name">
            <TextInput
              id="name"
              required={true}
              value={this.state.form.name}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <fieldset>
          <FormField htmlFor="subject" label="Classroom Subject">
            <TextInput
              id="subject"
              value={this.state.form.subject}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <fieldset>
          <FormField htmlFor="school" label="School Name">
            <TextInput
              id="school"
              value={this.state.form.school}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <fieldset>
          <FormField htmlFor="school" label="Description">
            <TextInput
              id="description"
              value={this.state.form.description}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <Footer>
          <Button className="button--primary" type="submit" label="Submit..." primary={true} />
        </Footer>
      </Form>
    );
  }
  
  render_sendingState() {
    return (
      <Box>
        Sending...
      </Box>
    );
  }
};

ClassroomForm.MODES = MODES;
ClassroomForm.defaultProps = {
  mode: MODES.CREATE,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,
  // ----------------
  classroomsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsStatus,
  selectedClassroom: WILDCAMCLASSROOMS_INITIAL_STATE.selectedClassroom,
};

ClassroomForm.propTypes = {
  mode: PropTypes.string,
  // ----------------
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  // ----------------
  classroomsStatus: WILDCAMCLASSROOMS_PROPTYPES.classroomsStatus,
  selectedClassroom: WILDCAMCLASSROOMS_PROPTYPES.selectedClassroom,
};

export default ClassroomForm;
