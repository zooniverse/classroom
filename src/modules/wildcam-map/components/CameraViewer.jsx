import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';

import CameraViewerMetadata from './CameraViewerMetadata';
import CameraViewerData from './CameraViewerData';
import CameraViewerPaging from './CameraViewerPaging';

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES,
  WILDCAMMAP_CAMERA_STATUS,
} from '../ducks/index.js';

const ITEMS_PER_PAGE = 6;

class CameraViewer extends React.Component {
  constructor(props) {
    super(props);
  
    this.changePage = this.changePage.bind(this);
  
    this.state = {
      page: 0,
    };
  }

  render() {
    if (!this.props.mapConfig) return null;
    
    return (
      <Layer className="camera-viewer" closer={true} onClose={()=>{Actions.wildcamMap.resetActiveCamera()}}>
        <Box className="content" align="center">
          <Box className="camera-metadata">
            <CameraViewerMetadata
              activeCameraMetadata={this.props.activeCameraMetadata}
              activeCameraMetadataStatus={this.props.activeCameraMetadataStatus}
            />
          </Box>
          <Box className="camera-data">
            <CameraViewerPaging
              page={this.state.page}
              itemsPerPage={ITEMS_PER_PAGE}
              activeCameraData={this.props.activeCameraData}
              activeCameraDataStatus={this.props.activeCameraDataStatus}
              changePage={this.changePage}
            />
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

  changePage(change) {
    if (!this.props.activeCameraData) return;
    
    let nextPage = this.state.page + change;
    nextPage = Math.min(nextPage, Math.ceil(this.props.activeCameraData.length / ITEMS_PER_PAGE) - 1)
    nextPage = Math.max(nextPage, 0);
    
    this.setState({
      page: nextPage,
    });
  }
}

CameraViewer.defaultProps = {
  mapConfig: null,
  ...WILDCAMMAP_INITIAL_STATE,
};
CameraViewer.propTypes = {
  mapConfig: PropTypes.object,
  ...WILDCAMMAP_PROPTYPES,
};

export default CameraViewer;
