import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';

function GorongosaInfoEcology(props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Heading tag="h2">Ecology</Heading>
      <Paragraph>...</Paragraph>
      <Image src={null} size="large" caption="" />

      <Heading tag="h3">Geography</Heading>
      <Paragraph>...</Paragraph>
    </Box>
  );
};

GorongosaInfoEcology.defaultProps = {};

GorongosaInfoEcology.propTypes = {};

export default GorongosaInfoEcology;
