import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Label from 'grommet/components/Label';

import ProgramHome from '../../../components/common/ProgramHome';

import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, PROGRAMS_STATUS
} from '../../../ducks/programs';

function DarienHome(props) {
  const signedIn = (props.user && props.initialised);
  const selectedProgramExists = (props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.selectedProgram);
  const name = (selectedProgramExists && props.selectedProgram.name) ? props.selectedProgram.name : '';

  return (
    <ProgramHome className="darien-home">
      <Hero
        className="program-home__hero"
        background={<Image src="https://placeimg.com/1000/1000/nature/any" fit="cover" />}
        backgroundColorIndex="dark"
        size="medium"
      >
        <Box align="center"><Heading className="program-home__header">{name}</Heading></Box>
      </Hero>
      <Section
        className="program-home__section"
        align="center"
        colorIndex="accent-3"
        direction="column"
        margin={{ vertical: 'none', horizontal: 'none' }}
        pad={{ vertical: 'none', horizontal: 'none' }}
        justify="center"
      >
        <Box align="center" direction="column">
          <Paragraph size="large">Investigate ecological questions by exploring trail camera data using an interactive map. Filter and download data to perform analyses and test hypotheses.</Paragraph>
          <Box align="end" direction="row">
            <Box pad="medium" size="medium">
              <Paragraph>If you are an educator, you can set up private classrooms and invite your students to join. Curate data sets or let your students explore on their own. Guided activities and supporting educational resources are also available. {(signedIn) ? null : '(Sign In required)'}</Paragraph>
              {(signedIn)
                ? <Button type="button" className="button--secondary" path="/wildcam-darien-lab/educators/" label="Educator" />
                : <Button type="button" className="button--secondary" onClick={Actions.auth.toggleOauthModal} label="Sign In" />
              }            
            </Box>

            <Box pad="medium" size="medium">
              <Paragraph> Alternatively, you can simply explore the data. As an explorer, you can view the camera data and study the distribution of animal species across both Darién National Park and Soberanía National Park.</Paragraph>
              <Button type="button" className="button--secondary" path="/wildcam-darien-lab/map/" label="Explorer" />
            </Box>
          </Box>
        </Box>
      </Section>
      {/*
      //WildCam Darien Lab's specific version of <NeedHelp />
      //----------------
      */}
      <Section className="home__section" align="center" colorIndex="accent-2">
        <Paragraph className="section__paragraph" align="center">
          Need help? Have questions?<br />
          Check out the <Anchor href="https://www.zooniverse.org/projects/wildcam/wildcam-darien/talk/843">WildCam Darien Talk Board</Anchor> or <Anchor href="mailto:collab@zooniverse.org">email us</Anchor>
        </Paragraph>
      </Section>
      {/*
      //----------------
      */}
    </ProgramHome>
  );
}

DarienHome.propTypes = {
  ...PROGRAMS_PROPTYPES,
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string })
};

DarienHome.defaultProps = {
  ...PROGRAMS_INITIAL_STATE,
  initialised: false,
  user: null
};

function mapStateToProps(state) {
  return {
    initialised: state.auth.initialised,
    programsStatus: state.programs.status,
    selectedProgram: state.programs.selectedProgram,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(DarienHome);
