/*
Map Explorer - Controls
=======================

Part of the Map Explorer feature.

This component has two functions:
* allow users to select the filters (e.g. by species) shown on the map.
* allow users to download data from the external database, based on the selected
  filters.

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

class MapControls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  //----------------------------------------------------------------

  render() {
    
    
    return (
      null
    );
  }  
}

MapControls.propTypes = {
  mapConfig: PropTypes.object,
};
MapControls.defaultProps = {
  mapConfig: null,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MapControls);
