import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

function GorongosaInfoResources(props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Heading tag="h2">Educator Resources</Heading>

      <Paragraph>...</Paragraph>

      <Heading tag="h3">WildCam Lab Activities</Heading>

      <Heading tag="h4">...</Heading>
    </Box>
  );
};

GorongosaInfoResources.defaultProps = {};

GorongosaInfoResources.propTypes = {};

export default GorongosaInfoResources;
