import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import AstroClassroomsTable from '../../components/astro/AstroClassroomsTable';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';
import { programsMocks } from '../../ducks/programs';

class ClassroomsTableContainer extends React.Component {
  selectClassroom(classroom) {
    Actions.classrooms.selectClassroom(classroom);
  }

  render() {
    if (this.props.selectedProgram && this.props.selectedProgram.slug === programsMocks.i2a.slug) {
      return (
        <AstroClassroomsTable
          assignments={this.props.assignments}
          assignmentsStatus={this.props.assignmentsStatus}
          classrooms={this.props.classrooms}
          deleteClassroom={this.props.deleteClassroom}
          match={this.props.match}
          maybeDeleteClassroom={this.props.maybeDeleteClassroom}
          selectClassroom={this.selectClassroom}
          selectedProgram={this.props.selectedProgram}
        />
      );
    }

    // TODO return the darien style classroom table
    return null;
  }
}

ClassroomsTableContainer.defaultProps = {
  ...ASSIGNMENTS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE,
  selectClassroom: () => {}
};

ClassroomsTableContainer.propTypes = {
  ...ASSIGNMENTS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES,
  selectClassroom: PropTypes.func
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
