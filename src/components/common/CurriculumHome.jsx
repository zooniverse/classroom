import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { ZooniverseLogotype } from 'zooniverse-react-components';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';

const CurriculumHome = (props) => {
  const signedIn = (props.user && props.initialised);

  return (
    <Article className="home" colorIndex="accent-3">
      <Hero
        className="home__hero"
        background={props.backgroundImage}
        backgroundColorIndex="dark"
        size={signedIn ? 'medium' : 'large'}
      >
        <ZooniverseLogotype className="hero__zooniverse-logotype" />
        <Box align="center" basis="2/3" justify="between">
          <Section align="center">
            <Box align="center" direction={signedIn ? 'row' : 'column'} size="xxlarge">
              <span className="hero__big-circle"><span className="hero__small-circle" /></span>
              <Heading align="center" tag="h1" className="home__header">{props.curriculumTitle}</Heading>
            </Box>
            <Box align={signedIn ? 'start' : 'center'} textAlign={signedIn ? 'left' : 'center'} size="xlarge">
              <Paragraph className="home__description" margin="small">
                {props.curriculumDescription}
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
        props.children}
      <Section className="home__section" align="center" colorIndex="accent-2">
        <Paragraph className="section__paragraph" align="center">
          Need help? Have questions?<br />
          Check out the <Anchor href="https://www.zooniverse.org/talk/16">Education Talk Board</Anchor> or <Anchor href="mailto:collab@zooniverse.org">email us</Anchor>
        </Paragraph>
      </Section>
    </Article>
  );
};

CurriculumHome.propTypes = {
  backgroundImage: PropTypes.node,
  curriculumDescription: PropTypes.string,
  curriculumTitle: React.PropTypes.string,
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string })
};

CurriculumHome.defaultProps = {
  initialised: false,
  user: null
};

function mapStateToProps(state) {
  return {
    initialised: state.auth.initialised,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(CurriculumHome);
