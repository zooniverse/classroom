import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import AssignmentFormContainer from './AssignmentFormContainer';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';

export const AssignmentFormDialog = (props) => {
  function toggleForm() {
    Actions.assignments.toggleFormVisibility();
  }

  if (props.showForm) {
    return (
      <AssignmentFormContainer heading={props.heading} submitLabel={props.submitLabel} onSubmit={toggleForm} />
    );
  }

  return null;
};

AssignmentFormDialog.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE
};

AssignmentFormDialog.propTypes = {
  ...ASSIGNMENTS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    showForm: state.assignments.showForm
  };
}

export default connect(mapStateToProps)(AssignmentFormDialog);
