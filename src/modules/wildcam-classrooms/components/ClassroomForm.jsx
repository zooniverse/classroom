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
    };
  }
  
  updateForm() {
    
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
          <FormField htmlFor="name" label="Name">
            <TextInput
              id="name"
              required={true}
              value={'Example Classroom 1'}
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
