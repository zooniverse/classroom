import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';
import Timestamp from 'grommet/components/Timestamp';
import Paragraph from 'grommet/components/Paragraph';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';

import SuperDownloadButton from '../common/SuperDownloadButton';
import GoogleDriveExportButton from './GoogleDriveExportButton';
import {
  CAESAR_EXPORTS_INITIAL_STATE, CAESAR_EXPORTS_PROPTYPES, CAESAR_EXPORTS_STATUS
} from '../../ducks/caesar-exports';


function prepStringForFilename(string) {
  return string.replace(/\s+/g, '-').toLowerCase();
}

function ExportModal({
  caesarExport,
  caesarExports,
  caesarExportStatus,
  googleFileUrl,
  onClose,
  requestedExports,
  requestNewExport,
  showModal,
  toExport,
  transformData }) {
  const noExport = caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport &&
    caesarExports === CAESAR_EXPORTS_INITIAL_STATE.caesarExports &&
    caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS;
  const fetching = caesarExportStatus === CAESAR_EXPORTS_STATUS.FETCHING &&
    (caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport ||
    caesarExports === CAESAR_EXPORTS_INITIAL_STATE.caesarExports);
  const pending = Object.keys(requestedExports).length > 0 &&
    caesarExportStatus === CAESAR_EXPORTS_STATUS.PENDING &&
    toExport.classroom &&
    toExport.assignment &&
    requestedExports[toExport.classroom.id] &&
    requestedExports[toExport.classroom.id].workflow_id.toString() === toExport.assignment.workflowId;
  const disableButton = noExport || fetching || pending;
  const success = Object.keys(caesarExport).length > 0 && caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS;
  const assignmentName = (toExport.assignment && toExport.assignment.name) ? prepStringForFilename(toExport.assignment.name) : null;
  const classroomName = (toExport.classroom && toExport.classroom.name) ? prepStringForFilename(toExport.classroom.name) : null;
  const fileNameBase = (assignmentName && classroomName) ? `astro101-${classroomName}-${assignmentName}-` : 'astro101-';

  if (showModal) {
    return (
      <Layer className="export-modal" closer={true} onClose={onClose}>
        <Box pad="medium" justify="between">
          <Heading tag="h2">Data Export</Heading>
          {fetching &&
            <Paragraph align="center"><Spinning /></Paragraph>}
          {success &&
            <Box>
              <Paragraph>
                <Status value="ok" />{' '}
                Export available since{' '}
                <Timestamp value={new Date(caesarExport.updated_at)} />
              </Paragraph>
              <Paragraph>
                <Button secondary={true} fill={false} onClick={requestNewExport} label="Request new export" />
              </Paragraph>
            </Box>}
          {pending &&
            <Paragraph>
              <Status value="warning" />{' '}
              Export request is processing. Please check again later.
            </Paragraph>}
          {caesarExportStatus === CAESAR_EXPORTS_STATUS.EXPORTING &&
            <Paragraph>
              <Spinning />{' '}
              Export to Google Drive request is processing.
            </Paragraph>}
          {caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS && googleFileUrl &&
            <Paragraph>
              <Status value="ok" />{' '}
              The CSV export is now{' '}
              <Anchor
                href={googleFileUrl}
                onClick={Actions.caesarExports.showModal}
                target="_blank"
                rel="noopener noreferrer"
              >
                  available on your Google Drive
                </Anchor>.
            </Paragraph>}
          {noExport &&
            <Paragraph>
              <Status value="warning" />{' '}
              No export available for this classroom and assignment.
            </Paragraph>}
          {caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport &&
            caesarExportStatus === CAESAR_EXPORTS_STATUS.ERROR &&
            <Box>
              <Paragraph>
                <Status value="critical" />{' '}
                Something went wrong. Either the export processing failed or the server is not available. Please try again.
              </Paragraph>
              <Paragraph>
                <Button secondary={true} fill={false} onClick={requestNewExport} label="Request new export" />
              </Paragraph>
            </Box>}
          <Box direction="row">
            <SuperDownloadButton
              className="export-modal__button"
              disabled={disableButton}
              fileNameBase={fileNameBase}
              primary={true}
              text="Download CSV"
              transformData={transformData}
              url={caesarExport.url}
            />
            <GoogleDriveExportButton
              className="export-modal__button"
              disabled={disableButton}
              fileNameBase={fileNameBase}
              transformData={transformData}
              url={caesarExport.url}
            />
          </Box>
        </Box>
      </Layer>
    );
  }

  return null;
};

ExportModal.defaultProps = {
  ...CAESAR_EXPORTS_INITIAL_STATE,
  onClose: () => {},
  toExport: {},
};

ExportModal.propTypes = {
  ...CAESAR_EXPORTS_PROPTYPES,
  onClose: PropTypes.func,
  toExport: PropTypes.shape({
    assignment: PropTypes.object,
    classroom: PropTypes.object
  })
};

function mapStateToProps(state) {
  return {
    caesarExport: state.caesarExports.caesarExport,
    caesarExportStatus: state.caesarExports.status,
    googleFileUrl: state.caesarExports.googleFileUrl,
    requestedExports: state.caesarExports.requestedExports,
    showModal: state.caesarExports.showModal
  };
}

export default connect(mapStateToProps)(ExportModal);
