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
      <Anchor className="big link" path={`/wildcam-darien-lab`}>WildCam Darien Labs</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/educators/intro`}>Intro</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/educators`}>Classrooms</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/educators/ecology`}>Ecology</Anchor>
      <Anchor className="external link" href="https://www.hhmi.org/biointeractive/wildcam-darien" target="_blank" rel="noopener noreferrer">HHMI <ShareIcon size="xsmall" /></Anchor>
      <Anchor className="external link" href="https://www.zooniverse.org/projects/wildcam/wildcam-darien" target="_blank" rel="noopener noreferrer">Zooniverse <ShareIcon size="xsmall" /></Anchor>
    </Box>
  );
};

DarienNavi.defaultProps = {};
DarienNavi.propTypes = {};

export default DarienNavi;
