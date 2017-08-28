import React from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import SpinningIcon from 'grommet/components/icons/Spinning';

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
      {Object.keys(props.activeCameraMetadata).map(key => (
        <ListItem
          key={`camera-metadata-${key}`}
          justify='between'
          separator='horizontal'
        >
          <span>{key}</span>
          <span>{props.activeCameraMetadata[key]}</span>
        </ListItem>
      ))}
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
