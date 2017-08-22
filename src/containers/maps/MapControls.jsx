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

import Box from 'grommet/components/Box';
import MultiChoiceFilter from '../../components/maps/MultiChoiceFilter';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES
} from '../../ducks/mapexplorer';

class MapControls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  //----------------------------------------------------------------

  render() {
    if (!this.props.mapConfig) return null;
    
    return (
      <Box className="map-controls">
        {Object.keys(this.props.mapConfig.map.filters).map(key =>{
          const item = this.props.mapConfig.map.filters[key];
          if (item.type === "multichoice") {
            return (
              <MultiChoiceFilter
                key={`map-controls-${key}`}
                filterKey={key}
                filterLabel={item.label}
                options={item.options}
                selected={this.props.filters[key]}  //This will be undefined if the key doesn't exist.
              />
            );
          }
          //TODO: add more types
        })}
      </Box>
    );
  }
  
  componentWillReceiveProps(props = this.props) {
    Actions.getMapMarkers({
      mapConfig: props.mapConfig,
      filters: props.filters,
    });
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
