/*
StatusBorked
------------

Simple message box indicating that something horribly, terribly wrong.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';

import StatusIcon from 'grommet/components/icons/Status';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

const TEXT = {
  ERROR: 'Error detected.',
};

const StatusBorked = (props) => {
  return (
    <Box
        align="center"
        alignContent="center"
        className="status-box"
        direction="column"
        pad="medium"
      >
      <StatusIcon value="critical" />
      <Label>{TEXT.ERROR}</Label>
      {(props.classroomsStatusDetails && props.classroomsStatusDetails.toString) && (
        <p>{props.classroomsStatusDetails.toString()}</p>
      )}
      {(props.assignmentsStatusDetails && props.assignmentsStatusDetails.toString) && (
        <p>{props.assignmentsStatusDetails.toString()}</p>
      )}
    </Box>
  );
};

StatusBorked.defaultProps = {
  classroomsStatusDetails: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsStatusDetails,
  assignmentsStatusDetails: WILDCAMCLASSROOMS_INITIAL_STATE.assignmentsStatusDetails,
};

StatusBorked.propTypes = {
  classroomsStatusDetails: WILDCAMCLASSROOMS_PROPTYPES.classroomsStatusDetails,
  assignmentsStatusDetails: WILDCAMCLASSROOMS_PROPTYPES.assignmentsStatusDetails,
};

export default StatusBorked;
