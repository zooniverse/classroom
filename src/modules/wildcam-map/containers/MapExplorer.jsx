/*
WildCam Map
-----------

The primary component for the WildCam Map feature.

This feature is a 'data visualisation tool' allows Teachers and Students to view
aggregated data from a Zooniverse project on a visual, geographical map.

Requires:
- a project-specific `mapConfig` object.
- (External dependency) an external database containing the map data for said
  project, which can be queried with SQL SELECT commands. For example, Carto.
  
Notable components:
- MapVisuals: handles the visual display of the map.
- MapControls: allows users to select the kind of data they want.
- ducks/index.js: stores the map explorer data (e.g. view state) AND
    connects to the external database.
- lib/wildcam-map-helpers: handles general utility features, such as
    constructing SQL "where" clauses from selected filters.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';  //TEST

import Box from 'grommet/components/Box';
import MapVisuals from './MapVisuals';
import MapControls from './MapControls';
import CameraViewer from '../components/CameraViewer';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import {
  ZooTran, ZooTranSetLanguage,
} from '../../../lib/zooniversal-translator.js';

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES, WILDCAMMAP_MAP_STATE,
} from '../ducks/index.js';

class MapExplorer extends React.Component {
  constructor(props) {
    super(props);
    
    this.setLanguage = this.setLanguage.bind(this);
  }
  
  //----------------------------------------------------------------
  
  render() {
    return (
      <Box className="wildcam-map">
        <MapVisuals
          mapConfig={this.props.mapConfig}
        />
        {(!this.props.activeCameraId)
          ? <MapControls
              mapConfig={this.props.mapConfig}
              setLanguage={this.setLanguage}
              history={this.props.history}
              location={this.props.location}
              match={this.props.match}
            />
          : <CameraViewer
              mapConfig={this.props.mapConfig}
              activeCameraData={this.props.activeCameraData}
              activeCameraDataStatus={this.props.activeCameraDataStatus}
              activeCameraMetadata={this.props.activeCameraMetadata}
              activeCameraMetadataStatus={this.props.activeCameraMetadataStatus}
            />
        }
        <ScrollToTopOnMount />
      </Box>
    );
  }
  
  setLanguage(lang) {
    ZooTranSetLanguage(lang);
    location.reload();  //Force a reload
    //The ZooTran system is too decentralised and disconnected from the natural
    //React and Redux structure that it requires a more promitive method of
    //synchronising the output across all elements.
  }
}

MapExplorer.propTypes = {
  mapConfig: PropTypes.object,
  // ----------------
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  ...WILDCAMMAP_PROPTYPES,
};
MapExplorer.defaultProps = {
  mapConfig: null,
  // ----------------
  history: null,
  location: null,
  match: null,
  // ----------------
  ...WILDCAMMAP_INITIAL_STATE,
};
const mapStateToProps = (state) => ({
  ...WILDCAMMAP_MAP_STATE(state),
});

export default connect(mapStateToProps)(MapExplorer);
