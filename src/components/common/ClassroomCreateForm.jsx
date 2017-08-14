import React from 'react';
import PropTypes from 'prop-types';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';

// Subject, School, Description

const ClassroomCreateForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      <Heading tag="h2">Create a Classroom</Heading>
      <fieldset>
        <FormField htmlFor="name" label="Name">
          <TextInput id="name" placeholder="Name" />
        </FormField>
      </fieldset>
      {props.optionalFormFields &&
        <fieldset>
          <FormField htmlFor="subject" label="Subject">
            <TextInput id="subject" placeholder="Subject" />
          </FormField>
          <FormField htmlFor="school" label="School">
            <TextInput id="school" placeholder="School" />
          </FormField>
          <FormField htmlFor="description" label="Description">
            <TextInput id="description" placeholder="Description" />
          </FormField>
        </fieldset>}
      <Footer>
        <Button type="submit" label="Create" />
      </Footer>
    </Form>
  );
};

ClassroomCreateForm.defaultProps = {
  optionalFormFields: true,
  onSubmit: () => {}
};

ClassroomCreateForm.propTypes = {
  optionalFormFields: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default ClassroomCreateForm;
