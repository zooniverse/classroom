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
        this.props.requestedExports[classroom.id].exportable_id &&
        this.props.requestedExports[classroom.id].exportable_id.toString() === assignment.workflowId) {
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
    if (csvData && csvData.data && csvData.data.length > 0 && csvData.errors.length === 0) {
      if (this.state.toExport.assignment.name === i2aAssignmentNames.galaxy) {
        return Promise.resolve(this.transformGalaxyDataCsv(csvData));
      } else if (this.state.toExport.assignment.name === i2aAssignmentNames.hubble) {
        return Promise.resolve(this.transformHubbleDataCsv(csvData));
      }
    }

    if (csvData && csvData.errors.length > 0) {
      Actions.caesarExports.setCaesarExport(CAESAR_EXPORTS_INITIAL_STATE.caesarExport);
      return Promise.reject(csvData.errors[0].message);
    }

    return Promise.resolve(null);
  }

  transformGalaxyDataCsv(csvData) {
    let csvRows = 'Galaxy ID,Total # of classifications,Spiral,Elliptical,Merger,Artifact,SSDS ID,Image,GZ Original Spiral,GZ Original Elliptical,GZ Original Merger,GZ Original Artifact\n';
    const exportData = csvData.data;
    const originalHeaders = exportData.shift();
    const reducerKeyIndex = originalHeaders.indexOf('reducer_key');
    const subjectIdIndex = originalHeaders.indexOf('subject_id');
    const galaxyIdIndex = originalHeaders.indexOf('data.Galaxy Id');
    const spiralIndex = originalHeaders.indexOf('data.0');
    const ellipticalIndex = originalHeaders.indexOf('data.1');
    const mergerIndex = originalHeaders.indexOf('data.2');
    const artifactIndex = originalHeaders.indexOf('data.3');
    const sdssIdIndex = originalHeaders.indexOf('data.SDSS_ID');
    const imageIndex = originalHeaders.indexOf('data.Image');
    const gzSpiralIndex = originalHeaders.indexOf('data.GZ Original Spiral');
    const gzEllipticalIndex = originalHeaders.indexOf('data.GZ Original Elliptical');
    const gzMergerIndex = originalHeaders.indexOf('data.GZ Original Merger');
    const gzArtifactIndex = originalHeaders.indexOf('data.GZ Original Artifact');

    const votesReducerData = exportData.filter((row, index) => {
      return row[reducerKeyIndex] === 'votes';
    });

    const metadataReducerData = exportData.filter((row, index) => {
      return row[reducerKeyIndex] === 'metadata';
    });

    const newHumanReadableTable = [];
    votesReducerData.forEach((votesRow) => {
      metadataReducerData.forEach((metadataRow) => {
        // Same subject id
        if (votesRow[subjectIdIndex] === metadataRow[subjectIdIndex]) {
          const galaxyId = metadataRow[galaxyIdIndex];
          const spiral = votesRow[spiralIndex] ? votesRow[spiralIndex] : 0;
          const elliptical = votesRow[ellipticalIndex] ? votesRow[ellipticalIndex] : 0;
          const merger = votesRow[mergerIndex] ? votesRow[mergerIndex] : 0;
          const artifact = votesRow[artifactIndex] ? votesRow[artifactIndex] : 0;
          const total = +spiral + +elliptical + +merger + +artifact;
          const sdssId = metadataRow[sdssIdIndex];
          const image = metadataRow[imageIndex];
          const gzSpiral = metadataRow[gzSpiralIndex];
          const gzElliptical = metadataRow[gzEllipticalIndex];
          const gzMerger = metadataRow[gzMergerIndex];
          const gzArtifact = metadataRow[gzArtifactIndex];

          newHumanReadableTable.push([galaxyId, total, spiral, elliptical, merger, artifact, sdssId, image, gzSpiral, gzElliptical, gzMerger, gzArtifact]);
        }
      });
    });

    // Sort by galaxy id
    newHumanReadableTable.sort((a, b) => {
      return a[0] - b[0];
    });

    // Convert to string
    newHumanReadableTable.forEach((row) => {
      csvRows += `${row.toString()}\n`;
    });

    return csvRows;
  }

  transformHubbleDataCsv(csvData) {
    let csvRows = 'Galaxy ID,N Class,RA,Dec,Dist,lambda_av,lambda_err,Redshift,Velocity, URL\n';
    const exportData = csvData.data;
    const originalHeaders = exportData.shift();
    const reducerKeyIndex = originalHeaders.indexOf('reducer_key');
    const subjectIdIndex = originalHeaders.indexOf('subject_id');
    const galaxyIdIndex = originalHeaders.indexOf('data.galaxy_id');
    const nClassIndex = originalHeaders.indexOf('data.count');
    const raIndex = originalHeaders.indexOf('data.RA');
    const decIndex = originalHeaders.indexOf('data.dec');
    const distIndex = originalHeaders.indexOf('data.dist');
    const lambdaAvIndex = originalHeaders.indexOf('data.mean');
    const lambdaErrIndex = originalHeaders.indexOf('data.stdev');
    const redshiftIndex = originalHeaders.indexOf('data.redshift');
    const urlIndex = originalHeaders.indexOf('data.url');

    const lambdaReducerData = exportData.filter((row, index) => {
      return row[reducerKeyIndex] === 'lambdacen';
    });

    const metadataReducerData = exportData.filter((row, index) => {
      return row[reducerKeyIndex] === 'metadata';
    });

    lambdaReducerData.forEach((lambdaRow) => {
      metadataReducerData.forEach((metadataRow) => {
        // Same subject id
        if (lambdaRow[subjectIdIndex] === metadataRow[subjectIdIndex]) {
          const galaxyId = metadataRow[galaxyIdIndex];
          const nClass = lambdaRow[nClassIndex];
          const ra = metadataRow[raIndex];
          const dec = metadataRow[decIndex];
          const dist = metadataRow[distIndex];
          const lambdaAv = lambdaRow[lambdaAvIndex];
          const lambdaErr = lambdaRow[lambdaErrIndex];
          const redshift = metadataRow[redshiftIndex];
          const velocity = redshift.length > 0 ? (300000 * redshift) : '';
          const url = metadataRow[urlIndex];

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
