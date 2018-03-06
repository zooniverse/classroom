import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import WildCamClassroomsManager from '../../components/wildcam-classrooms/WildCamClassroomsManager';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
} from '../../ducks/programs';

export class WildCamClassroomsManagerContainer extends React.Component {
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

  render() {
    return (
      <WildCamClassroomsManager
        classrooms={this.props.classrooms}
        classroomInstructions={this.props.classroomInstructions}
        classroomsStatus={this.props.classroomsStatus}
        match={this.props.match}
        showForm={this.props.showForm}
      />
    );
  }
}

WildCamClassroomsManagerContainer.propTypes = {
  ...CLASSROOMS_PROPTYPES,
  ...PROGRAMS_PROPTYPES
};

WildCamClassroomsManagerContainer.defaultProps = {
  ...CLASSROOMS_INITIAL_STATE,
  ...PROGRAMS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  classrooms: state.classrooms.classrooms,
  classroomsStatus: state.classrooms.status,
  programs: state.programs.programs,
  selectedClassroom: state.classrooms.selectedClassroom,
  selectedProgram: state.programs.selectedProgram,
  showForm: state.classrooms.showForm
});

export default connect(mapStateToProps)(WildCamClassroomsManagerContainer);
