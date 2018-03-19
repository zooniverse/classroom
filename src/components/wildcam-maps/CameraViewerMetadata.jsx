import React from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import SpinningIcon from 'grommet/components/icons/Spinning';

import { ZooTran, ZooTranExists } from '../../lib/zooniversal-translator.js';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES,
  MAPEXPLORER_CAMERA_STATUS,
} from '../../ducks/mapexplorer';

const CameraViewerMetadata = (props) => {
  if (props.activeCameraMetadataStatus === MAPEXPLORER_CAMERA_STATUS.FETCHING) {
    return <SpinningIcon />;
  } else if (props.activeCameraMetadataStatus === MAPEXPLORER_CAMERA_STATUS.ERROR) {
    return <Notification message='ERROR' status='critical' />;
  }

  if (props.activeCameraMetadataStatus === MAPEXPLORER_CAMERA_STATUS.SUCCESS &&
      props.activeCameraMetadata) {

    return (
      <List>
      {Object.keys(props.activeCameraMetadata).map(key => {
        if (!ZooTranExists(key)) return null;
        
        return (
          <ListItem
            key={`camera-metadata-${key}`}
            justify='between'
            separator='horizontal'
          >
            <span>{ZooTran(key)}</span>
            <span>{ZooTran(props.activeCameraMetadata[key])}</span>
          </ListItem>
        );
      })}
      </List>
    );
  }

  return null;
}

CameraViewerMetadata.defaultProps = {
  activeCameraMetadataStatus: MAPEXPLORER_INITIAL_STATE.activeCameraMetadataStatus,
  activeCameraMetadata: MAPEXPLORER_INITIAL_STATE.activeCameraMetadata,
};
CameraViewerMetadata.propTypes = {
  activeCameraMetadataStatus: MAPEXPLORER_PROPTYPES.activeCameraMetadataStatus,
  activeCameraMetadata: MAPEXPLORER_PROPTYPES.activeCameraMetadata
};

export default CameraViewerMetadata;
