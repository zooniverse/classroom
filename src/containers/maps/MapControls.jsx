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
import SuperDownloadButton from '../../components/common/SuperDownloadButton';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import { constructWhereClause } from '../../lib/mapexplorer-helpers'

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES,
  MAPEXPLORER_MARKERS_STATUS,
} from '../../ducks/mapexplorer';

class MapControls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  //----------------------------------------------------------------

  render() {
    if (!this.props.mapConfig) return null;
    
    const mapConfig = this.props.mapConfig;
    
    const where = constructWhereClause(mapConfig, this.props.filters);
    const downloadUrl = mapConfig.database.urls.csv.replace(
      '{SQLQUERY}',
      encodeURIComponent(mapConfig.database.queries.selectForDownload.replace('{WHERE}', where))
    );
    
    const hasAnySelections = this.props.filters && Object.keys(this.props.filters).length > 0;
    let statusMessage = '...';
    if (this.props.markersStatus === MAPEXPLORER_MARKERS_STATUS.FETCHING) {
      statusMessage = 'Loading...';
    } else if (this.props.markersStatus === MAPEXPLORER_MARKERS_STATUS.ERROR) {
      statusMessage = 'ERROR';
    } else if (this.props.markersStatus === MAPEXPLORER_MARKERS_STATUS.SUCCESS) {
      statusMessage = `${this.props.markersDataCount} result(s)`;
    }
    
    return (
      <Box className="map-controls">
        <Accordion openMulti={true}>
          <AccordionPanel heading={statusMessage} className="map-controls-status">
            <SuperDownloadButton
              url={downloadUrl}
            />
          </AccordionPanel>
        </Accordion>
        <Accordion openMulti={true}>
          <AccordionPanel heading="Filters" className={'map-controls-filters ' + ((hasAnySelections) ? 'selected' : '')}>
            <Accordion openMulti={true}>
            {Object.keys(mapConfig.map.filters).map(key =>{
              const item = mapConfig.map.filters[key];
              if (item.type === "multichoice") {
                return (
                  <AccordionPanel heading={item.label} key={`map-controls-${key}`} className={(this.props.filters[key]) ? 'selected' : ''}>
                    <MultiChoiceFilter
                      filterKey={key}
                      filterLabel={item.label}
                      options={item.options}
                      selected={this.props.filters[key]}  //This will be undefined if the key doesn't exist.
                    />
                  </AccordionPanel>
                );
              }
              //TODO: add more types
            })}
            </Accordion>
          </AccordionPanel>
        </Accordion>
      </Box>
    );
  }
  
  componentWillReceiveProps(props = this.props) {
    //Prevent infinite loops; only update when the selected filters are changed.
    let areFiltersDifferent = JSON.stringify(this.props.filters) !== JSON.stringify(props.filters);
    if (areFiltersDifferent) {
      Actions.getMapMarkers({
        mapConfig: props.mapConfig,
        filters: props.filters,
      });
    }
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
  markersStatus: state.mapexplorer.markersStatus,
  markersDataCount: state.mapexplorer.markersDataCount,
});

export default connect(mapStateToProps)(MapControls);
