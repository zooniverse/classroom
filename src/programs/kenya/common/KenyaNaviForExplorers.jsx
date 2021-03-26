import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

function KenyaNavi(props) {
  return (
    <Box
      className="program-navi"
      direction="row"
      pad="small"
    >
      <Anchor className="big link" path={`/wildwatch-kenya-lab`}>Wildwatch Kenya Lab</Anchor>
      <Anchor className="link" path={`/wildwatch-kenya-lab/explorers/map`}>Explore Data</Anchor>
      <Anchor className="link" path={`/wildwatch-kenya-lab/explorers/ecology`}>Ecology</Anchor>
    </Box>
  );
};

KenyaNavi.defaultProps = {};
KenyaNavi.propTypes = {};

export default KenyaNavi;
