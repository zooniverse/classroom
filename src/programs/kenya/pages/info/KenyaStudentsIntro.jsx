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

import imgKenyaSplash from '../../images/kenya-splash-A.jpg';

function KenyaStudentsIntro(props) {
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
            Wildwatch Kenya Lab is a tool for you to explore the trail camera data, or to generate your own data through an assignment you have been given by your instructor.
          </Paragraph>
          <Box direction="row">
            <Paragraph>
              Begin by exploring the trail camera data in an interactive map. You can also filter and download the data here.
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildwatch-kenya-lab/students/map" label="Explore Data"></Button>
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
              <Button  type="button" className="button--secondary" path="/wildwatch-kenya-lab/students" label="View Assignments"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              ((TODO))
            </Paragraph>
            <Box pad="small">
              <Button type="button" className="button--secondary" path="/wildwatch-kenya-lab/students/ecology" label="Explore Ecology"></Button>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};

KenyaStudentsIntro.defaultProps = {};

KenyaStudentsIntro.propTypes = {};

export default KenyaStudentsIntro;
