/*
ClassroomForm
-------------

Component for viewing, editing, or deleting a single classroom.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';

import { config } from '../../../lib/config';

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

const MODES = {
  INIT: 'init',  //Invalid state.
  CREATE: 'create',
  EDIT: 'edit',
};

class ClassroomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: MODES.INIT,
      form: INITIAL_FORM_DATA,
    };
  }
  
  // ----------------------------------------------------------------
  
  /*  Initialises the classroom form. Two paths:
      - If there's a classroom selected, we want to EDIT/VIEW it.
      - If there's NO classroom selected, we want to CREATE one.
   */
  initialiseForm(selectedClassroom) {
    if (!selectedClassroom) {
      this.setState({
        mode: MODES.CREATE,
        form: INITIAL_FORM_DATA
      });
    } else {
      this.setState({
        ...this.state,
        mode: MODES.EDIT,
        //TODO: Specify Selected Classroom details here
      });
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
    
    if (this.state.mode === MODES.CREATE) {
      Actions.wcc_teachers_createClassroom(this.state.form);
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
    
    if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
      return this.render_readyState();
    } else if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING) {
      return this.render_sendingState();
    }
    
    return null;
  }
  
  render_readyState() {
    const props = this.props;
    const state = this.state;
    
    return (
      <Form
        className="classroom-form"
        onSubmit={this.submitForm.bind(this)}
        pad="medium"
      >
        <Heading tag="h2">
          {(()=>{
            switch (state.mode) {
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
    const props = this.props;
    
    return (
      <Box>
        Sending...
      </Box>
    );
  }
};

ClassroomForm.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE.selectedClassroom,
};

ClassroomForm.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES.selectedClassroom,
};

export default ClassroomForm;
