import React from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import SpinningIcon from 'grommet/components/icons/Spinning';

import { ZooTran, ZooTranExists } from '../../../lib/zooniversal-translator.js';

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES,
  WILDCAMMAP_CAMERA_STATUS,
} from '../ducks/index.js';

const CameraViewerMetadata = (props) => {
  if (props.activeCameraMetadataStatus === WILDCAMMAP_CAMERA_STATUS.FETCHING) {
    return <SpinningIcon />;
  } else if (props.activeCameraMetadataStatus === WILDCAMMAP_CAMERA_STATUS.ERROR) {
    return <Notification message='ERROR' status='critical' />;
  }

  if (props.activeCameraMetadataStatus === WILDCAMMAP_CAMERA_STATUS.SUCCESS &&
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
  activeCameraMetadataStatus: WILDCAMMAP_INITIAL_STATE.activeCameraMetadataStatus,
  activeCameraMetadata: WILDCAMMAP_INITIAL_STATE.activeCameraMetadata,
};
CameraViewerMetadata.propTypes = {
  activeCameraMetadataStatus: WILDCAMMAP_PROPTYPES.activeCameraMetadataStatus,
  activeCameraMetadata: WILDCAMMAP_PROPTYPES.activeCameraMetadata
};

export default CameraViewerMetadata;
