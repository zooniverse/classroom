import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Layer from 'grommet/components/Layer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import SpinningIcon from 'grommet/components/icons/Spinning';
import Notification from 'grommet/components/Notification';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES,
  MAPEXPLORER_CAMERA_STATUS,
} from '../../ducks/mapexplorer';

const ITEMS_PER_PAGE = 6;
const THUMBNAIL_SERVER_URL = 'https://thumbnails.zooniverse.org/';
const THUMBNAIL_WIDTH = 320;
const THUMBNAIL_HEIGHT = 200;

class CameraViewer extends React.Component {
  constructor(props) {
    super(props);
  
    this.renderData = this.renderData.bind(this);
    this.renderMetadata = this.renderMetadata.bind(this);
  
    this.state = {
      page: 0,
    };
  }

  componentDidMount() {
    this.setState({
      page: 0,
    });
  }
  
  render() {
    if (!this.props.mapConfig) return null;
    
    return (
      <Layer className="camera-viewer">
        <Box className="content" align="center">
          <Box className="camera-metadata">
            {this.renderMetadata()}
          </Box>
          <Box className="camera-data">
            {this.renderDataPaging()}
            {this.renderData()}
          </Box>
          <Button label="Done" onClick={()=>{ Actions.mapexplorer.resetActiveCamera() }}></Button>
        </Box>
      </Layer>
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
    if (this.props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.FETCHING) {
      return <SpinningIcon />;
    } else if (this.props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.ERROR) {
      return <Notification message='ERROR' status='critical' />
    }
    
    if (this.props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.SUCCESS &&
        this.props.activeCameraData) {
      const data = this.props.activeCameraData;
      const items = [];
      for (let i = this.state.page * ITEMS_PER_PAGE;
           i < data.length && i < (this.state.page + 1) * ITEMS_PER_PAGE;
           i++) {
        let location = data[i].location || '';
        
        //Thumbnails!
        //----------------
        if (/zooniverse\.org/i.test(location)) {
          location =
            `${THUMBNAIL_SERVER_URL}${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT}/` +
            location.replace(/^(https?|ftp):\/\//, '');
        }
        //----------------
        
        
        items.push(
          <Tile className="camera-data-item" key={`camera-data-${i}`}>
            <Anchor href={data[i].location}>
              <img src={location} />
            </Anchor>
          </Tile>
        );
      }

      return (
        <Tiles fill={true} flush={true}>
          {items}
        </Tiles>
      );
    }

    return null;
  }

  renderDataPaging() {
    if (this.props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.SUCCESS &&
        this.props.activeCameraData) {
      
    }
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
