import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import ClassroomCreateForm from '../../components/common/ClassroomCreateForm';
import { config } from '../../lib/config';

export class ClassroomCreateFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        name: '',
        subject: '',
        school: '',
        description: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const fields = { ...this.state.fields, [event.target.id]: event.target.value };
    this.setState({ fields });
  }

  onSubmit(event) {
    event.preventDefault();
    // TODO: Add project id(s) associated to classroom create
    Actions.createClassroom(this.state.fields)
      .then(() => {
        Actions.classrooms.toggleCreateFormVisibility();
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

  render() {
    return (
      <ClassroomCreateForm
        fields={this.state.fields}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

ClassroomCreateFormContainer.defaultProps = {
  projectCollection: []
};

ClassroomCreateFormContainer.propTypes = {
  projectCollection: PropTypes.arrayOf(PropTypes.string)
};

function mapStateToProps(state) {
  return {
    projectCollection: state.projectCollection
  };
}

export default connect(mapStateToProps)(ClassroomCreateFormContainer);
