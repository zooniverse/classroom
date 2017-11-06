import React from 'react';
import { Actions } from 'jumpstate';
import AstroClassroomsTable from '../../components/astro/AstroClassroomsTable';

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
    Actions.getCaesarExport({ assignment, classroom })
      .then((response) => {
        if (response.status === 404 || response.length === 0) {
          Actions.createCaesarExport({ assignment, classroom });
        }
      });
  }

  render() {
    return (
      <AstroClassroomsTable
        {...this.props}
        assignmentToExport={this.state.toExport.assignment}
        onExportModalClose={this.onExportModalClose}
        showExportModal={this.showExportModal}
      >
        {this.props.children}
      </AstroClassroomsTable>
    );
  }
}

export default AstroClassroomsTableContainer;
