import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { saveAs } from 'browser-filesaver';
import WildCamClassroomEditor from '../../components/wildcam-classrooms/WildCamClassroomEditor';
import { blobbifyData, generateFilename } from '../../lib/file-download-helpers';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, i2aAssignmentNames
} from '../../ducks/programs';

export class WildCamClassroomEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirmationDialog: false,
      studentToDelete: {
        classroomId: null,
        studentId: null
      }
    };

    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);
    this.editClassroom = this.editClassroom.bind(this);
    this.exportStats = this.exportStats.bind(this);
    this.maybeRemoveStudentFromClassroom = this.maybeRemoveStudentFromClassroom.bind(this);
    this.removeStudentFromClassroom = this.removeStudentFromClassroom.bind(this);
  }

  componentDidMount() {
    if (this.props.selectedProgram && !this.props.selectedClassroom) {
      this.getClassroomAndAssignments(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProgram &&
        this.props.selectedProgram !== nextProps.selectedProgram &&
        !this.props.selectedClassroom) {
      this.getClassroomAndAssignments(nextProps);
    }
  }

  componentWillUnmount() {
    Actions.classrooms.selectClassroom(CLASSROOMS_INITIAL_STATE.selectedClassroom);
  }

  getClassroomAndAssignments(props) {
    Actions.getClassroom(props.match.params.id)
      .then(classroom => Actions.getAssignments({ classroomId: classroom.id, selectedProgram: props.selectedProgram }));
  }

  editClassroom() {
    if (this.props.selectedClassroom) {
      const formFields = {
        name: this.props.selectedClassroom.name,
        subject: this.props.selectedClassroom.subject,
        school: this.props.selectedClassroom.school,
        description: this.props.selectedClassroom.description
      };
      Actions.classrooms.updateFormFields(formFields);
      Actions.classrooms.toggleFormVisibility();
    }

    return null;
  }

  exportStats() {
    //TODO
  }

  maybeRemoveStudentFromClassroom(classroomId, studentId) {
    this.setState({ studentToDelete: { classroomId, studentId }, showConfirmationDialog: true });
  }

  closeConfirmationDialog() {
    this.setState({ studentToDelete: null, showConfirmationDialog: false });
  }

  removeStudentFromClassroom() {
    if (this.state.studentToDelete === null) return;

    Actions.removeStudentFromClassroom(this.state.studentToDelete).then((response) => {
      Actions.getClassroom(this.props.match.params.id);
      this.closeConfirmationDialog();

      if (response) {
        Actions.classrooms.setToastState({ status: 'ok', message: 'Student removed' });
      }
    });
  }

  render() {
    return (
      <WildCamClassroomEditor
        assignments={this.props.assignments}
        assignmentsStatus={this.props.assignmentsStatus}
        classroomsStatus={this.props.classroomsStatus}
        closeConfirmationDialog={this.closeConfirmationDialog}
        editClassroom={this.editClassroom}
        exportStats={this.exportStats}
        match={this.props.match}
        maybeRemoveStudentFromClassroom={this.maybeRemoveStudentFromClassroom}
        removeStudentFromClassroom={this.removeStudentFromClassroom}
        selectedClassroom={this.props.selectedClassroom}
        selectedProgram={this.props.selectedProgram}
        showConfirmationDialog={this.state.showConfirmationDialog}
        showForm={this.props.showForm}
      />
    );
  }
}

WildCamClassroomEditorContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES,
  ...PROGRAMS_PROPTYPES
};

WildCamClassroomEditorContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE,
  ...PROGRAMS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
  assignmentsStatus: state.assignments.status,
  classrooms: state.classrooms.classrooms,
  classroomsStatus: state.classrooms.status,
  programs: state.programs.programs,
  selectedClassroom: state.classrooms.selectedClassroom,
  selectedProgram: state.programs.selectedProgram,
  showForm: state.classrooms.showForm
});

export default connect(mapStateToProps)(WildCamClassroomEditorContainer);
