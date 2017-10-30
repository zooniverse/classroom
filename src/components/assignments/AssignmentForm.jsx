import React from 'react';
import PropTypes from 'prop-types';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import NumberInput from 'grommet/components/NumberInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';

const AssignmentForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit} pad="medium">
      <Heading tag="h2">{props.heading}</Heading>
      <fieldset>
        <legend><Paragraph size="small">Input the assignment details</Paragraph></legend>
        <FormField htmlFor="name" label="Name" help="required">
          <TextInput
            id="name"
            placeHolder="Assignment name"
            onDOMChange={props.onChange}
            required={true}
            value={props.fields.name}
          />
        </FormField>
        <FormField htmlFor="description" label="Description" help="required">
          <textarea
            id="description"
            placeholder="Assignment description"
            onChange={props.onChange}
            required={true}
            value={props.fields.description}
          />
        </FormField>
        <FormField htmlFor="duedate" label="Due date" help="required">
          <DateTime
            id="duedate"
            onChange={props.onChange}
            required={true}
            value={props.fields.duedate}
          />
        </FormField>
        <FormField htmlFor="classifications_target" label="Number of images per student" help="required">
          <NumberInput
            id="classifications_target"
            min={1}
            onChange={props.onChange}
            required={true}
            value={props.fields.classifications_target}
          />
        </FormField>
      </fieldset>

      <fieldset>
        <legend><Paragraph size="small">Select the students to assign</Paragraph></legend>
        <Button onClick={() => {}} label="Select all students" />
      </fieldset>

      <fieldset>
        <legend><Paragraph size="small">You need to select images for this assignment. Click "Select images" below, then use the map to choose a set of images for your students to identify and click "Select for assignment".</Paragraph></legend>
        <Button onClick={() => { alert('Subject selection modal!')}} label="Select images" />
      </fieldset>
      <Footer>
        <Button type="submit" label={props.submitLabel} primary={true} />
      </Footer>
    </Form>
  );
};

AssignmentForm.defaultProps = {
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

AssignmentForm.propTypes = {
  onChange: PropTypes.func,
  fields: PropTypes.shape({
    classificationsTarget: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    duedate: PropTypes.string
  }),
  heading: PropTypes.string,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string
};

export default AssignmentForm;
