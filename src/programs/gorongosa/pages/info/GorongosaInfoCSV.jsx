import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function GorongosaInfoCSV(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Description of WildCam Lab Data</Heading>
        <Paragraph>The spreadsheets that you can download from WildCam Lab include data about every photo in the WildCam Lab database. Each row represents a species in a unique photo. For example, if one photo shows only warthogs, there will be only one row of data for that photo. If another photo shows some warthogs and some impalas, there will be two rows of data for that photo. Each column is a piece of information about that photo. This information is based on the location of the camera, the time and date stamp on the photo, or the animal identifications from the citizen scientists that have been aggregated based on an algorithm. Below, you will find additional information about each column in the spreadsheet.</Paragraph>
        <Paragraph>The files are downloaded in CSV format. If you choose to analyze the data using Excel functionality, it is highly recommended that you save the file in Excel (.xls) format before you analyze the data; otherwise you may lose your work. If you choose to analyze the data using R or another statistical software, CSV format is usually best.</Paragraph>

        <Section>
          ...
        </Section>

      </Box>
    </Box>
  );
};

GorongosaInfoCSV.defaultProps = {};

GorongosaInfoCSV.propTypes = {};

export default GorongosaInfoCSV;
