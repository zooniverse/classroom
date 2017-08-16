/*
Map Explorer
============

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MapVisuals from './MapVisuals'

class MapExplorer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  //----------------------------------------------------------------
  
  render() {
    return (
      <div className="map-explorer" style={{height: '90vh'}}>
        <MapVisuals
          mapConfig={this.props.mapConfig}
        />
      </div>
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
