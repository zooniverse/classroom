import React from 'react';
import PropTypes from 'prop-types';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES, CLASSROOMS_STATUS
} from '../../ducks/classrooms';

function ClassroomForm(props) {
  const optional = props.optionalFormFields;
  return (
    <Form
      onSubmit={props.classroomsStatus === CLASSROOMS_STATUS.CREATING ? null : props.onSubmit}
      pad="medium"
    >
      <Heading tag="h2">{props.heading}</Heading>
      <fieldset>
        <legend><Paragraph size="small">Input the class name and if applicable the section name</Paragraph></legend>
        <FormField htmlFor="name" label="Name" help="required">
          <TextInput
            id="name"
            placeHolder="Class name"
            onDOMChange={props.onChange}
            required={true}
            value={props.formFields.name}
          />
        </FormField>
      </fieldset>

      <fieldset>
        {optional &&
          <legend><Paragraph size="small">Optional - Please fill out for Zooniverse to better understand who is using our education tools</Paragraph></legend>}
        <FormField htmlFor="subject" label="Subject">
          <TextInput
            id="subject"
            placeHolder="Class subject"
            onDOMChange={props.onChange}
            required={!optional}
            value={props.formFields.subject || ''}
          />
        </FormField>
        <FormField htmlFor="school" label="Institution">
          <TextInput
            id="school"
            placeHolder="Name of institution or school"
            onDOMChange={props.onChange}
            required={!optional}
            value={props.formFields.school || ''}
          />
        </FormField>
        <FormField htmlFor="description" label="Description">
          <textarea
            id="description"
            placeholder="Description of class"
            onChange={props.onChange}
            required={!optional}
            value={props.formFields.description || ''}
          />
        </FormField>
      </fieldset>
      <Footer>
        <Button className="button--primary" type="submit" label={props.submitLabel} primary={true} />
      </Footer>
    </Form>
  );
};

ClassroomForm.defaultProps = {
  optionalFormFields: true,
  onChange: () => {},
  heading: '',
  onSubmit: () => {},
  submitLabel: 'Submit',
  ...CLASSROOMS_INITIAL_STATE
};

ClassroomForm.propTypes = {
  optionalFormFields: PropTypes.bool,
  onChange: PropTypes.func,
  heading: PropTypes.string,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  ...CLASSROOMS_PROPTYPES
};

export default ClassroomForm;
