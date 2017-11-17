import React from 'react';
import { Actions } from 'jumpstate';
import { connect } from 'react-redux';
import Papa from 'papaparse';
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

    this.getCsvFile = this.getCsvFile.bind(this);
    this.handleRequestForNewExport = this.handleRequestForNewExport.bind(this);
    this.onExportModalClose = this.onExportModalClose.bind(this);
    this.showExportModal = this.showExportModal.bind(this);
    this.transformData = this.transformData.bind(this);
  }

  onExportModalClose() {
    this.setState({ toExport: { assignment: {}, classroom: {} } });

    Actions.caesarExports.setCaesarExport(CAESAR_EXPORTS_INITIAL_STATE.caesarExport);
    Actions.caesarExports.showModal();
  }

  showExportModal(assignment, classroom) {
    const localStorageExport = JSON.parse(localStorage.getItem('pendingExport'));
    this.setState({ toExport: { assignment, classroom } });

    Actions.caesarExports.showModal();

    if (localStorageExport &&
        !this.props.requestNewExport[classroom.id] &&
        localStorageExport[classroom.id] &&
        localStorageExport[classroom.id].workflow_id.toString() === assignment.workflowId) {
      console.log('pendingExport in localStorage')
      this.checkPendingExport(assignment, classroom, localStorageExport[classroom.id].id);
    }

    if (Object.keys(this.props.requestedExports).length > 0 &&
        this.props.requestedExports[classroom.id] &&
        this.props.requestedExports[classroom.id].workflow_id.toString() === assignment.workflowId) {
      console.log('pendingExport in component state')
      this.checkPendingExport(assignment, classroom, this.props.requestedExports[classroom.id].id);
    }

    if (Object.keys(this.props.requestedExports).length === 0 && !localStorageExport) {
      console.log('no requestedExports')
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

  getCsvFile() {
    console.log('getCsvFile called')
    if (Object.keys(this.props.caesarExport).length === 0) return Promise.resolve(null);

    return Promise.resolve(Papa.parse(this.props.caesarExport.url, { complete: this.transformData, download: true }));
    // return Promise.resolve(this.transformData(data));
  }

  transformData(csvData) {
    if (this.state.toExport.assignment.name === i2aAssignmentNames.galaxy) {
      console.log('galaxy assignment')
      return this.transformGalaxyDataCsv(csvData);
    } else if (this.state.toExport.assignment.name === i2aAssignmentNames.hubble) {
      console.log('hubble assignment')
      return this.transformHubbleDataCsv(csvData);
    }

    return null;
  }

  transformGalaxyDataCsv(csvData) {
    console.log(csvData);
  }

  transformHubbleDataCsv(csvData) {
    console.log(csvData);
  }

  render() {
    return (
      <AstroClassroomsTable
        {...this.props}
        assignmentToExport={this.state.toExport.assignment}
        onExportModalClose={this.onExportModalClose}
        requestNewExport={this.handleRequestForNewExport}
        showExportModal={this.showExportModal}
        getCsvFile={this.getCsvFile}
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
