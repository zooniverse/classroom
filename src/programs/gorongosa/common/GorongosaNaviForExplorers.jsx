import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

import ShareIcon from 'grommet/components/icons/base/Share';

function GorongosaNavi(props) {
  return (
    <Box
      className="program-navi"
      direction="row"
      pad="small"
    >
      <Anchor className="big link" path={`/wildcam-gorongosa-lab`}>WildCam Gorongosa Lab</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/explorers/map`}>Explore Data</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/explorers/ecology`}>Ecology</Anchor>
      {/*<Anchor className="link" path={`/wildcam-gorongosa-lab/explorers/data-guide`}>Data Guide</Anchor>*/}
      <Anchor className="external link" href="https://blog.wildcamgorongosa.org/" target="_blank" rel="noopener noreferrer">Blog <ShareIcon size="xsmall" /></Anchor>
    </Box>
  );
};

GorongosaNavi.defaultProps = {};
GorongosaNavi.propTypes = {};

export default GorongosaNavi;
