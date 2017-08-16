import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';
import ClassroomManager from '../../components/common/ClassroomManager';

class ClassroomManagerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toast: {
        message: null,
        status: null
      }
    };

    this.copyJoinLink = this.copyJoinLink.bind(this);
    this.resetToastState = this.resetToastState.bind(this);
  }

  componentDidMount() {
    Actions.getClassroomsAndAssignments();
  }

  copyJoinLink() {
    this.setState({ toast: { message: 'Link copied', status: 'ok' } });
  }

  resetToastState() {
    this.setState({ toast: { message: null, status: null } });
  }

  deleteClassroom(id) {
    // TODO: Add alert to ask if user is sure
    Actions.deleteClassroom(id).then(() => {
      // TODO: For API optimization, do we want to instead manually remove the classroom
      // out of local app state instead of making another API call
      Actions.getClassroomsAndAssignments();
    });
  }

  render() {
    return (
      <ClassroomManager
        assignments={this.props.assignments}
        assignmentsStatus={this.props.assignmentsStatus}
        classrooms={this.props.classrooms}
        classroomInstructions={this.props.classroomInstructions}
        classroomsStatus={this.props.classroomsStatus}
        copyJoinLink={this.copyJoinLink}
        deleteClassroom={this.deleteClassroom}
        resetToastState={this.resetToastState}
        showCreateForm={this.props.showCreateForm}
        toast={this.state.toast}
      />
    );
  }
}

ClassroomManagerContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES
};

ClassroomManagerContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
  assignmentsStatus: state.assignments.status,
  classrooms: state.classrooms.classrooms,
  classroomsStatus: state.classrooms.status,
  showCreateForm: state.classrooms.showCreateForm
});

export default connect(mapStateToProps)(ClassroomManagerContainer);
