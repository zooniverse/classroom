import React from 'react';
import { connect } from 'react-redux';
import { ZooniverseLogotype } from 'zooniverse-react-components';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';

import ProgramHome from '../common/ProgramHome';
import NeedHelp from '../common/NeedHelp';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, PROGRAMS_STATUS
} from '../../ducks/programs';

function ActivitiesForUndergradsHome({
  programsStatus,
  selectedProgram
}) {
  const selectedProgramExists = programsStatus === PROGRAMS_STATUS.SUCCESS && selectedProgram;
  const backgroundImage = (
    selectedProgramExists
    && selectedProgram.metadata
    && selectedProgram.metadata.backgroundImage
  ) ? (
    <Image
      src={`../images/${selectedProgram.metadata.backgroundImage}`}
      alt=""
      fit="cover"
    />
    ) : null;

  const name = (selectedProgramExists && selectedProgram.name) ? selectedProgram.name : '';

  return (
    <ProgramHome>
      <Hero
        className="program-home__hero"
        background={backgroundImage}
        backgroundColorIndex="dark"
        size="large"
      >
        <ZooniverseLogotype />
        <Box
          align="center"
          basis="2/3"
          justify="between"
        >
          <Section align="center">
            <Box
              align="center"
              direction="column"
              size="xxlarge"
            >
              <Heading
                align="center"
                tag="h1"
                className="program-home__header"
              >
                {name}
              </Heading>
            </Box>
            <Box
              align="center"
              textAlign="center"
              size="xlarge"
            >
              <Paragraph
                className="program-home__description"
                margin="small"
              >
                {selectedProgram?.description}
              </Paragraph>
            </Box>
          </Section>
        </Box>
      </Hero>
      <Section
        className="program-home__section"
        colorIndex="grey-5"
        direction="row"
        full="horizontal"
        size={{ height: 'medium' }}
        margin={{ vertical: 'none', horizontal: 'none' }}
        pad={{ vertical: 'large', horizontal: 'large' }}
      >
        <Box
          basis="1/3"
          full="vertical"
          justify="between"
          margin={{ horizontal: 'medium' }}
        >
          <Image
            alt="Floating Forests"
            height="200px"
            src="../../images/floating-forests.png"
          />
          <Button
            className="button--primary"
            href="https://drive.google.com/drive/folders/1WrbAgukXtdUWnyfdIeE_2k8tjY_mFrm6?usp=sharing"
            label="Instructors Guide"
            primary
            rel="noopener noreferrer"
            target="_blank"
            type="button"
          />
        </Box>
        <Box
          full="vertical"
          margin={{ horizontal: 'medium' }}
        >
          <Heading
            tag="h3"
          >
            GEO/BIO/EVS 101 with Floating Forests
          </Heading>
          <Paragraph>
            In this 75-90 minute activity that can be completed in either in-person or online classrooms, students will explore the causes and effects of climate change by participating in
            {' '}
            <Anchor href="https://www.floatingforests.org">
              Floating Forests
            </Anchor>
            . They will interpret graphs to draw conclusions about the relationship between greenhouse gas emissions and temperature, as well as learn about long term trends in Earth’s climate. Students will classify images on the actual Floating Forests before using data gathered by Floating Forests volunteers to introduce Tasmania, Australia as a case study of an ecosystem affected by climate change.
          </Paragraph>
        </Box>
      </Section>
      <Section
        className="program-home__section"
        colorIndex="grey-5"
        direction="row"
        full="horizontal"
        size={{ height: 'medium' }}
        margin={{ vertical: 'none', horizontal: 'none' }}
        pad={{ vertical: 'large', horizontal: 'large' }}
      >
        <Box
          basis="1/3"
          full="vertical"
          justify="between"
          margin={{ horizontal: 'medium' }}
        >
          <Image
            alt="Planet Hunters"
            height="200px"
            src="../../images/planet-hunters-light-curve.png"
          />
          <Button
            className="button--primary"
            href="https://drive.google.com/drive/folders/1tTaDUez9PDPf0guaEzXlEoRGM8tKCDam?usp=sharing"
            label="Instructors Guide"
            primary
            rel="noopener noreferrer"
            target="_blank"
            type="button"
          />
        </Box>
        <Box
          full="vertical"
          margin={{ horizontal: 'medium' }}
        >
          <Heading
            tag="h3"
          >
            ASTRO 101 with Planet Hunters
          </Heading>
          <Paragraph>
            In this 75-90 minute activity that can be completed in either in-person or online classrooms, students will learn about the discovery and characterization of planetary systems outside of our Solar System by participating in
            {' '}
            <Anchor href="https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess">
              Planet Hunters
            </Anchor>
            . They will learn how important planetary properties such as orbital period and size can be approximated from specific features in a transit light curve. Students will interpret data representations derived from the
            {' '}
            <Anchor href="https://exoplanetarchive.ipac.caltech.edu/docs/data.html">
              NASA Exoplanet Archive
            </Anchor>
            {' '}
            to form their own answer to the scientific question, “Is our Solar System unique?”
          </Paragraph>
        </Box>
      </Section>
      <Section
        className="program-home__section"
        colorIndex="grey-5"
        direction="row"
        full="horizontal"
        size={{ height: 'medium' }}
        margin={{ vertical: 'none', horizontal: 'none' }}
        pad={{ vertical: 'large', horizontal: 'large' }}
      >
        <Box
          basis="1/3"
          full="vertical"
          justify="between"
          margin={{ horizontal: 'medium' }}
        >
          <Image
            alt="Planet Four"
            height="200px"
            src="../../images/planet-four.png"
          />
          <Button
            className="button--primary"
            href=""
            label="Instructors Guide"
            primary
            rel="noopener noreferrer"
            target="_blank"
            type="button"
          />
        </Box>
        <Box
          full="vertical"
          margin={{ horizontal: 'medium' }}
        >
          <Heading
            tag="h3"
          >
            ASTRO/GEO 101 with Planet Four
          </Heading>
          <Paragraph>
            Coming August 2022
          </Paragraph>
        </Box>
      </Section>
      <NeedHelp />
    </ProgramHome>
  );
}

ActivitiesForUndergradsHome.propTypes = {
  ...PROGRAMS_PROPTYPES
};

ActivitiesForUndergradsHome.defaultProps = {
  ...PROGRAMS_INITIAL_STATE
};

function mapStateToProps(state) {
  return {
    programsStatus: state.programs.status,
    selectedProgram: state.programs.selectedProgram
  };
}

export default connect(mapStateToProps)(ActivitiesForUndergradsHome);
