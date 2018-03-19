import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import Paragraph from 'grommet/components/Paragraph';

import ConfirmationDialog from '../../components/common/ConfirmationDialog';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';

class WildCamClassroom extends React.Component {
  constructor() {
    super();

    this.state = {
      assignmentToDelete: null,
      classroomToDelete: null,
      showConfirmationDialog: {
        assignment: false,
        classroom: false
      }
    };

    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);
    this.deleteClassroom = this.deleteClassroom.bind(this);
    this.maybeDeleteClassroom = this.maybeDeleteClassroom.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentWillUnmount() {
    this.resetState();
  }

  resetState() {
    this.setState({
      assignmentToDelete: null,
      classroomToDelete: null,
      showConfirmationDialog: {
        assignment: false,
        classroom: false
      }
    });
  }

  maybeDeleteAssignment(id) {
    this.setState({
      assignmentToDelete: id,
      classroomToDelete: null,
      showConfirmationDialog: { classroom: false, assignment: true }
    });
  }

  maybeDeleteClassroom(id) {
    this.setState({
      assignmentToDelete: null,
      classroomToDelete: id,
      showConfirmationDialog: { classroom: true, assignment: false }
    });
  }

  closeConfirmationDialog() {
    this.resetState();
  }

  deleteAssignment() {
    if (this.state.assignmentToDelete === null) return;

    Actions.deleteAssignment(this.state.assignmentToDelete).then((response) => {
      this.closeConfirmationDialog();

      if (response) {
        Actions.classrooms.setToastState({ status: 'ok', message: 'Assignment deleted' });
      }
    });
  }

  deleteClassroom() {
    if (this.state.classroomToDelete === null) return;

    Actions.deleteClassroom(this.state.classroomToDelete).then((response) => {
      Actions.getClassroomsAndAssignments(this.props.selectedProgram);
      this.closeConfirmationDialog();

      if (response) {
        Actions.classrooms.setToastState({ status: 'ok', message: 'Classroom deleted' });
      }
    });
  }

  render() {
    return (
      <Paragraph>
        Testing
      </Paragraph>
    );
  }
}

WildCamClassroom.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE
};

WildCamClassroom.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES
};

function mapStateToProps(state) {
  console.log('!'.repeat(100), state);
  
  return {
    //assignments: state.assignments.assignments,
    //assignmentsStatus: state.assignments.status,
    //classrooms: state.classrooms.classrooms,
    //selectedProgram: state.programs.selectedProgram
  };
}

export default connect(mapStateToProps)(WildCamClassroom);
