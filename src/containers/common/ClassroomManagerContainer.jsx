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
import ClassroomEditor from '../../components/common/ClassroomEditor';
import { blobbifyData, generateFilename } from '../../lib/mapexplorer-helpers'; // TODO: Maybe not brand this as 'mapexplorer'?

export class ClassroomManagerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toast: {
        message: null,
        status: null
      }
    };

    this.copyJoinLink = this.copyJoinLink.bind(this);
    this.editClassroom = this.editClassroom.bind(this);
    this.exportGrades = this.exportGrades.bind(this);
    this.resetToastState = this.resetToastState.bind(this);
  }

  componentDidMount() {
    Actions.getClassroomsAndAssignments();
  }

  componentWillUnmount() {
    Actions.classrooms.selectClassroom(CLASSROOMS_INITIAL_STATE.selectedClassroom);
    Actions.classrooms.setClassrooms(CLASSROOMS_INITIAL_STATE.classrooms);
  }

  copyJoinLink() {
    this.setState({ toast: { message: 'Link copied', status: 'ok' } });
  }

  resetToastState() {
    this.setState({ toast: { message: null, status: null } });
  }

  selectClassroom(classroom) {
    Actions.classrooms.selectClassroom(classroom);
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

  deleteClassroom(id) {
    // TODO: Add alert to ask if user is sure
    Actions.deleteClassroom(id).then(() => {
      // TODO: For API optimization, do we want to instead manually remove the classroom
      // out of local app state instead of making another API call
      Actions.getClassroomsAndAssignments();
    });
  }

  removeStudentFromClassroom(classroomId, studentId) {
    //TODO
    console.log('TODO!');
    alert(`TODO! Remove student ${studentId} from classroom ${classroomId}`);
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

  render() {
    //View all classes
    if (!this.props.selectedClassroom) {
      return (
        <ClassroomManager
          assignments={this.props.assignments}
          assignmentsStatus={this.props.assignmentsStatus}
          classrooms={this.props.classrooms}
          classroomInstructions={this.props.classroomInstructions}
          classroomsStatus={this.props.classroomsStatus}
          copyJoinLink={this.copyJoinLink}
          selectClassroom={this.selectClassroom}
          deleteClassroom={this.deleteClassroom}
          resetToastState={this.resetToastState}
          showForm={this.props.showForm}
          toast={this.state.toast}
        />
      );

    //View a single class
    } else {
      return (
        <ClassroomEditor
          selectedClassroom={this.props.selectedClassroom}
          assignments={this.props.assignments}
          assignmentsStatus={this.props.assignmentsStatus}
          editClassroom={this.editClassroom}
          selectClassroom={this.selectClassroom}
          removeStudentFromClassroom={this.removeStudentFromClassroom}
          showForm={this.props.showForm}
          exportGrades={this.exportGrades}
          copyJoinLink={this.copyJoinLink}
          resetToastState={this.resetToastState}
          toast={this.state.toast}
        />
      );
    }
  }
}

ClassroomManagerContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES,
  assignmentsStatus: ASSIGNMENTS_PROPTYPES.status,
  classroomsStatus: CLASSROOMS_PROPTYPES.status,
};

ClassroomManagerContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE,
  assignmentsStatus: ASSIGNMENTS_INITIAL_STATE.status,
  classroomsStatus: CLASSROOMS_INITIAL_STATE.status,
};

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
  assignmentsStatus: state.assignments.status,
  classrooms: state.classrooms.classrooms,
  classroomsStatus: state.classrooms.status,
  selectedClassroom: state.classrooms.selectedClassroom,
  showForm: state.classrooms.showForm,
});

export default connect(mapStateToProps)(ClassroomManagerContainer);
