import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

import ShareIcon from 'grommet/components/icons/base/Share';

function DarienNavi(props) {
  return (
    <Box
      className="program-navi"
      direction="row"
      pad="small"
    >
      <Anchor className="big link" path={`/wildcam-darien-lab`}>WildCam Darién Lab</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/students`}>Your Assignments</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/students/map`}>Map Explorer</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/students/ecology`}>Ecology</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/students/data-guide`}>Data Guide</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/students/resources`}>Resources</Anchor>
      <Anchor className="external link" href="https://www.hhmi.org/biointeractive/wildcam-darien" target="_blank" rel="noopener noreferrer">HHMI <ShareIcon size="xsmall" /></Anchor>
      <Anchor className="external link" href="https://www.zooniverse.org/projects/wildcam/wildcam-darien" target="_blank" rel="noopener noreferrer">Zooniverse <ShareIcon size="xsmall" /></Anchor>
    </Box>
  );
};

DarienNavi.defaultProps = {};
DarienNavi.propTypes = {};

export default DarienNavi;
