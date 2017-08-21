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

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES
} from '../../ducks/mapexplorer';

class MapControls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  //----------------------------------------------------------------

  render() {
    return (
      <div className="map-controls">
        <div>
          {(this.props.filters && this.props.filters.species)}
        </div>
        <button onClick={()=> Actions.mapexplorer.addFilterSelectionItem({ key: 'species', value: 'lion'})}>Add Lion</button>
        <button onClick={()=> Actions.mapexplorer.removeFilterSelectionItem({ key: 'species', value: 'lion'})}>Remove Lion</button>
      </div>
    );
  }  
}

MapControls.propTypes = {
  mapConfig: PropTypes.object,
  ...MAPEXPLORER_PROPTYPES,
};
MapControls.defaultProps = {
  mapConfig: null,
  ...MAPEXPLORER_INITIAL_STATE,
};
const mapStateToProps = (state) => ({
  filters: state.mapexplorer.filters,
});

export default connect(mapStateToProps)(MapControls);
