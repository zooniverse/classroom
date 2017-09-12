import React from 'react';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';

const ProgramHome = (props) => {
  return (
    <Article className="home" colorIndex="accent-3">
      {props.children}
      <Section className="home__section" align="center" colorIndex="accent-2">
        <Paragraph className="section__paragraph" align="center">
          Need help? Have questions?<br />
          Check out the <Anchor href="https://www.zooniverse.org/talk/16">Education Talk Board</Anchor> or <Anchor href="mailto:collab@zooniverse.org">email us</Anchor>
        </Paragraph>
      </Section>
    </Article>
  );
};

export default ProgramHome;
