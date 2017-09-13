import React from 'react';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';

export default function NeedHelp() {
  return (
    <Section className="home__section" align="center" colorIndex="accent-2">
      <Paragraph className="section__paragraph" align="center">
        Need help? Have questions?<br />
        Check out the <Anchor href="https://www.zooniverse.org/talk/16">Education Talk Board</Anchor> or <Anchor href="mailto:collab@zooniverse.org">email us</Anchor>
      </Paragraph>
    </Section>
  );
}
