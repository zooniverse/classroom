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

import backgroundImageUrl from '../../images/background.jpg'

import AstroHomeSignedIn from './AstroHomeSignedIn';

const AstroHome = (props) => {
  const signedIn = (props.user && props.initialised);
  const backgroundImage = <Image alt="" src={backgroundImageUrl} fit="cover" align={{ bottom: true }} />;

  return (
    <Article className="home" colorIndex="accent-3">
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
              <Heading align="center" tag="h1" className="home__header">Introduction to Astronomy</Heading>
            </Box>
            <Box align={signedIn ? 'start' : 'center'} textAlign={signedIn ? 'left' : 'center'} size="xlarge">
              <Paragraph className="home__description" margin="small">
                Short description of what this is, what the Zooniverse is, why a professor or institution would be interested in this material.
              </Paragraph>
            </Box>
          </Section>
          {!signedIn &&
            <Section align="center">
              <Button type="button" className="button" onClick={Actions.loginToPanoptes} label="Sign In" />
              <Paragraph align="center">New to Zooniverse? Create Account</Paragraph>
            </Section>}
        </Box>
      </Hero>
      {signedIn &&
        <AstroHomeSignedIn />}
      <Section className="home__section" align="center" colorIndex="accent-2">
        <Paragraph className="section__paragraph" align="center">
          Need help? Have questions?<br />
          Check out the <Anchor href="https://www.zooniverse.org/talk/16">Education Talk Board</Anchor> or <Anchor href="mailto:collab@zooniverse.org">email us</Anchor>
        </Paragraph>
      </Section>
    </Article>
  );
};

AstroHome.propTypes = {
  user: PropTypes.shape({ login: PropTypes.string }),
  initialised: PropTypes.bool
};

AstroHome.defaultProps = {
  user: null,
  initialised: false
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    initialised: state.auth.initialised
  };
}

export default connect(mapStateToProps)(AstroHome);
