import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

import imgKenyaSplash from '../../images/kenya-splash-A.jpg';

function KenyaEducatorsIntro(props) {
  return (
    <Box>
      <Hero
        className="program-home__hero"
        background={<Image src={imgKenyaSplash} fit="cover" />}
        backgroundColorIndex="dark"
        size="small"
      >
        <Box align="center"><Heading className="program-home__header">Welcome to Wildwatch Kenya Lab</Heading></Box>
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
            Wildwatch Kenya Lab is an educational resource that lets you and your students explore trail camera data using an interactive map.
            Simply direct your students to explore and download the data, or use classrooms and assignments to guide their experience.
          </Paragraph>
          <Box direction="row">
            <Paragraph>
              Classrooms are a way to manage groups of students, send them assignments, and monitor their progress as they identify animals.
              To begin, create a classroom and invite your students to join.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildwatch-kenya-lab/educators" label="Manage Classrooms"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Once you have invited students to your classroom, you can create assignments that allow them to make their own data sets by identifying animals in trail camera photos.
              Our assignments guide provides information on how you can use assignments. 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildwatch-kenya-lab/educators/assignments-guide" label="Assignments Guide"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              You can learn more about the Wildwatch Kenya project here.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button type="button" className="button--secondary" path="/wildwatch-kenya-lab/educators/project-overview" label="Project Overview"></Button>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};

KenyaEducatorsIntro.defaultProps = {};

KenyaEducatorsIntro.propTypes = {};

export default KenyaEducatorsIntro;
