import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

import ShareIcon from 'grommet/components/icons/base/Share';

import imgGorongosaSplash from '../../images/lake-urema.jpg';

function GorongosaStudentsIntro(props) {
  return (
    <Box>
      <Hero
        className="program-home__hero"
        background={<Image src={imgGorongosaSplash} fit="cover" />}
        backgroundColorIndex="dark"
        size="small"
      >
        <Box align="center"><Heading className="program-home__header">Welcome to WildCam Gorongosa Lab</Heading></Box>
      </Hero>
      <Section
        className="program-home__section"
        align="center"
        colorIndex="accent-3"
        direction="column"
        justify="center"
      >
        <Box>
          <Paragraph>
            WildCam Gorongosa Lab is a tool for you to explore the trail camera data collected in Gorongosa National Park, or to generate your own data through an assignment you have been given by your instructor.
          </Paragraph>
          <Box direction="row">
            <Paragraph>
              Begin by exploring the trail camera data in an interactive map. You can also filter and download the data here.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-gorongosa-lab/students/map" label="Explore Data"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Work on assignments your instructor gives you. In an assignment, you identify a set of photos and download your own data to analyze it.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-gorongosa-lab/students" label="View Assignments"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              You can learn more about the Gorongosa ecosystem here.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button type="button" className="button--secondary" path="/wildcam-gorongosa-lab/students/ecology" label="Explore Ecology"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Read the Gorongosa blog for updates from the scientists.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button type="button" className="button--secondary" href="https://blog.wildcamgorongosa.org/" label="View Blog " rel="noopener noreferrer" icon={<ShareIcon size="small" />} reverse={true}></Button>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};

GorongosaStudentsIntro.defaultProps = {};

GorongosaStudentsIntro.propTypes = {};

export default GorongosaStudentsIntro;
