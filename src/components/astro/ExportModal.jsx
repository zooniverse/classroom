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
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';

import SuperDownloadButton from '../common/SuperDownloadButton';
import GoogleDriveExportButton from './GoogleDriveExportButton';
import {
  CAESAR_EXPORTS_INITIAL_STATE, CAESAR_EXPORTS_PROPTYPES, CAESAR_EXPORTS_STATUS
} from '../../ducks/caesar-exports';


const ExportModal = ({ caesarExport, caesarExportStatus, onClose, showModal }) => {
  // TODO replace Date.now() with timestamp in export response
  // TODO add url prop to SuperDownloadButton
  // TODO disable Export to Google Sheets button like the download button.
  // It's not disabled for testing purposes at the moment
  const noExport = caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport &&
    caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS;

  const disableButton = noExport || (caesarExportStatus === CAESAR_EXPORTS_STATUS.FETCHING && caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport);

  if (showModal) {
    return (
      <Layer className="export-modal" closer={true} onClose={onClose}>
        <Box pad="medium" justify="between">
          <Heading tag="h2">Data Export</Heading>
          {caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport &&
            caesarExportStatus === CAESAR_EXPORTS_STATUS.FETCHING &&
            <Paragraph align="center"><Spinning /></Paragraph>}
          {Object.keys(caesarExport) > 0 &&
            caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS &&
            <Paragraph>
              <Status value="ok" />{' '}
              Export available since{' '}
              <TimeStamp value={Date.now()} />
            </Paragraph>}
          {noExport &&
            <Paragraph>
              <Status value="warning" />{' '}
              No export available for this classroom and assignment.
            </Paragraph>}
          {caesarExport === CAESAR_EXPORTS_INITIAL_STATE.caesarExport &&
            caesarExportStatus === CAESAR_EXPORTS_STATUS.ERROR &&
            <Paragraph>
              <Status value="critical" />{' '}
              Something went wrong
            </Paragraph>}
          <Box direction="row">
            <SuperDownloadButton
              className="export-modal__button"
              disabled={disableButton}
              fileNameBase="astro101-"
              primary={true}
              text="Download CSV"
            />
            <GoogleDriveExportButton className="export-modal__button" />
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
    showModal: state.caesarExports.showModal
  };
}

export default connect(mapStateToProps)(ExportModal);
