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

  deleteClassroom(id) {
    // TODO: Add alert to ask if user is sure
    Actions.deleteClassroom(id).then(() => {
      // TODO: For API optimization, do we want to instead manually remove the classroom
      // out of local app state instead of making another API call
      Actions.getClassroomsAndAssignments();
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
        copyJoinLink={this.copyJoinLink}
        deleteClassroom={this.deleteClassroom}
        match={this.props.match}
        selectClassroom={this.selectClassroom}
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
  showForm: state.classrooms.showForm
});

export default connect(mapStateToProps)(ClassroomsManagerContainer);
