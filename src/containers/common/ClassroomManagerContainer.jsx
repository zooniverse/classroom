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
    this.resetToastState = this.resetToastState.bind(this);
  }

  componentDidMount() {
    Actions.getClassroomsAndAssignments();
    
    //TODO: Reset 
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

  deleteClassroom(id) {
    // TODO: Add alert to ask if user is sure
    Actions.deleteClassroom(id).then(() => {
      // TODO: For API optimization, do we want to instead manually remove the classroom
      // out of local app state instead of making another API call
      Actions.getClassroomsAndAssignments();
    });
  }
  
  editClassroom(payload) {
    //TODO
    //Actions.editClassroom(payload).then(() => {
    //  Actions.getClassroomsAndAssignments();
    //});
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
          showCreateForm={this.props.showCreateForm}
          toast={this.state.toast}
        />
      );
      
    //View a single class
    } else {
      return null;
    }
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
  selectedClassroom: state.classrooms.selectedClassroom,
  showCreateForm: state.classrooms.showCreateForm,
});

export default connect(mapStateToProps)(ClassroomManagerContainer);
