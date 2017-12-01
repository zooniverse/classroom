import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import AssignmentForm from '../../components/assignments/AssignmentForm';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';
import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
} from '../../ducks/programs';
import { env } from '../../lib/config';

export class AssignmentFormContainer extends React.Component {
  constructor() {
    super();

    this.createAssignment = this.createAssignment.bind(this);
    this.updateAssignment = this.updateAssignment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.resetFormFields();
  }

  onChange(event) {
    if (event.target && event.target.id && event.target.value) {
      const fields = { ...this.props.formFields, [event.target.id]: event.target.value };
      Actions.assignments.updateFormFields(fields);
    }
  }

  onChangeDate(datetime) {
    // Grommet's DateTime passes the value directly rather than the standard event object
    // TODO: why?
    const fields = { ...this.props.formFields, duedate: datetime };
    Actions.assignments.updateFormFields(fields);
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.selectedAssignment) {
      this.updateAssignment().then(() => {
        if (this.props.onSubmit) this.props.onSubmit();
      });
    } else {
      this.createAssignment().then(() => {
        if (this.props.onSubmit) this.props.onSubmit();
      });
    }
  }

  createAssignment() {
    const assignmentData = {
      attributes: {
        name: this.props.formFields.name,
        metadata: {
          classifications_target: this.props.formFields.classifications_target.toString(),
          description: this.props.formFields.description,
          duedate: this.props.formFields.duedate
        }
      },
      relationships: {
        classroom: {
          data: {
            id: this.props.selectedClassroomToLink.id,
            type: 'classrooms'
          }
        }
      }
    };

    // Wildcam programs
    const selectedProgram = this.props.selectedProgram;
    if (selectedProgram && selectedProgram.custom) {
      assignmentData.relationships.subjects = {};
      assignmentData.attributes.workflow_id = selectedProgram.metadata.workflowId;

      // need to add working filters form field to assignment create form
      // assignmentData.attributes.metadata.filters = this.props.formFields.filters;
      if (env === 'staging' || env === 'development') {
        const sampleSubjects = selectedProgram.metadata.sampleSubjects;
        assignmentData.attributes.metadata.subjects = sampleSubjects;
        const subjectData = sampleSubjects.map((subjectId) => {
          return { id: subjectId, type: 'subjects' };
        });
        assignmentData.relationships.subjects.data = subjectData;
      } else {
        // need to add working subjects form field to assignment create form
        const subjects = this.props.formFields.subjects;
        assignmentData.attributes.metadata.subjects = subjects;
        const subjectData = subjects.map((subjectId) => {
          return { id: subjectId, type: 'subjects' };
        });
        assignmentData.relationships.subjects.data = subjectData;
      }
    }

    return Actions.createAssignment(assignmentData);
  }

  updateAssignment() {
    return Actions.updateAssignment({ id: this.props.selectedAssignment.id, payload: this.props.formFields });
  }

  resetFormFields() {
    Actions.assignments.updateFormFields(ASSIGNMENTS_INITIAL_STATE.formFields);
  }

  render() {
    return (
      <AssignmentForm
        heading={this.props.heading}
        fields={this.props.formFields}
        onChange={this.onChange}
        onChangeDate={this.onChangeDate}
        onSubmit={this.onSubmit}
        students={this.props.selectedClassroomToLink ? this.props.selectedClassroomToLink.students : []}
        submitLabel={this.props.submitLabel}
      />
    );
  }
}

AssignmentFormContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE,
  ...PROGRAMS_INITIAL_STATE
};

AssignmentFormContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES,
  ...PROGRAMS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    formFields: state.assignments.formFields,
    selectedAssignment: state.assignments.selectedAssignment,
    selectedClassroomToLink: state.assignments.selectedClassroomToLink,
    selectedProgram: state.programs.selectedProgram
  };
}

export default connect(mapStateToProps)(AssignmentFormContainer);
