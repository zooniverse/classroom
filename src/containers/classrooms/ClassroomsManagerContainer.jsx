import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import ClassroomsManager from '../../components/classrooms/ClassroomsManager';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';

export class ClassroomsManagerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classroomToDelete: null,
      showConfirmationDialog: false
    };

    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);
    this.deleteClassroom = this.deleteClassroom.bind(this);
    this.maybeDeleteClassroom = this.maybeDeleteClassroom.bind(this);
  }

  componentDidMount() {
    Actions.getClassroomsAndAssignments();
  }

  componentWillUnmount() {
    Actions.classrooms.setClassrooms(CLASSROOMS_INITIAL_STATE.classrooms);
  }

  selectClassroom(classroom) {
    Actions.classrooms.selectClassroom(classroom);
  }

  maybeDeleteClassroom(id) {
    this.setState({ classroomToDelete: id, showConfirmationDialog: true });
  }

  closeConfirmationDialog() {
    this.setState({ classroomToDelete: null, showConfirmationDialog: false });
  }

  deleteClassroom() {
    if (this.state.classroomToDelete === null) return;

    Actions.deleteClassroom(this.state.classroomToDelete).then(() => {
      // TODO: For API optimization, do we want to instead manually remove the classroom
      // out of local app state instead of making another API call
      Actions.getClassroomsAndAssignments();
      this.closeConfirmationDialog();
      Actions.classrooms.setToastState({ status: 'ok', message: 'Classroom deleted' });
    });
  }

  render() {
    return (
      <ClassroomsManager
        assignments={this.props.assignments}
        assignmentsStatus={this.props.assignmentsStatus}
        classrooms={this.props.classrooms}
        classroomInstructions={this.props.classroomInstructions}
        classroomsStatus={this.props.classroomsStatus}
        classroomToDelete={this.state.classroomToDelete}
        closeConfirmationDialog={this.closeConfirmationDialog}
        deleteClassroom={this.deleteClassroom}
        match={this.props.match}
        maybeDeleteClassroom={this.maybeDeleteClassroom}
        selectClassroom={this.selectClassroom}
        showConfirmationDialog={this.state.showConfirmationDialog}
        showForm={this.props.showForm}
      />
    );
  }
}

ClassroomsManagerContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES
};

ClassroomsManagerContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
  assignmentsStatus: state.assignments.status,
  classrooms: state.classrooms.classrooms,
  classroomsStatus: state.classrooms.status,
  selectedClassroom: state.classrooms.selectedClassroom,
  showConfirmationDialog: state.classrooms.showConfirmationDialog,
  showForm: state.classrooms.showForm
});

export default connect(mapStateToProps)(ClassroomsManagerContainer);
