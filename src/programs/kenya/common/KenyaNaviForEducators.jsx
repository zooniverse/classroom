import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

import ShareIcon from 'grommet/components/icons/base/Share';

function KenyaNavi(props) {
  return (
    <Box
      className="program-navi"
      direction="row"
      pad="small"
    >
      <Anchor className="big link" path={`/wildwatch-kenya-lab`}>Wildwatch Kenya Lab</Anchor>
      <Anchor className="link" path={`/wildwatch-kenya-lab/educators/intro`}>Educator Home</Anchor>
      <Anchor className="link" path={`/wildwatch-kenya-lab/educators`}>Classrooms</Anchor>
      <Anchor className="link" path={`/wildwatch-kenya-lab/educators/map`}>Explore Data</Anchor>
      <Anchor className="link" path={`/wildwatch-kenya-lab/educators/ecology`}>Ecology</Anchor>
      <Anchor className="external link" href="https://www.zooniverse.org/projects/sandiegozooglobal/wildwatch-kenya/talk/4345" target="_blank" rel="noopener noreferrer">Discuss <ShareIcon size="xsmall" /></Anchor>
    </Box>
  );
};

KenyaNavi.defaultProps = {};
KenyaNavi.propTypes = {};

export default KenyaNavi;
