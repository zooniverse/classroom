import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import Paragraph from 'grommet/components/Paragraph';

import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import DarienClassroomsTable from '../../components/darien/DarienClassroomsTable';
import AstroClassroomsTableContainer from '../astro/AstroClassroomsTableContainer';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';

class ClassroomsTableContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      classroomToDelete: null,
      showConfirmationDialog: false
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
    this.setState({ classroomToDelete: null, showConfirmationDialog: false });
  }

  maybeDeleteClassroom(id) {
    this.setState({ classroomToDelete: id, showConfirmationDialog: true });
  }

  closeConfirmationDialog() {
    this.resetState();
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

  determineClassroomsTable() {
    const ClassroomsTable = this.props.selectedProgram.custom ? DarienClassroomsTable : AstroClassroomsTableContainer;
    return (
      <ClassroomsTable
        assignments={this.props.assignments}
        assignmentsStatus={this.props.assignmentsStatus}
        classrooms={this.props.classrooms}
        match={this.props.match}
        maybeDeleteClassroom={this.maybeDeleteClassroom}
        selectedProgram={this.props.selectedProgram}
      >
        <ConfirmationDialog
          confirmationButtonLabel="Delete"
          onConfirmation={this.deleteClassroom}
          onClose={this.closeConfirmationDialog}
          showConfirmationDialog={this.state.showConfirmationDialog}
        >
          <Paragraph size="small">Deleting a classroom will also delete the associated assignments.</Paragraph>
        </ConfirmationDialog>
      </ClassroomsTable>
    );
  }

  render() {
    return (this.determineClassroomsTable());
  }
}

ClassroomsTableContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE
};

ClassroomsTableContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    assignments: state.assignments.assignments,
    assignmentsStatus: state.assignments.status,
    classrooms: state.classrooms.classrooms,
    selectedProgram: state.programs.selectedProgram
  };
}

export default connect(mapStateToProps)(ClassroomsTableContainer);

