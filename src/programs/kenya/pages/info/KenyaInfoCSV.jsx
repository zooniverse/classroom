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
        <Paragraph>
          The spreadsheets that you can download from WWK Lab include data from a set of photos that have been classified by volunteers. Each row represents a species in a unique photo. For example, if one photo has only warthogs in the photo, there will only be one row of data for that photo. If another photo has some warthogs and some impalas in the photo, there will be two rows of data for that photo. Each column is a piece of information about that photo. This information is based on the location of the camera, the time and date stamp on the photo, or the animal identifications from up to 10 citizen scientists that have been aggregated based on an algorithm. Below, you will find additional information about each column in the spreadsheet.
        </Paragraph>
        <Paragraph>
          The files are downloaded in CSV format. If you choose to analyze the data using Excel functionality, it is highly recommended that you save the file in Excel (.xlsx) format before you analyze the data, otherwise you may lose your work. If you choose to analyze the data using R or another statistical software, CSV format is usually best.
        </Paragraph>

        <Section>
          <Heading tag="h4">Id</Heading>
          <Paragraph>Unique identifier for each individual camera. *This is the same information as in the column “camera”</Paragraph>
          <Heading tag="h4">Latitude</Heading>
          <Paragraph>Latitude for the camera location in decimal degrees</Paragraph>
          <Heading tag="h4">Longitude</Heading>
          <Paragraph>Longitude for the camera location in decimal degrees</Paragraph>
          <Heading tag="h4">Season</Heading>
          <Paragraph>Season that the photo was taken based on the time stamp of the photo (see “date” description above). Rather than seasons, northern Kenya has what is described as the “long rains”  (April-May) and the “short rains” (November) leading to “wet” conditions after the rains or “dry” conditions leading up the rains. However, climate change has caused these rains to be much more inconsistent, unreliable, and unpredictable. </Paragraph>
          <Heading tag="h4">Subject_id </Heading>
          <Paragraph>Unique identifier for each individual photo</Paragraph>
          <Heading tag="h4">Camera</Heading>
          <Paragraph>Unique identifier for each individual camera</Paragraph>
          <Heading tag="h4">Location</Heading>
          <Paragraph>Each image has a unique url. Paste this url into a browser to see the image that this data corresponds to.</Paragraph>
          <Heading tag="h4">Month</Heading>
          <Paragraph>Month that the photo was taken based on the time stamp of the photo (see “date” description above)</Paragraph>
          <Heading tag="h4">Year</Heading>
          <Paragraph>Year that the photo was taken based on the time stamp of the photo (see “date” description above)</Paragraph>
          <Heading tag="h4">Data.choice</Heading>
          <Paragraph>Each photo is identified by up to 10 citizen scientists and the answers are aggregated into the most likely species and numbers of animals (see species_count below). There are 46 options including humans, livestock, and “nothing here”. Many of the large mammal options are individual species, but in some cases the species is actually a group of species (e.g. bird) or the species is not listed due to it not appearing on the cameras frequently. This list does not include many of the smaller organisms, like insects, which cannot be captured on trail cameras.</Paragraph>
          <Heading tag="h4">consensus_count</Heading>
          <Paragraph>This represents the approximate number of a particular species that is identified in a photo. Each photo is identified by up to 10 citizen scientists and the answers are aggregated into the most likely species and how many (see species above). Please note that for large numbers of animals, the number "25" actually corresponds to the range of "11-50" animals, and the number "75" actually corresponds to the range of "50+" animals. While the researchers use ranges, the downloaded CSV uses the mean values to allow you to use species counts in calculations and graphs.</Paragraph>
        </Section>

      </Box>
    </Box>
  );
};

KenyaInfoCSV.defaultProps = {};

KenyaInfoCSV.propTypes = {};

export default KenyaInfoCSV;
