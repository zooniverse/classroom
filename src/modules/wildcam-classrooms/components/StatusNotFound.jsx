/*
StatusNotFound
--------------

Simple message box indicating that a resource (classroom or assignment) was not
found.

--------------------------------------------------------------------------------
 */

import React from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';

import { TEXT } from '../text.js';

import StatusIcon from 'grommet/components/icons/Status';

const StatusNotFound = (props) => {
  return (
    <Box
        align="center"
        alignContent="center"
        className="status-box"
        direction="column"
        pad="medium"
      >
      <StatusIcon value="critical" />
      <Label>{TEXT.STATUS.ERRORS.NOT_FOUND}</Label>
    </Box>
  );
};

export default StatusNotFound;
