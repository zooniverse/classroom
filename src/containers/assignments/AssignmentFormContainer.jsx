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
  ...CLASSROOMS_INITIAL_STATE
};

AssignmentFormContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    formFields: state.assignments.formFields,
    selectedAssignment: state.assignments.selectedAssignment,
    selectedClassroomToLink: state.assignments.selectedClassroomToLink
  };
}

export default connect(mapStateToProps)(AssignmentFormContainer);
