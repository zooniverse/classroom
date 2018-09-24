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
      <Anchor className="link" path={`/wildcam-darien-lab/educators/intro`}>Educator Home</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/educators`}>Classrooms</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/educators/map`}>Map Explorer</Anchor>
      <Anchor className="link" path={`/wildcam-darien-lab/educators/ecology`}>Ecology</Anchor>
      {/*<Anchor className="link" path={`/wildcam-darien-lab/educators/data-guide`}>Data Guide</Anchor>*/}
      <Anchor className="link" path={`/wildcam-darien-lab/educators/resources`}>Resources</Anchor>
      <Anchor className="external link" href="https://blog.wildcamdarien.org/" target="_blank" rel="noopener noreferrer">Blog <ShareIcon size="xsmall" /></Anchor>
      <Anchor className="external link" href="https://www.zooniverse.org/projects/wildcam/wildcam-darien/talk/843" target="_blank" rel="noopener noreferrer">Discuss <ShareIcon size="xsmall" /></Anchor>
    </Box>
  );
};

DarienNavi.defaultProps = {};
DarienNavi.propTypes = {};

export default DarienNavi;
