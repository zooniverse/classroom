import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function DarienEducatorsInfo(props) {
  return (
    <Box>
      <Hero
        className="program-home__hero"
        background={<Image src="https://placeimg.com/1000/200/nature/any" fit="cover" />}
        backgroundColorIndex="dark"
        size="small"
      >
        <Box align="center"><Heading className="program-home__header">Welcome to WildCam Darién Lab</Heading></Box>
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
            WildCam Darien Labs is an educational resource that lets you and your students explore trail camera data using an interactive map.
            Simply direct your students to explore and download the data as an Explorer, or use classrooms and assignments to guide their experience.
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
              <Button  type="button" className="button--secondary" path="/wildcam-darien-lab/educators" label="Manage Classrooms"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Once you have invited students to your classroom, you can create assignments that allow them to create their own data sets by identifying animals in trail camera photos.
              Our assignments guide provides information on how you use assignments. 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-darien-lab/educators/this-page-doesnt-exist-yet" label="Assignments Guide"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Explore a variety of educational resources produced by HHMI BioInteractive to use WildCam Darién Lab in your classroom.
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-darien-lab/info/resources" label="Explore Resources"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              You can learn more about the Darién and Soberanía ecosystems here.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button type="button" className="button--secondary" path="/wildcam-darien-lab/info/ecology" label="Explore Ecology"></Button>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};

DarienEducatorsInfo.defaultProps = {};

DarienEducatorsInfo.propTypes = {};

export default DarienEducatorsInfo;
