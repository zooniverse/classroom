import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { ZooniverseLogotype } from 'zooniverse-react-components';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';

import ProgramHome from '../common/ProgramHome';
import NeedHelp from '../common/NeedHelp';
import ClassroomsLayout from '../../components/classrooms/ClassroomsLayout';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, PROGRAMS_STATUS
} from '../../ducks/programs';

const AstroHome = (props) => {
  const signedIn = (props.user && props.initialised);
  const selectedProgramExists = (props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.selectedProgram);
  const backgroundImage = (selectedProgramExists &&
    props.selectedProgram.metadata &&
    props.selectedProgram.metadata.backgroundImage) ?
      <Image src={`../images/${props.selectedProgram.metadata.backgroundImage}`} alt="" fit="cover" align={{ bottom: true }} /> :
      null;

  const name = (selectedProgramExists && props.selectedProgram.name) ? props.selectedProgram.name : '';
  const classroomInstructions = 'Before your term begins, students will set up a Zooniverse account and you will create a classroom to share the classroom\'s unique URLs for students to join and to keep track of their progress as they work through each assignment. It is recommended to remind students that they must be logged in to their Zooniverse accounts to be able to use the link.';

  return (
    <ProgramHome className="astro-home">
      <Hero
        className="program-home__hero"
        background={backgroundImage}
        backgroundColorIndex="dark"
        size={signedIn ? 'medium' : 'large'}
      >
        <ZooniverseLogotype className="hero__zooniverse-logotype" />
        <Box align="center" basis="2/3" justify="between">
          <Section align="center">
            <Box align="center" direction={signedIn ? 'row' : 'column'} size="xxlarge">
              <span className="hero__big-circle"><span className="hero__small-circle" /></span>
              <Heading align="center" tag="h1" className="program-home__header">{name}</Heading>
            </Box>
            <Box align={signedIn ? 'start' : 'center'} textAlign={signedIn ? 'left' : 'center'} size="xlarge">
              <Paragraph className="program-home__description" margin="small">
                Tools and curricula for introductory astronomy students to learn common astronomy concepts as well as view, analyze, manipulate and visualize Galaxy Zoo data.
              </Paragraph>
            </Box>
          </Section>
          {!signedIn &&
            <Section align="center">
              <Button type="button" className="button--secondary" onClick={Actions.auth.toggleOauthModal} label="Sign In" />
            </Section>}
        </Box>
      </Hero>
      {signedIn &&
        <Section
          className="program-home__section"
          align="center"
          colorIndex="accent-3"
          direction="column"
          margin={{ vertical: 'none', horizontal: 'none' }}
          pad={{ vertical: 'none', horizontal: 'none' }}
          justify="center"
        >
          <Box className="astro-home__guide" align="center" direction="row" size="xxlarge">
          <Button className="button--secondary" href="https://drive.google.com/drive/folders/1Kr3MxJoPxcwOlJN2FMn-gbjNNneOqX5i" type="button" label="Instructors Guide" target="_blank" rel="noopener noreferrer" />
            <Paragraph align="start">
                Instructors Guide: This provides you with a suggested timeline, lesson plans and student instructions for the class activities that will  guide the students in how to use the tools and the research project where students demonstrate the skills they have learned.
            </Paragraph>
          </Box>
          <ClassroomsLayout match={props.match} classroomInstructions={classroomInstructions} />
        </Section>}
      <NeedHelp />
    </ProgramHome>
  );
};

AstroHome.propTypes = {
  ...PROGRAMS_PROPTYPES,
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string })
};

AstroHome.defaultProps = {
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

export default connect(mapStateToProps)(AstroHome);
