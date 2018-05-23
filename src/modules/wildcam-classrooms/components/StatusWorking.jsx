/*
StatusWorking
-------------

Simple message box indicating that data is still being fetched, or sent, or
processed, or etc, so stop bugging me dammit.

--------------------------------------------------------------------------------
 */

import React from 'react';

import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import SpinningIcon from 'grommet/components/icons/Spinning';

const TEXT = {
  WORKING: 'Working...',
};

const StatusWorking = (props) => {
  return (
    <Box
        align="center"
        alignContent="center"
        className="status-box"
        direction="column"
        pad="medium"
      >
      <SpinningIcon />
      <Label>{TEXT.WORKING}</Label>
    </Box>
  );
};

export default StatusWorking;
