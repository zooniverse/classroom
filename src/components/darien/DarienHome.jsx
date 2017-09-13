import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';

import ProgramHome from '../common/ProgramHome';
import NeedHelp from '../common/NeedHelp';

import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, PROGRAMS_STATUS
} from '../../ducks/programs';

class DarienHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selectedProgramExists = (this.props.programsStatus === PROGRAMS_STATUS.SUCCESS && this.props.selectedProgram);
    const name = (selectedProgramExists && this.props.selectedProgram.name) ? this.props.selectedProgram.name : '';

    return (
      <ProgramHome>
        <Hero
          className="home__hero"
          background={<Image src="https://placeimg.com/1000/1000/nature/any" fit="cover" />}
          backgroundColorIndex="dark"
          size="medium"
        >
          <Box align="center"><Heading className="home__header">{name}</Heading></Box>
        </Hero>
        <Section
          className="home__section"
          align="center"
          colorIndex="accent-3"
          direction="column"
          margin={{ vertical: 'none', horizontal: 'none' }}
          pad={{ vertical: 'none', horizontal: 'none' }}
          justify="center"
        >
          <Box align="center" direction="column">
            <Paragraph>Investigate ecological questions by exploring trail camera data using an interactive map. Filter and download data to perform analyses and test hypotheses. If you are an educator, you can set up private classrooms and invite your students to join. Curate data sets or let your students explore on their own. Guided activities and supporting educational resources are also available. If you are a student or you simply want to explore the data, click the Explorer button.</Paragraph>
            <Paragraph>Are you an educator or a student/explorer? Make your selection to get started!</Paragraph>
          </Box>
          <Box align="center" direction="row" justify="between" pad="medium" size="medium">
            <Button path="/wildcam-darien-lab/eduactors/" label="Educator" />
            <Button path="/wildcam-darien-lab/students/" label="Explorer" />
          </Box>
        </Section>
        <NeedHelp />
      </ProgramHome>
    );
  }
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
