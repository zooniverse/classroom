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
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators/intro`}>Educator Home</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators`}>Classrooms</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators/map`}>Explore Data</Anchor>
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators/ecology`}>Ecology</Anchor>
      {/*<Anchor className="link" path={`/wildcam-gorongosa-lab/educators/data-guide`}>Data Guide</Anchor>*/}
      <Anchor className="link" path={`/wildcam-gorongosa-lab/educators/resources`}>Resources</Anchor>
      <Anchor className="external link" href="https://blog.wildcamgorongosa.org/" target="_blank" rel="noopener noreferrer">Blog <ShareIcon size="xsmall" /></Anchor>
      <Anchor className="external link" href="https://www.zooniverse.org/projects/zooniverse/wildcam-gorongosa/talk/81" target="_blank" rel="noopener noreferrer">Discuss <ShareIcon size="xsmall" /></Anchor>
    </Box>
  );
};

GorongosaNavi.defaultProps = {};
GorongosaNavi.propTypes = {};

export default GorongosaNavi;
