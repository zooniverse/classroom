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
import superagent from 'superagent';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import NumberInput from 'grommet/components/NumberInput';
import MultiChoiceFilter from '../components/MultiChoiceFilter';
import SuperDownloadButton from '../../../components/common/SuperDownloadButton';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import HelpIcon from 'grommet/components/icons/base/Help';

import { constructWhereClause, sqlString } from '../lib/wildcam-map-helpers.js';
import { ZooTran, ZooTranGetLanguage } from '../../../lib/zooniversal-translator.js';

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES,
  WILDCAMMAP_MARKERS_STATUS, WILDCAMMAP_MAP_STATE,
} from '../ducks/index.js';

class MapControls extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      wccAssignmentsStatus: WILDCAMMAP_MARKERS_STATUS.IDLE,
      wccAssignmentsStatusDetails: null,
      wccAssignmentsNumberOfSubjects: 0,
    };
  }

  //----------------------------------------------------------------

  render() {
    const props = this.props;
    const state = this.state;
    
    if (!props.mapConfig) return null;

    const mapConfig = props.mapConfig;

    const where = constructWhereClause(mapConfig, props.filters);
    const downloadUrl = mapConfig.database.urls.csv.replace(
      '{SQLQUERY}',
      encodeURIComponent(mapConfig.database.queries.selectForDownload.replace('{WHERE}', where))
    );

    const hasAnySelections = props.filters && Object.keys(props.filters).length > 0;
    let statusMessage = '...';
    if (props.markersStatus === WILDCAMMAP_MARKERS_STATUS.FETCHING) {
      statusMessage = ZooTran('Loading...');
    } else if (props.markersStatus === WILDCAMMAP_MARKERS_STATUS.ERROR) {
      statusMessage = ZooTran('ERROR');
    } else if (props.markersStatus === WILDCAMMAP_MARKERS_STATUS.SUCCESS) {
      statusMessage = `${props.markersDataCount} ${ZooTran('photo(s)')}`;
    }

    const lang = ZooTranGetLanguage();
    
    const transformDownloadData = (mapConfig.program)
      ? mapConfig.program.transformDownloadData : null;
    
    const dataGuideURL = (mapConfig.program)
      ? mapConfig.program.dataGuideURL : null;

    return (
      <Box className="map-controls">
        <Accordion
          openMulti={true}
          active={[0]}
        >
          <AccordionPanel heading={statusMessage} className="map-controls-status">
            <Box
              direction="row"
              justify="between"
            >
              <SuperDownloadButton
                fileNameBase="wildcam-"
                url={downloadUrl}
                text={ZooTran('Download')}
                transformData={transformDownloadData}
              />
              {dataGuideURL && (
                <Button
                  className="button map-controls-small-button"
                  icon={<HelpIcon />}
                  label={ZooTran('Data Guide')}
                  onClick={() => {
                    window.open(dataGuideURL, '_blank');
                  }}
                />
              )}
            </Box>
            
            {(state.wccAssignmentsStatus === WILDCAMMAP_MARKERS_STATUS.IDLE || state.wccAssignmentsStatus === WILDCAMMAP_MARKERS_STATUS.SUCCESS) &&
              (props.wccwcmAssignmentPath) && (
              <Box
                className="wccwcm-connector"
                direction="column"
                pad="small"
                margin={{ horizontal: "small", vertical: "none" }}
                align="center"
                alignContent="between"
              >
                <Label>{ZooTran('Select photos by choosing filters, then edit the number of photos to be identified and click "Select"')}</Label>
                <Box
                  direction="row"
                >
                  <NumberInput
                    min={0}
                    max={props.markersDataCount}
                    value={state.wccAssignmentsNumberOfSubjects}
                    onChange={(e) => {
                      let val = e.target && parseInt(e.target.value);
                      if (e.target.value === '') val = 0;
                      if (isNaN(val)) val = props.markersDataCount;
                      val = Math.min(val, props.markersDataCount);
                      val = Math.max(val, 0);
                      this.setState({ wccAssignmentsNumberOfSubjects: val });
                    }}
                  />
                  <Button
                    className="button"
                    label="Select"
                    onClick={this.selectSubjectsForAssignment.bind(this)}
                  />
                </Box>
              </Box>
            )}
            
            {(state.wccAssignmentsStatus === WILDCAMMAP_MARKERS_STATUS.FETCHING) && (
              <Box
                className="wccwcm-connector"
                direction="column"
                pad="small"
                margin="small"
                align="center"
                alignContent="between"
              >
                <Label>{ZooTran('Preparing...')}</Label>
              </Box>
            )}
            
            {(state.wccAssignmentsStatus === WILDCAMMAP_MARKERS_STATUS.ERROR) && (
              <Box
                className="wccwcm-connector"
                direction="column"
                pad="small"
                margin="small"
                align="center"
                alignContent="between"
              >
                <Label>
                  ERROR:&nbsp;
                  {state.wccAssignmentsStatusDetails && state.wccAssignmentsStatusDetails.toString && state.wccAssignmentsStatusDetails.toString()}
                </Label>
              </Box>
            )}
            
          </AccordionPanel>
        </Accordion>
        <Accordion
          openMulti={true}
          active={[0]}
        >
          <AccordionPanel heading={ZooTran('Filters')} className={'map-controls-filters ' + ((hasAnySelections) ? 'selected' : '')}>
            <Accordion openMulti={true}>
            {Object.keys(mapConfig.map.filters).map(key =>{
              const item = mapConfig.map.filters[key];
              if (item.type === "multichoice") {
                return (
                  <AccordionPanel heading={ZooTran(item.label)} key={`map-controls-${key}`} className={(props.filters[key]) ? 'selected' : ''}>
                    <MultiChoiceFilter
                      filterKey={key}
                      filterLabel={item.label}
                      options={item.options}
                      selected={props.filters[key]}  //This will be undefined if the key doesn't exist.
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
    this.setState({ wccAssignmentsNumberOfSubjects: props.markersDataCount });
  }

  /*  Save the data that WildCam Classrooms will find interesting.
   */
  selectSubjectsForAssignment() {
    
    const mapConfig = this.props.mapConfig;
    
    //Sanity check
    if (!mapConfig) return;
    
    const where = constructWhereClause(mapConfig, this.props.filters);
    const url = mapConfig.database.urls.json.replace(
      '{SQLQUERY}',
      encodeURIComponent(
        mapConfig.database.queries.selectForAssignment
        .replace('{WHERE}', where)
        .replace('{ORDER}', ' ORDER BY subject_id DESC ')
        .replace('{LIMIT}', ` LIMIT ${this.state.wccAssignmentsNumberOfSubjects}`)
      )
    );
    
    this.setState({
      wccAssignmentsStatus: WILDCAMMAP_MARKERS_STATUS.FETCHING,
      wccAssignmentsStatusDetails: null,
    });
    
    superagent.get(url)
    .then(response => {
      if (!response) { throw 'ERROR (wildcam-map/MapControls.selectSubjectsForAssignment()): No response'; }
      if (response.ok && response.body && response.body.rows) {
        return response.body.rows;
      }
      throw 'ERROR (wildcam-map/MapControls.selectSubjectsForAssignment()): invalid response';
    })
    .then(data => {
      const copyOfFilters = JSON.parse(JSON.stringify(this.props.filters));
      const copyOfSubjects = data;

      Actions.wildcamMap.setWccWcmSelectedFilters(copyOfFilters);
      Actions.wildcamMap.setWccWcmSelectedSubjects(copyOfSubjects);
      
      this.setState({ wccAssignmentsStatus: WILDCAMMAP_MARKERS_STATUS.SUCCESS });

      //Transition to: Assignment creation
      this.props.history.push(this.props.wccwcmAssignmentPath);
      
    })
    .catch(err => {
      this.setState({
        wccAssignmentsStatus: WILDCAMMAP_MARKERS_STATUS.ERROR,
        wccAssignmentsStatusDetails: err,
      });
      console.error(err);
    });
  }
}

MapControls.propTypes = {
  mapConfig: PropTypes.object,
  // ----------------
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  ...WILDCAMMAP_PROPTYPES,
};
MapControls.defaultProps = {
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

export default connect(mapStateToProps)(MapControls);
