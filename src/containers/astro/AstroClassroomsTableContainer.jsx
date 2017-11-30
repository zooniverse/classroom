import React from 'react';
import { Actions } from 'jumpstate';
import { connect } from 'react-redux';

import AstroClassroomsTable from '../../components/astro/AstroClassroomsTable';

import {
  CAESAR_EXPORTS_INITIAL_STATE, CAESAR_EXPORTS_PROPTYPES
} from '../../ducks/caesar-exports';
import { i2aAssignmentNames } from '../../ducks/programs';

class AstroClassroomsTableContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      toExport: {
        assignment: {},
        classroom: {}
      }
    };

    this.handleRequestForNewExport = this.handleRequestForNewExport.bind(this);
    this.onExportModalClose = this.onExportModalClose.bind(this);
    this.handleRequestForNewExport = this.handleRequestForNewExport.bind(this);
    this.onExportModalClose = this.onExportModalClose.bind(this);
    this.showExportModal = this.showExportModal.bind(this);
    this.transformData = this.transformData.bind(this);
  }

  onExportModalClose() {
    this.setState({ toExport: { assignment: {}, classroom: {} } });

    Actions.caesarExports.setCaesarExport(CAESAR_EXPORTS_INITIAL_STATE.caesarExport);
    Actions.caesarExports.setGoogleFileUrl(CAESAR_EXPORTS_INITIAL_STATE.googleFileUrl);
    Actions.caesarExports.setStatus(CAESAR_EXPORTS_INITIAL_STATE.status);
    Actions.caesarExports.showModal();
  }

  showExportModal(assignment, classroom) {
    this.setState({ toExport: { assignment, classroom } });

    Actions.caesarExports.showModal();

    if (Object.keys(this.props.requestedExports).length > 0 &&
        this.props.requestedExports[classroom.id] &&
        this.props.requestedExports[classroom.id].workflow_id.toString() === assignment.workflowId) {
      this.checkPendingExport(assignment, classroom, this.props.requestedExports[classroom.id].id);
    } else {
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

  checkPendingExport(assignment, classroom, exportId) {
    return Actions.getCaesarExport({ assignment, classroom, id: exportId });
  }

  requestNewExport(assignment, classroom) {
    return Actions.createCaesarExport({ assignment, classroom });
  }

  handleRequestForNewExport() {
    const assignment = this.state.toExport.assignment;
    const classroom = this.state.toExport.classroom;

    Actions.createCaesarExport({ assignment, classroom });
  }

  transformData(csvData) {
    if (this.state.toExport.assignment.name === i2aAssignmentNames.galaxy) {
      return Promise.resolve(this.transformGalaxyDataCsv(csvData));
    } else if (this.state.toExport.assignment.name === i2aAssignmentNames.hubble) {
      return Promise.resolve(this.transformHubbleDataCsv(csvData));
    }

    return null;
  }

  transformGalaxyDataCsv(csvData) {
    console.log('TO DO: transform data for galaxy activity', csvData);
  }

  transformHubbleDataCsv(csvData) {
    if (!csvData || (csvData && !csvData.data)) return null;

    let csvRows = 'Galaxy ID,N Class,RA,Dec,Dist,lambda_av,lambda_err,Redshift,Velocity, URL\n';
    const exportData = csvData.data;
    // We don't care about the original headers
    exportData.shift();

    const lambdaReducerData = exportData.filter((row, index) => {
      return row[1] === 'lambdacen';
    });

    const metadataReducerData = exportData.filter((row, index) => {
      return row[1] === 'metadata';
    });

    lambdaReducerData.forEach((lambdaRow) => {
      metadataReducerData.forEach((metadataRow) => {
        // Same subject id
        if (lambdaRow[3] === metadataRow[3]) {
          const galaxyId = metadataRow[8];
          const nClass = lambdaRow[15];
          const ra = metadataRow[7];
          const dec = metadataRow[18];
          const dist = metadataRow[10];
          const lambdaAv = lambdaRow[12];
          const lambdaErr = lambdaRow[13];
          const redshift = metadataRow[17];
          const velocity = redshift.length > 0 ? (300000 * redshift) : '';
          const url = metadataRow[16];

          const row = `${galaxyId},${nClass},${ra},${dec},${dist},${lambdaAv},${lambdaErr},${redshift},${velocity},${url}\n`;
          csvRows += row;
        }
      });
    });

    return csvRows;
  }

  render() {
    return (
      <AstroClassroomsTable
        {...this.props}
        toExport={this.state.toExport}
        onExportModalClose={this.onExportModalClose}
        requestNewExport={this.handleRequestForNewExport}
        showExportModal={this.showExportModal}
        transformData={this.transformData}
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
  return {
    caesarExport: state.caesarExports.caesarExport,
    requestedExports: state.caesarExports.requestedExports
  };
}

export default connect(mapStateToProps)(AstroClassroomsTableContainer);
