import React from 'react';
import Section from 'grommet/components/Section';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

import { Actions } from 'jumpstate';
import { Link } from 'react-router-dom';
import { config } from '../lib/config';

import thumbnailAstro from '../images/home-card-intro-to-astro.jpg';
import thumbnailDarien from '../images/home-card-wildcam-darien.jpg';

// TODO: Look into grommet's path prop for buttons to see if it works with React-Router v4
export default function Home() {
  const handleSettingProjectCollection = (projectCollection) => {
    Actions.projects.setProjectCollection(projectCollection);
  };

  return (
    <Section colorIndex="light-2">
      <Tiles
        fill={true}
        flush={false}
      >
        <Tile>
          <Card
            thumbnail={thumbnailAstro}
            heading="Introduction to Astronomy"
            description="Classroom tools for teaching Astronomy."
            link={
              <Anchor path="/astro" onClick={handleSettingProjectCollection.bind(null, config.astroProjects)}>Enter</Anchor>
            }
          />
        </Tile>
        <Tile>
          <Card
            thumbnail={thumbnailDarien}
            heading="WildCam Darien Lab"
            description="A map for exploring camera trap data from the WildCam Darien project."
            link={
              <Anchor path="/darien" onClick={handleSettingProjectCollection.bind(null, [])}>Enter</Anchor>
            }
          />
        </Tile>
      </Tiles>
    </Section>
  );
};
