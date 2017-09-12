import React from 'react';
import MapExplorer from '../../containers/maps/MapExplorer';
import { connect } from 'react-redux';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';

import ProgramHome from '../common/ProgramHome';
import mapConfig from '../../lib/wildcam-darien.mapConfig.js';

class DarienHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ProgramHome>
        <Section
          className="home__section"
          align="center"
          colorIndex="accent-3"
          direction="column"
          margin={{ vertical: 'none', horizontal: 'none' }}
          pad={{ vertical: 'none', horizontal: 'none' }}
          justify="center"
        >
          <Anchor path="/wildcam-darien/eduactors" label="Educator" />
          <Anchor path="/wildcam-darien/students/" label="Students" />
        </Section>
      </ProgramHome>
    );
  }
}

DarienHome.propTypes = {};
DarienHome.defaultProps = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(DarienHome);
