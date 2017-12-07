import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { saveAs } from 'browser-filesaver';
import ClassroomEditor from '../../components/classrooms/ClassroomEditor';
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

export class ClassroomEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCounts: {
        galaxy: false,
        hubble: false
      },
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
    this.toggleCountView = this.toggleCountView.bind(this);
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
    if (!this.props.selectedClassroom && !this.props.selectedClassroom.students) return null;
    const classroomName = this.props.selectedClassroom.name;
    const galaxyAssignment = this.props.assignments[this.props.selectedClassroom.id].filter(
      assignment => assignment.name === i2aAssignmentNames.first);
    const hubbleAssignment = this.props.assignments[this.props.selectedClassroom.id].filter(
      assignment => assignment.name === i2aAssignmentNames.second);
    const galaxyClassificationTarget = galaxyAssignment[0].metadata.classifications_target;
    const hubbleClassificationTarget = hubbleAssignment[0].metadata.classifications_target;

    let csvData = 'classroom,name,Galaxy Zoo 101 classification count,Hubble\'s Law classification count,Galaxy Zoo 101 percentage complete,Hubble\'s Law percentage complete\n';

    this.props.selectedClassroom.students.map((student) => {
      let studentName = (student.zooniverseDisplayName && student.zooniverseDisplayName.length > 0)
        ? student.zooniverseDisplayName
        : String(student.zooniverseLogin);

      studentName = studentName.replace(/"/g, '""');
      const galaxyStudentData = galaxyAssignment[0].studentAssignmentsData.filter(
        data => data.attributes.student_user_id.toString() === student.id);
      const hubbleStudentData = hubbleAssignment[0].studentAssignmentsData.filter(
        data => data.attributes.student_user_id.toString() === student.id);
      const studentGalaxyCount = galaxyStudentData[0].attributes.classifications_count;
      const studentHubbleCount = hubbleStudentData[0].attributes.classifications_count;
      const galaxyCountStat = `${studentGalaxyCount}/${galaxyClassificationTarget}`;
      const hubbleCountStat = `${studentHubbleCount}/${hubbleClassificationTarget}`;
      const galaxyPercentageStat = Math.round((studentGalaxyCount / (+galaxyClassificationTarget)) * 100);
      const hubblePercentageStat = Math.round((studentHubbleCount / (+hubbleClassificationTarget)) * 100);
      const row = `"${classroomName}","${studentName}",${galaxyCountStat},${hubbleCountStat},${galaxyPercentageStat},${hubblePercentageStat}\n`;
      csvData += row;
    });
    saveAs(blobbifyData(csvData, 'text/csv'), generateFilename('astro101-', '.csv'));
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

  toggleCountView(assignment) {
    if (assignment === i2aAssignmentNames.galaxy) {
      this.setState((prevState) => {
        return { showCounts: { galaxy: !prevState.showCounts.galaxy, hubble: prevState.showCounts.hubble } };
      });
    } else if (assignment === i2aAssignmentNames.hubble) {
      this.setState((prevState) => {
        return { showCounts: { galaxy: prevState.showCounts.galaxy, hubble: !prevState.showCounts.hubble } };
      });
    }
  }

  render() {
    return (
      <ClassroomEditor
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
        showCounts={this.state.showCounts}
        showForm={this.props.showForm}
        toggleCountView={this.toggleCountView}
      />
    );
  }
}

ClassroomEditorContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES,
  ...PROGRAMS_PROPTYPES
};

ClassroomEditorContainer.defaultProps = {
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

export default connect(mapStateToProps)(ClassroomEditorContainer);
