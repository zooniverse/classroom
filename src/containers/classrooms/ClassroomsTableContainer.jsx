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
  constructor() {
    super();

    this.state = {
      toExport: {
        assignment: {},
        classroom: {}
      }
    };

    this.onExportModalClose = this.onExportModalClose.bind(this);
    this.showExportModal = this.showExportModal.bind(this);
  }

  onExportModalClose() {
    this.setState({ toExport: { assignment: {}, classroom: {} } });

    Actions.caesarExports.showModal();
  }

  showExportModal(assignment, classroom) {
    this.setState({ toExport: { assignment, classroom } });

    Actions.caesarExports.showModal();
    Actions.getCaesarExport({ assignment, classroom });
  }

  selectClassroom(classroom) {
    Actions.classrooms.selectClassroom(classroom);
  }

  render() {
    if (this.props.selectedProgram && this.props.selectedProgram.slug === programsMocks.i2a.slug) {
      return (
        <AstroClassroomsTable
          assignmentToExport={this.state.toExport.assignment}
          assignments={this.props.assignments}
          assignmentsStatus={this.props.assignmentsStatus}
          classrooms={this.props.classrooms}
          match={this.props.match}
          maybeDeleteClassroom={this.props.maybeDeleteClassroom}
          onExportModalClose={this.onExportModalClose}
          selectClassroom={this.selectClassroom}
          selectedProgram={this.props.selectedProgram}
          showExportModal={this.showExportModal}
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
