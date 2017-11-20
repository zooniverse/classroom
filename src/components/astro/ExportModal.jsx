import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';
import Timestamp from 'grommet/components/Timestamp';
import Paragraph from 'grommet/components/Paragraph';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';

import SuperDownloadButton from '../common/SuperDownloadButton';
import GoogleDriveExportButton from './GoogleDriveExportButton';
import {
  CAESAR_EXPORTS_INITIAL_STATE, CAESAR_EXPORTS_PROPTYPES, CAESAR_EXPORTS_STATUS
} from '../../ducks/caesar-exports';


function ExportModal({ caesarExport, caesarExports, caesarExportStatus, onClose, requestedExports, requestNewExport, showModal, transformData }) {
  // TODO add url prop to SuperDownloadButton
  // TODO disable Export to Google Sheets button like the download button.
  // It's not disabled for testing purposes at the moment
  const noExport = caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport &&
    caesarExports === CAESAR_EXPORTS_INITIAL_STATE.caesarExports &&
    caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS;
  const fetching = caesarExportStatus === CAESAR_EXPORTS_STATUS.FETCHING &&
    (caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport ||
    caesarExports === CAESAR_EXPORTS_INITIAL_STATE.caesarExports);
  const pending = Object.keys(requestedExports).length > 0 && caesarExportStatus === CAESAR_EXPORTS_STATUS.PENDING;
  const disableButton = noExport || fetching || pending;
  const success = Object.keys(caesarExport).length > 0 && caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS;

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
              fileNameBase="astro101-"
              primary={true}
              text="Download CSV"
              transformData={transformData}
              url={caesarExport.url}
            />
            <GoogleDriveExportButton
              className="export-modal__button"
              disabled={disableButton}
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
  onClose: () => {}
};

ExportModal.propTypes = {
  ...CAESAR_EXPORTS_PROPTYPES,
  onClose: PropTypes.func
};

function mapStateToProps(state) {
  return {
    caesarExport: state.caesarExports.caesarExport,
    caesarExportStatus: state.caesarExports.status,
    requestedExports: state.caesarExports.requestedExports,
    showModal: state.caesarExports.showModal
  };
}

export default connect(mapStateToProps)(ExportModal);
