import React from 'react';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import { Actions } from 'jumpstate';
import { Link } from 'react-router-dom';
import { config } from '../lib/config';

// TODO: Look into grommet's path prop for buttons to see if it works with React-Router v4
export default function Home() {
  const handleSettingProjectCollection = (projectCollection) => {
    Actions.projects.setProjectCollection(projectCollection);
  };

  return (
    <Section colorIndex="light-2">
      <Anchor path="/astro" onClick={handleSettingProjectCollection.bind(null, config.astroProjects)}>Introduction to Astronomy</Anchor>
      <Anchor path="/" onClick={handleSettingProjectCollection.bind(null, [])}>Wildcam Darian: Labs</Anchor>
    </Section>
  );
};
