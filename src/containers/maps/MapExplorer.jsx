/*
Map Explorer
============

The primary component for the Map Explorer feature.

This feature is a 'data visualisation tool' allows Teachers and Students to view
aggregated data from a Zooniverse project on a visual, geographical map.

Requires:
* a project-specific `mapConfig` object.
* (External dependency) an external database containing the map data for said
  project, which can be queried with SQL SELECT commands. For example, Carto.
  
Notable components:
* MapVisuals: handles the visual display of the map.
* MapControls: allows users to select the kind of data they want.
* ducks/mapexplorer: stores the map explorer data (e.g. view state) AND connects
    to the external database.
* lib/mapexplorer-helper: handles general utility features, such as constructing
    SQL "where" clauses from selected filters.

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import MapVisuals from './MapVisuals'
import MapControls from './MapControls'

class MapExplorer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  //----------------------------------------------------------------
  
  render() {
    return (
      <Box className="map-explorer" full={true}>
        <MapVisuals
          mapConfig={this.props.mapConfig}
        />
        <MapControls
          mapConfig={this.props.mapConfig}
        />
      </Box>
    );
  }
}

MapExplorer.propTypes = {
  mapConfig: PropTypes.object,
};
MapExplorer.defaultProps = {
  mapConfig: null,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MapExplorer);
