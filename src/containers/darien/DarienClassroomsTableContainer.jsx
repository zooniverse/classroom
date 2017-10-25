import React from 'react';
import { Actions } from 'jumpstate';
import Layer from 'grommet/components/Layer';

import DarienClassroomsTable from '../../components/darien/DarienClassroomsTable';
import AssignmentFormContainer from '../classrooms/AssignmentFormContainer';

class DarienClassroomsTableContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      showForm: false
    };

    this.onExportModalClose = this.onExportModalClose.bind(this);
    this.showExportModal = this.showExportModal.bind(this);
  }

  onClose() {
    this.setState({ toExport: { assignment: {}, classroom: {} } });

    Actions.caesarExports.showModal();
  }

  showExportModal(assignment, classroom) {
    this.setState({ toExport: { assignment, classroom } });

    Actions.caesarExports.showModal();
    Actions.getCaesarExport({ assignment, classroom });
  }

  render() {
    return (
      <DarienClassroomsTable
        {...this.props}
      >
        {this.state.showForm &&
          <Layer>
            <AssignmentFormContainer />
          </Layer>}
        {this.props.children}
      </DarienClassroomsTable>
    );
  }
}

export default DarienClassroomsTableContainer;
