/*
WildCam Map - Controls
----------------------

Part of the WildCam Map feature.

This component has two functions:
- allow users to select the filters (e.g. by species) shown on the map.
- allow users to download data from the external database, based on the selected
  filters.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import NumberInput from 'grommet/components/NumberInput';
import MultiChoiceFilter from '../components/MultiChoiceFilter';
import SuperDownloadButton from '../../../components/common/SuperDownloadButton';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import { constructWhereClause } from '../lib/wildcam-map-helpers.js';
import { ZooTran, ZooTranGetLanguage } from '../../../lib/zooniversal-translator.js';

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES,
  WILDCAMMAP_MARKERS_STATUS, WILDCAMMAP_MAP_STATE,
} from '../ducks/index.js';

class MapControls extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      numberOfSelectedSubjects: 0,
    };
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
    if (this.props.markersStatus === WILDCAMMAP_MARKERS_STATUS.FETCHING) {
      statusMessage = ZooTran('Loading...');
    } else if (this.props.markersStatus === WILDCAMMAP_MARKERS_STATUS.ERROR) {
      statusMessage = ZooTran('ERROR');
    } else if (this.props.markersStatus === WILDCAMMAP_MARKERS_STATUS.SUCCESS) {
      statusMessage = `${this.props.markersDataCount} ${ZooTran('result(s)')}`;
    }

    const lang = ZooTranGetLanguage();

    return (
      <Box className="map-controls">
        <Accordion openMulti={true}>
          <AccordionPanel heading={statusMessage} className="map-controls-status">
            <SuperDownloadButton
              fileNameBase="wildcam-"
              url={downloadUrl}
              text={ZooTran('Download')}
              useZooniversalTranslator={true}
            />
            <Box
              className="zooniversal-translator"
              direction="row"
              pad="small"
              colorIndex="light-2"
              margin="small"
              align="center"
              alignContent="between"
              separator="horizontal"
            >
              <Button
                className={(lang !== 'es') ? 'selected' : ''}
                label="English"
                onClick={() => { this.props.setLanguage('en') }}
              />
              <Button
                className={(lang === 'es') ? 'selected' : ''}
                label="Español"
                onClick={() => { this.props.setLanguage('es') }}
              />
            </Box>
            
            {(true || this.props.wccwcmAssignmentPath) && (
              <Box
                className="wccwcm-connector"
                direction="column"
                pad="small"
                margin="small"
                align="center"
                alignContent="between"
              >
                <Label>Select subjects for Assignment</Label>
                <Box
                  direction="row"
                >
                  <NumberInput
                    min={0}
                    max={this.props.markersDataCount}
                    value={this.state.numberOfSelectedSubjects}
                    onChange={(e) => {
                      let val = e.target && parseInt(e.target.value);
                      if (isNaN(val)) val = this.props.markersDataCount;
                      val = Math.min(val, this.props.markersDataCount);
                      val = Math.max(val, 0);
                      this.setState({ numberOfSelectedSubjects: val });
                    }}
                  />
                  <Button
                    className="button"
                    label="Select"
                    onClick={() => {
                      //Save the data that WildCam Classrooms will find interesting.
                      console.log('+++ props: ', this.props)
                      
                      const copyOfFilters = JSON.parse(JSON.stringify(this.props.filters));
                      const copyOfSubjects = ['100', '200'];  //TEST
                      
                      Actions.wildcamMap.setWccWcmSelectedFilters(copyOfFilters);
                      Actions.wildcamMap.setWccWcmSelectedSubjects(copyOfSubjects);
                      
                      //Transition to: Assignment creation
                      this.props.history.push(this.props.wccwcmAssignmentPath);
                    }}
                  />
                </Box>
              </Box>
            )}
            
          </AccordionPanel>
        </Accordion>
        <Accordion openMulti={true}>
          <AccordionPanel heading={ZooTran('Filters')} className={'map-controls-filters ' + ((hasAnySelections) ? 'selected' : '')}>
            <Accordion openMulti={true}>
            {Object.keys(mapConfig.map.filters).map(key =>{
              const item = mapConfig.map.filters[key];
              if (item.type === "multichoice") {
                return (
                  <AccordionPanel heading={ZooTran(item.label)} key={`map-controls-${key}`} className={(this.props.filters[key]) ? 'selected' : ''}>
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
      Actions.wcm_getMapMarkers({
        mapConfig: props.mapConfig,
        filters: props.filters,
      });
    }
    console.log('+++ ', props.markersDataCount);
    this.setState({ numberOfSelectedSubjects: props.markersDataCount });
  }
}

MapControls.propTypes = {
  mapConfig: PropTypes.object,
  setLanguage: PropTypes.func,
  // ----------------
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  ...WILDCAMMAP_PROPTYPES,
};
MapControls.defaultProps = {
  mapConfig: null,
  setLanguage: () => {},
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

export default connect(mapStateToProps)(MapControls);
