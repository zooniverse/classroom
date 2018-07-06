import React from 'react';
import PropTypes from 'prop-types';

import GorongosaNavi from '../../common/GorongosaNavi';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function GorongosaEducatorsInfo(props) {
  return (
    <Box>
      <GorongosaNavi />
      <Hero
        className="program-home__hero"
        background={<Image src="https://placeimg.com/1000/200/nature/any" fit="cover" />}
        backgroundColorIndex="dark"
        size="small"
      >
        <Box align="center"><Heading className="program-home__header">Welcome to WildCam Gorongosa Labs</Heading></Box>
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
            WildCam Gorongosa Labs is an educational resource that lets you and your classroom explore trail camera data using an interactive map.
            As an Educator, you can create and manage Classrooms of students and monitor their progress as they submit classifications to the project.
          </Paragraph>
          <Box direction="row">
            <Paragraph>
              To begin, you'll need to create a Classroom and invite your students to join the Classroom.
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-gorongosa-lab/educators" label="Manage Classrooms"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              Once you've invited students to your Classroom, you can guide them in exploring the scientific research data by asking them to submit their own classifications in the WildCam Gorongosa project.
              Our Classrooms Guide provides information and advice on how Educators can direct such activities. 
            </Paragraph>
            <Box pad="small">
              <Button  type="button" className="button--secondary" path="/wildcam-gorongosa-lab/educators/this-page-doesnt-exist-yet" label="Classrooms Guide"></Button>
            </Box>
          </Box>
          <Box direction="row">
            <Paragraph>
              You can learn more about the science behind WildCam Gorongosa's research by exploring our resource pages.
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

GorongosaEducatorsInfo.defaultProps = {};

GorongosaEducatorsInfo.propTypes = {};

export default GorongosaEducatorsInfo;
