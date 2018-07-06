import React from 'react';
import PropTypes from 'prop-types';

import DarienNavi from '../../common/DarienNavi';

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
      <DarienNavi />
      <Hero
        className="program-home__hero"
        background={<Image src="https://placeimg.com/1000/200/nature/any" fit="cover" />}
        backgroundColorIndex="dark"
        size="small"
      >
        <Box align="center"><Heading className="program-home__header">Welcome to WildCam Darien Labs</Heading></Box>
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
            WildCam Darien Labs is an educational resource that lets you and your classroom explore trail camera data using an interactive map.
            As an Educator, you can create and manage Classrooms of students and monitor their progress as they submit classifications to the project.
          </Paragraph>
          <Box direction="row">
            <Paragraph>
              To begin, you'll need to create a Classroom and invite your students to join the Classroom.
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-darien-lab/educators" label="Manage Classrooms"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Once you've invited students to your Classroom, you can guide them in exploring the scientific research data by asking them to submit their own classifications in the WildCam Darien project.
              Our Classrooms Guide provides information and advice on how Educators can direct such activities. 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-darien-lab/educators/this-page-doesnt-exist-yet" label="Classrooms Guide"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              You can learn more about the science behind WildCam Darien's research by exploring our resource pages.
            </Paragraph>
            <Box pad="small">
              <Button type="button" className="button--secondary" path="/wildcam-darien-lab/educators/ecology" label="Explore Ecology"></Button>
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
