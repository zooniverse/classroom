import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import SpinningIcon from 'grommet/components/icons/Spinning';
import Notification from 'grommet/components/Notification';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES,
  MAPEXPLORER_CAMERA_STATUS,
} from '../../ducks/mapexplorer';

class CameraViewer extends React.Component {
  constructor(props) {
    super(props);
  
    this.renderData = this.renderData.bind(this);
    this.renderMetadata = this.renderMetadata.bind(this);
  }
  
  render() {
    if (!this.props.mapConfig) return null;
    
    return (
      <Box className="camera-viewer" align="center">
        <Box className="camera-metadata">
          {this.renderMetadata()}
        </Box>
        <Box className="camera-data">
          {this.renderData()}
        </Box>
        <Button label="Done" onClick={()=>{ Actions.mapexplorer.resetActiveCamera() }}></Button>
      </Box>
    );
  }

  renderMetadata() {
    if (this.props.activeCameraMetadataStatus === MAPEXPLORER_CAMERA_STATUS.FETCHING) {
      return <SpinningIcon />;
    } else if (this.props.activeCameraMetadataStatus === MAPEXPLORER_CAMERA_STATUS.ERROR) {
      return <Notification message='ERROR' status='critical' />
    }
    if (this.props.activeCameraMetadataStatus === MAPEXPLORER_CAMERA_STATUS.SUCCESS &&
        this.props.activeCameraMetadata) {

      return (
        <List>
        {Object.keys(this.props.activeCameraMetadata).map(key => (
          <ListItem
            key={`camera-metadata-${key}`}
            justify='between'
            separator='horizontal'
          >
            <span>{key}</span>
            <span>{this.props.activeCameraMetadata[key]}</span>
          </ListItem>
        ))}
        </List>
      );
    }

    return null;
  }

  renderData() {
    return null;
  }
}

CameraViewer.defaultProps = {
  mapConfig: null,
  ...MAPEXPLORER_INITIAL_STATE,
};
CameraViewer.propTypes = {
  mapConfig: PropTypes.object,
  ...MAPEXPLORER_PROPTYPES,
};

export default CameraViewer;
