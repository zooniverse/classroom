import React from 'react';
import { Actions } from 'jumpstate';
import { connect } from 'react-redux';
import AstroClassroomsTable from '../../components/astro/AstroClassroomsTable';

import {
  CAESAR_EXPORTS_INITIAL_STATE, CAESAR_EXPORTS_PROPTYPES
} from '../../ducks/caesar-exports';

class AstroClassroomsTableContainer extends React.Component {
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

    if (Object.keys(this.props.requestedExports).length > 0 &&
      this.props.requestedExports[classroom.id] &&
      this.props.requestedExports[classroom.id].workflow_id.toString() === assignment.workflowId) {
      this.checkPendingExport(assignment, classroom);
    }

    if (Object.keys(this.props.requestedExports).length === 0) {
      this.checkExportExistence(assignment, classroom)
        .then((caesarExports) => {
          if (caesarExports && caesarExports.length === 0) {
            this.requestNewExport(assignment, classroom);
          }
        });
    }
  }

  checkExportExistence(assignment, classroom) {
    return Actions.getCaesarExports({ assignment, classroom });
  }

  checkPendingExport(assignment, classroom) {
    const exportId = this.props.requestedExports[classroom.id].id;

    return Actions.getCaesarExport({ assignment, classroom, id: exportId });
  }

  requestNewExport(assignment = this.state.assignment, classroom = this.state.classroom) {
    return Actions.createCaesarExport({ assignment, classroom });
  }

  render() {
    return (
      <AstroClassroomsTable
        {...this.props}
        assignmentToExport={this.state.toExport.assignment}
        onExportModalClose={this.onExportModalClose}
        requestNewExport={this.requestNewExport}
        showExportModal={this.showExportModal}
      >
        {this.props.children}
      </AstroClassroomsTable>
    );
  }
}

AstroClassroomsTableContainer.defaultProps = {
  ...CAESAR_EXPORTS_INITIAL_STATE
};

AstroClassroomsTableContainer.propTypes = {
  ...CAESAR_EXPORTS_PROPTYPES
};

function mapStateToProps(state) {
  return { requestedExports: state.caesarExports.requestedExports };
}

export default connect(mapStateToProps)(AstroClassroomsTableContainer);
