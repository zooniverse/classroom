import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'grommet/components/Anchor';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Notification from 'grommet/components/Notification';
import SpinningIcon from 'grommet/components/icons/Spinning';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES,
  MAPEXPLORER_CAMERA_STATUS,
} from '../../ducks/mapexplorer';

const CameraViewerData = (props) => {
  if (props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.FETCHING) {
    return <SpinningIcon />;
  } else if (props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.ERROR) {
    return <Notification message='ERROR' status='critical' />
  }

  if (props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.SUCCESS &&
      props.activeCameraData) {
    const data = props.activeCameraData || [];
    
    console.log(props.page, props.itemsPerPage);
    console.log(data.slice(props.page * props.itemsPerPage, (props.page + 1) * props.itemsPerPage))
    
    return (
      <Tiles fill={true} flush={true}>
        {data.slice(props.page * props.itemsPerPage, (props.page + 1) * props.itemsPerPage).map((item, i) => {
          console.log('i:' + i);
          let location = item.location || '';

          //Thumbnails!
          //----------------
          if (/zooniverse\.org/i.test(location)) {
            location =
              `${THUMBNAIL_SERVER_URL}${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}/` +
              location.replace(/^(https?|ftp):\/\//, '');
          }
          //----------------
          
          return (
            <Tile className="camera-data-item" key={`camera-data-${props.page * props.itemsPerPage + i}`}>
              <Anchor href={item.location}>
                <img src={location} />
              </Anchor>
            </Tile>
          );
        })}
      </Tiles>
    );
  }

  return null;
}

CameraViewerData.defaultProps = {
  activeCameraDataStatus: MAPEXPLORER_INITIAL_STATE.activeCameraDataStatus,
  activeCameraData: MAPEXPLORER_INITIAL_STATE.activeCameraData,
  page: 0,
  itemsPerPage: 6,
};
CameraViewerData.propTypes = {
  activeCameraDataStatus: MAPEXPLORER_PROPTYPES.activeCameraDataStatus,
  activeCameraData: MAPEXPLORER_PROPTYPES.activeCameraData,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
};

export default CameraViewerData;
