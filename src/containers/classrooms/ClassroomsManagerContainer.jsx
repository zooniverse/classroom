import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import ClassroomsManager from '../../components/classrooms/ClassroomsManager';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
} from '../../ducks/programs';

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
    if (this.props.selectedProgram) Actions.getClassroomsAndAssignments(this.props.selectedProgram);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProgram && this.props.selectedProgram !== nextProps.selectedProgram) {
      Actions.getClassroomsAndAssignments(nextProps.selectedProgram);
    }
  }

  componentWillUnmount() {
    Actions.classrooms.setClassrooms(CLASSROOMS_INITIAL_STATE.classrooms);
  }

  maybeDeleteClassroom(id) {
    this.setState({ classroomToDelete: id, showConfirmationDialog: true });
  }

  closeConfirmationDialog() {
    this.setState({ classroomToDelete: null, showConfirmationDialog: false });
  }

  deleteClassroom() {
    if (this.state.classroomToDelete === null) return;

    Actions.deleteClassroom(this.state.classroomToDelete).then((response) => {
      // TODO: For API optimization, do we want to instead manually remove the classroom
      // out of local app state instead of making another API call
      Actions.getClassroomsAndAssignments(this.props.selectedProgram);
      this.closeConfirmationDialog();

      if (response) {
        Actions.classrooms.setToastState({ status: 'ok', message: 'Classroom deleted' });
      }
    });
  }

  render() {
    return (
      <ClassroomsManager
        classrooms={this.props.classrooms}
        classroomInstructions={this.props.classroomInstructions}
        classroomsStatus={this.props.classroomsStatus}
        classroomToDelete={this.state.classroomToDelete}
        closeConfirmationDialog={this.closeConfirmationDialog}
        deleteClassroom={this.deleteClassroom}
        match={this.props.match}
        maybeDeleteClassroom={this.maybeDeleteClassroom}
        showConfirmationDialog={this.state.showConfirmationDialog}
        showForm={this.props.showForm}
      />
    );
  }
}

ClassroomsManagerContainer.propTypes = {
  ...CLASSROOMS_PROPTYPES,
  ...PROGRAMS_PROPTYPES
};

ClassroomsManagerContainer.defaultProps = {
  ...CLASSROOMS_INITIAL_STATE,
  ...PROGRAMS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  classrooms: state.classrooms.classrooms,
  classroomsStatus: state.classrooms.status,
  programs: state.programs.programs,
  selectedClassroom: state.classrooms.selectedClassroom,
  selectedProgram: state.programs.selectedProgram,
  showConfirmationDialog: state.classrooms.showConfirmationDialog,
  showForm: state.classrooms.showForm
});

export default connect(mapStateToProps)(ClassroomsManagerContainer);
