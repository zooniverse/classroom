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
import {
  CAESAR_EXPORTS_INITIAL_STATE, CAESAR_EXPORTS_PROPTYPES, CAESAR_EXPORTS_STATUS
} from '../../ducks/caesar-exports';


const CaesarExportModal = ({ caesarExport, caesarExportStatus, onClose, showModal }) => {
  // TODO replace Date.now() with timestamp in export response
  // TODO add url prop to SuperDownloadButton
  // TODO add button to send to Google Sheets
  if (showModal) {
    return (
      <Layer className="caesar-export-modal" closer={true} onClose={onClose}>
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
          {!caesarExport &&
            caesarExportStatus === CAESAR_EXPORTS_STATUS.SUCCESS &&
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
          <SuperDownloadButton
            className="caesar-export-modal__download-button"
            text="Download CSV"
            primary={true}
          />
        </Box>
      </Layer>
    );
  }

  return null;
};

CaesarExportModal.defaultProps = {
  ...CAESAR_EXPORTS_INITIAL_STATE,
  onClose: () => {}
};

CaesarExportModal.propTypes = {
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

export default connect(mapStateToProps)(CaesarExportModal);
