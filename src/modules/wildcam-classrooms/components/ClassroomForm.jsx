/*
ClassroomForm
-------------

Component for viewing or editing a single classroom.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Heading from 'grommet/components/Heading';
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

class ClassroomForm extends React.Component {
  constructor() {
    super();
  
    this.state = {
      name: '',
      subject: '',
      school: '',
      description: '',
    };

    this.loadSelectedClassroomDetails(this.props);
  }
  
  /*  Update the form details.
   */
  updateForm(e) {
    console.log('+++ ', { [e.target.id]: e.target.value });
    this.setState({
      [e.target.id]: e.target.value
      //Apparently [square_brackets] a superconvenient way of specifying an
      //object key name that's variable. Sweet.
    });
    
  }
  
  loadSelectedClassroomDetails(props) {
  }

  componentWillReceiveProps(nextProps) {
    
    
    this.loadSelectedClassroomDetails(nextProps);
  }
  

  render() {
    const props = this.props;
    const joinURL = props.selectedClassroom
      ? `${config.origin}/#/${props.selectedProgram.slug}/students/classrooms/${props.selectedClassroom.id}/join?token=${props.selectedClassroom.joinToken}`
      : '';

    // Get students and assignments only for this classroom.
    const students = (props.selectedClassroom && props.selectedClassroom.students) ? props.selectedClassroom.students : [];
    const assignments = (props.selectedClassroom && props.assignments && props.assignments[props.selectedClassroom.id])
      ? props.assignments[props.selectedClassroom.id]
      : [];

    return (
      <Form
        className="classroom-form"
        onSubmit={()=>{}}
        pad="medium"
      >
        <Heading tag="h2">TEST...</Heading>

        <fieldset>
          <FormField htmlFor="name" label="Classroom Name">
            <TextInput
              id="name"
              required={true}
              value={this.state.name}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>
        
        <fieldset>
          <FormField htmlFor="subject" label="Classroom Subject">
            <TextInput
              id="subject"
              value={this.state.subject}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>
        
        <fieldset>
          <FormField htmlFor="school" label="School Name">
            <TextInput
              id="school"
              value={this.state.school}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>
        
        <fieldset>
          <FormField htmlFor="school" label="Description">
            <TextInput
              id="description"
              value={this.state.description}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <Footer>
          <Button className="button--primary" type="submit" label="Sumbit..." primary={true} />
        </Footer>
      </Form>
    );
  }
};

ClassroomForm.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

ClassroomForm.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

export default ClassroomForm;
