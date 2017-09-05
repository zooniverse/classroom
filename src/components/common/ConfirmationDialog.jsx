import React from 'react';
import PropTypes from 'prop-types';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Status from 'grommet/components/icons/Status';
import Heading from 'grommet/components/Heading';

const ConfirmationDialog = (props) => {
  if (props.showConfirmationDialog) {
    return (
      <Layer closer={true} onClose={props.onClose} className="confirmation-dialog">
        <Box pad="small">
          <Heading tag="h3" strong={true} uppercase={true}><Status value="warning" /> Are you sure?</Heading>
          {props.children}
          <Box direction="row" className="confirmation-dialog__buttons">
            <Button
              type="submit"
              primary={true}
              label={props.confirmationButtonLabel}
              onClick={props.onConfirmation}
            />
            <Button type="button" label="Cancel" onClick={props.onClose} />
          </Box>
        </Box>
      </Layer>
    );
  }

  return null;
};

ConfirmationDialog.propTypes = {
  confirmationButtonLabel: PropTypes.string,
  onClose: PropTypes.func,
  onConfirmation: PropTypes.func,
  showConfirmationDialog: PropTypes.bool
};

ConfirmationDialog.defaultProps = {
  confirmationButtonLabel: 'Yes',
  onClose: () => {},
  onConfirmation: () => {},
  showConfirmationDialog: false
};

export default ConfirmationDialog;
