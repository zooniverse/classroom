import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import AssignmentForm from '../../components/classrooms/AssignmentForm';
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
  }

  onChange() {

  }

  onSubmit() {

  }

  render() {
    return (
      <AssignmentForm
        heading={this.props.heading}
        fields={this.props.formFields}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
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
    selectedClassroom: state.classrooms.selectedClassroom,
    selectedProgram: state.programs.selectedProgram
  };
}

export default connect(mapStateToProps)(AssignmentFormContainer);
