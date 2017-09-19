import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { ZooniverseLogotype } from 'zooniverse-react-components';
import Article from 'grommet/components/Article';
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
  const description = (selectedProgramExists && props.selectedProgram.description) ? props.selectedProgram.description : '';

  return (
    <ProgramHome>
      <Hero
        className="home__hero"
        background={backgroundImage}
        backgroundColorIndex="dark"
        size={signedIn ? 'medium' : 'large'}
      >
        <ZooniverseLogotype className="hero__zooniverse-logotype" />
        <Box align="center" basis="2/3" justify="between">
          <Section align="center">
            <Box align="center" direction={signedIn ? 'row' : 'column'} size="xxlarge">
              <span className="hero__big-circle"><span className="hero__small-circle" /></span>
              <Heading align="center" tag="h1" className="home__header">{name}</Heading>
            </Box>
            <Box align={signedIn ? 'start' : 'center'} textAlign={signedIn ? 'left' : 'center'} size="xlarge">
              <Paragraph className="home__description" margin="small">
                {description}
              </Paragraph>
            </Box>
          </Section>
          {!signedIn &&
            <Section align="center">
              <Button type="button" className="button" onClick={Actions.auth.toggleOauthModal} label="Sign In" />
            </Section>}
        </Box>
      </Hero>
      {signedIn &&
        <Section
          className="home__section"
          align="center"
          colorIndex="accent-3"
          direction="column"
          margin={{ vertical: 'none', horizontal: 'none' }}
          pad={{ vertical: 'none', horizontal: 'none' }}
          justify="center"
        >
          <Box align="center" direction="row" justify="center">
            <Button href="#" type="button" label="Google Drive" />
            <Paragraph align="start">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </Paragraph>
          </Box>
          <ClassroomsLayout match={props.match} />
        </Section>}
        <NeedHelp />
    </ProgramHome>
  );
};

AstroHome.propTypes = {
  ...PROGRAMS_PROPTYPES,
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string }),
};

AstroHome.defaultProps = {
  ...PROGRAMS_INITIAL_STATE,
  initialised: false,
  user: null,
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
