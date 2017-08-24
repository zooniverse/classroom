import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import SpinningIcon from 'grommet/components/icons/Spinning';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES,
  MAPEXPLORER_CAMERA_STATUS,
} from '../../ducks/mapexplorer';

class CameraViewer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Box className="camera-viewer">
        <Box>
        </Box>
        <Box>
        </Box>
        <Button label="Close" onClick={()=>{ Actions.mapexplorer.resetActiveCamera() }}></Button>
      </Box>
    );
  }
}

CameraViewer.defaultProps = {
  ...MAPEXPLORER_INITIAL_STATE,
};
CameraViewer.propTypes = {
  ...MAPEXPLORER_PROPTYPES,
};

export default CameraViewer;
