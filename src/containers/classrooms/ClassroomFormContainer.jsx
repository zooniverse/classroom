import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import ClassroomForm from '../../components/classrooms/ClassroomForm';
import { config } from '../../lib/config';
import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';

export class ClassroomFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const fields = { ...this.props.formFields, [event.target.id]: event.target.value };
    Actions.classrooms.updateFormFields(fields);
  }

  onSubmit(event) {
    event.preventDefault();
    // TODO: Add project id(s) associated to classroom create

    if (this.props.selectedClassroom) {
      Actions.updateClassroom({ id: this.props.selectedClassroom.id, payload: this.props.formFields })
        .then(() => {
          Actions.classrooms.toggleFormVisibility();
        }).then(() => {
          Actions.getClassroom(this.props.selectedClassroom.id);
        });
    } else {
      Actions.createClassroom(this.props.formFields)
        .then(() => {
          Actions.classrooms.toggleFormVisibility();
        }).then(() => {
          if (this.props.projectCollection === config.astroProjects) {
            console.log('TODO: Auto create assignments for I2A');
            // TODO: Actions.assignments.createAssignment().then(Actions.getClassroomsAndAssignments());
            // For API optimization, we could merge the returned classroom into the local app state
            // Then only call for the linked assignments for that one classroom
            Actions.getClassroomsAndAssignments();
          } else {
            Actions.getClassroomsAndAssignments();
          }
        });
    }
  }

  render() {
    return (
      <ClassroomForm
        heading={this.props.heading}
        fields={this.props.formFields}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        submitLabel={this.props.submitLabel}
      />
    );
  }
}

ClassroomFormContainer.defaultProps = {
  ...CLASSROOMS_INITIAL_STATE,
  projectCollection: [],
};

ClassroomFormContainer.propTypes = {
  ...CLASSROOMS_PROPTYPES,
  projectCollection: PropTypes.arrayOf(PropTypes.string)
};

function mapStateToProps(state) {
  return {
    formFields: state.classrooms.formFields,
    projectCollection: state.projectCollection,
    selectedClassroom: state.classrooms.selectedClassroom
  };
}

export default connect(mapStateToProps)(ClassroomFormContainer);
