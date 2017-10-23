import React from 'react';
import PropTypes from 'prop-types';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';

const ClassroomForm = (props) => {
  const optional = props.optionalFormFields;
  return (
    <Form onSubmit={props.onSubmit} pad="medium">
      <Heading tag="h2">{props.heading}</Heading>
      <fieldset>
        <legend><Paragraph size="small">Input the class name and if applicable the section name</Paragraph></legend>
        <FormField htmlFor="name" label="Name" help="required">
          <TextInput
            id="name"
            placeHolder="Class name"
            onDOMChange={props.onChange}
            required={true}
            value={props.fields.name}
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
            value={props.fields.subject || ''}
          />
        </FormField>
        <FormField htmlFor="school" label="Institution">
          <TextInput
            id="school"
            placeHolder="Name of institution or school"
            onDOMChange={props.onChange}
            required={!optional}
            value={props.fields.school || ''}
          />
        </FormField>
        <FormField htmlFor="description" label="Description">
          <textarea
            id="description"
            placeholder="Description of class"
            onChange={props.onChange}
            required={!optional}
            value={props.fields.description || ''}
          />
        </FormField>
      </fieldset>
      <Footer>
        <Button type="submit" label={props.submitLabel} primary={true} />
      </Footer>
    </Form>
  );
};

ClassroomForm.defaultProps = {
  optionalFormFields: true,
  onChange: () => {},
  fields: {
    name: '',
    subject: '',
    school: '',
    description: ''
  },
  heading: '',
  onSubmit: () => {},
  submitLabel: 'Submit'
};

ClassroomForm.propTypes = {
  optionalFormFields: PropTypes.bool,
  onChange: PropTypes.func,
  fields: PropTypes.shape({
    name: PropTypes.string,
    subject: PropTypes.string,
    school: PropTypes.string,
    description: PropTypes.string
  }),
  heading: PropTypes.string,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string
};

export default ClassroomForm;
