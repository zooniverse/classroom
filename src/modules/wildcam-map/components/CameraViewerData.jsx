import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail } from 'zooniverse-react-components';
import Anchor from 'grommet/components/Anchor';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Notification from 'grommet/components/Notification';
import SpinningIcon from 'grommet/components/icons/Spinning';

const THUMBNAIL_SERVER_URL = 'https://thumbnails.zooniverse.org/';
const THUMBNAIL_WIDTH = 320;
const THUMBNAIL_HEIGHT = 200;

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES,
  WILDCAMMAP_CAMERA_STATUS,
} from '../ducks/index.js';

const CameraViewerData = (props) => {
  if (props.activeCameraDataStatus === WILDCAMMAP_CAMERA_STATUS.FETCHING) {
    return <SpinningIcon />;
  } else if (props.activeCameraDataStatus === WILDCAMMAP_CAMERA_STATUS.ERROR) {
    return <Notification message='ERROR' status='critical' />
  }

  if (props.activeCameraDataStatus === WILDCAMMAP_CAMERA_STATUS.SUCCESS &&
      props.activeCameraData) {
    const data = props.activeCameraData || [];
    
    return (
      <Tiles fill={true} flush={true}>
        {data.slice(props.page * props.itemsPerPage, (props.page + 1) * props.itemsPerPage).map((item, i) => {
          let location = item.location || '';
          
          //TODO: Enable alt tags.
          //Requires:
          //1. Zooniverse-React-Trasnscriber.Thumbnail to accept alt data,
          //2. updating the SQL query.
          //const alt = `Photo from ${item.national_park} showing ${item.count} ${item.species}`;
          
          return (
            <Tile className="camera-data-item" key={`camera-data-${props.page * props.itemsPerPage + i}`}>
              <Anchor href={location}>
                <Thumbnail
                  src={location}
                  height={THUMBNAIL_HEIGHT}
                  width={THUMBNAIL_WIDTH}
                />
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
  activeCameraDataStatus: WILDCAMMAP_INITIAL_STATE.activeCameraDataStatus,
  activeCameraData: WILDCAMMAP_INITIAL_STATE.activeCameraData,
  page: 0,
  itemsPerPage: 6,
};
CameraViewerData.propTypes = {
  activeCameraDataStatus: WILDCAMMAP_PROPTYPES.activeCameraDataStatus,
  activeCameraData: WILDCAMMAP_PROPTYPES.activeCameraData,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
};

export default CameraViewerData;
