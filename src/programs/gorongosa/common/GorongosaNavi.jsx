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
      <Anchor className="big link" path={`/wildcam-gorongosa-lab`}>WildCam Gorongosa Labs</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators/intro`}>Intro</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators`}>Classrooms</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators/ecology`}>Ecology</Anchor>
      <Anchor className="external link" href="https://www.wildcamgorongosa.org/" target="_blank" rel="noopener noreferrer">Zooniverse <ShareIcon size="xsmall" /></Anchor>
    </Box>
  );
};

GorongosaNavi.defaultProps = {};
GorongosaNavi.propTypes = {};

export default GorongosaNavi;
