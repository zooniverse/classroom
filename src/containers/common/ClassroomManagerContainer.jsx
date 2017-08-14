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
    Actions.getClassrooms().then(() => {
      this.props.classrooms.forEach((classroom) => {
        Actions.getAssignments(classroom.id);
      });
    });
  }

  copyJoinLink() {
    this.setState({ toast: { message: 'Link copied', status: 'ok' } });
  }

  resetToastState() {
    this.setState({ toast: { message: null, status: null } });
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
