import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function KenyaInfoCSV(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Description of Wildwatch Kenya Lab Data</Heading>
        <Paragraph>((TODO))</Paragraph>

        <Section>
          <Heading tag="h3">Columns</Heading>
          <Heading tag="h4">((TODO))</Heading>
          <Paragraph>((TODO))</Paragraph>

        </Section>

      </Box>
    </Box>
  );
};

KenyaInfoCSV.defaultProps = {};

KenyaInfoCSV.propTypes = {};

export default KenyaInfoCSV;
