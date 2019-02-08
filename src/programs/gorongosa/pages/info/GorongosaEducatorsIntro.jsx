import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

import imgGorongosaSplash from '../../images/lake-urema.jpg';

function GorongosaEducatorsIntro(props) {
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
            WildCam Gorongosa Lab is an educational resource that lets you and your students explore trail camera data using an interactive map.
            Simply direct your students to explore and download the data, or use classrooms and assignments to guide their experience.
            Classrooms are a way to manage groups of of students, send them assignments, and monitor their progress as they identify animals.
          </Paragraph>
          <Box direction="row">
            <Paragraph>
              To begin, create a classroom and invite your students to join.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-gorongosa-lab/educators" label="Manage Classrooms"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Once you have invited students to your classroom, you can create assignments that allow them to make their own data sets by identifying animals in trail camera photos.
              Our assignments guide provides information on how you can use assignments. 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-gorongosa-lab/educators/assignments-guide" label="Assignments Guide"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Explore a variety of educational resources produced by HHMI BioInteractive to use WildCam Gorongosa Lab in your classroom.
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-gorongosa-lab/educators/resources" label="Explore Resources"></Button>
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
              <Button type="button" className="button--secondary" path="/wildcam-gorongosa-lab/educators/ecology" label="Explore Ecology"></Button>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};

GorongosaEducatorsIntro.defaultProps = {};

GorongosaEducatorsIntro.propTypes = {};

export default GorongosaEducatorsIntro;
