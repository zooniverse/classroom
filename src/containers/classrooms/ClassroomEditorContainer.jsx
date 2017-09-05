import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { saveAs } from 'browser-filesaver';
import ClassroomEditor from '../../components/classrooms/ClassroomEditor';
import { blobbifyData, generateFilename } from '../../lib/mapexplorer-helpers'; // TODO: Maybe not brand this as 'mapexplorer'?

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';

export class ClassroomEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.editClassroom = this.editClassroom.bind(this);
    this.exportGrades = this.exportGrades.bind(this);
  }

  componentDidMount() {
    if (!this.props.selectedClassroom) {
      // TODO Why does this 404 when directly navigating to an classroom edit view?
      Actions.getClassroom(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    Actions.classrooms.selectClassroom(CLASSROOMS_INITIAL_STATE.selectedClassroom);
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

  exportGrades() {
    if (!this.props.selectedClassroom) return null;

    //TODO
    //--------------------------------
    let exampleData = 'id,name\n';
    this.props.selectedClassroom.students &&
    this.props.selectedClassroom.students.map((student) =>{
      let studentName = (student.zooniverseDisplayName && student.zooniverseDisplayName.length > 0)
        ? student.zooniverseDisplayName
        : String(student.zooniverseLogin);
      studentName = studentName.replace(/"/g, '""')
      const row = `${student.id},"${studentName}"\n`;
      exampleData += row;
    });
    saveAs(blobbifyData(exampleData, this.props.contentType), generateFilename('astro-', '.csv'));

    alert('TODO! Create a proper Export Grades function.');
    //--------------------------------
  }

  removeStudentFromClassroom(classroomId, studentId) {
    //TODO
    console.log('TODO!');
    alert(`TODO! Remove student ${studentId} from classroom ${classroomId}`);
  }

  render() {
    return (
      <ClassroomEditor
        assignments={this.props.assignments}
        assignmentsStatus={this.props.assignmentsStatus}
        classroomsStatus={this.props.classroomsStatus}
        editClassroom={this.editClassroom}
        exportGrades={this.exportGrades}
        match={this.props.match}
        removeStudentFromClassroom={this.removeStudentFromClassroom}
        selectedClassroom={this.props.selectedClassroom}
        showForm={this.props.showForm}
      />
    );
  }
}

ClassroomEditorContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES
};

ClassroomEditorContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
  assignmentsStatus: state.assignments.status,
  classrooms: state.classrooms.classrooms,
  classroomsStatus: state.classrooms.status,
  selectedClassroom: state.classrooms.selectedClassroom,
  showForm: state.classrooms.showForm
});

export default connect(mapStateToProps)(ClassroomEditorContainer);
