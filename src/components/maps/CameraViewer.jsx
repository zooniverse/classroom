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
import Notification from 'grommet/components/Notification';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import FormNextIcon from 'grommet/components/icons/base/FormNext';
import FormPreviousIcon from 'grommet/components/icons/base/FormPrevious';
import SpinningIcon from 'grommet/components/icons/Spinning';

import CameraViewerMetadata from './CameraViewerMetadata';
import CameraViewerData from './CameraViewerData';

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
  
    this.renderDataPaging = this.renderDataPaging.bind(this);
    this.changeDataPaging = this.changeDataPaging.bind(this);
  
    this.state = {
      page: 0,
    };
  }

  render() {
    if (!this.props.mapConfig) return null;
    
    return (
      <Layer className="camera-viewer" closer={true} onClose={()=>{Actions.mapexplorer.resetActiveCamera()}}>
        <Box className="content" align="center">
          <Box className="camera-metadata">
            <CameraViewerMetadata
              activeCameraMetadata={this.props.activeCameraMetadata}
              activeCameraMetadataStatus={this.props.activeCameraMetadataStatus}
            />
          </Box>
          <Box className="camera-data">
            {this.renderDataPaging()}
            <CameraViewerData
              page={this.state.page}
              itemsPerPage={ITEMS_PER_PAGE}
              activeCameraData={this.props.activeCameraData}
              activeCameraDataStatus={this.props.activeCameraDataStatus}
            />
          </Box>
        </Box>
      </Layer>
    );
  }

  renderDataPaging() {
    if (this.props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.SUCCESS &&
        this.props.activeCameraData) {
      return (
        <Box className="camera-data-paging" direction="row" pad="none" alignSelf="stretch" justify="center" separator="horizontal">
          <Button
            plain={true}
            onClick={()=>{this.changeDataPaging(-1)}}
            icon={<FormPreviousIcon size="xsmall" />}
          />
          <Label align="center" size="small">
            Page {this.state.page+1} of {Math.ceil(this.props.activeCameraData.length / ITEMS_PER_PAGE)}
          </Label>
          <Button
            plain={true}
            onClick={()=>{this.changeDataPaging(1)}}
            icon={<FormNextIcon size="xsmall" />}
          />
        </Box>
      );
    }
    return null;
  }

  changeDataPaging(change) {
    if (!this.props.activeCameraData) return;
    
    let nextPage = this.state.page + change;
    nextPage = Math.max(nextPage, 0);
    nextPage = Math.min(nextPage, Math.ceil(this.props.activeCameraData.length / ITEMS_PER_PAGE))
    
    this.setState({
      page: nextPage,
    });
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
