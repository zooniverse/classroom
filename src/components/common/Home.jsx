import React from 'react';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';

import { Actions } from 'jumpstate';
import { Link } from 'react-router-dom';

// TODO: Look into grommet's path prop for buttons to see if it works with React-Router v4
export default function Home(props) {
  return (
    <Section colorIndex="light-2">
      <Box align="center">
        <Heading>Zooniverse Classrooms</Heading>
        <Paragraph>Classrooms and educational tools built for students, teachers, and explorers of all kinds. Powered by the <Anchor href="https://www.zooniverse.org">Zooniverse.</Anchor></Paragraph>
      </Box>
      <Tiles
        fill={true}
        flush={false}
      >
        {props.programs.map((program) => {
          return (
            <Tile key={program.name}>
              <Card
                thumbnail={`../images/${program.metadata.cardImage}`}
                heading={program.name}
                description={program.description}
                link={
                  <Link to="/astro-101-with-galaxy-zoo/educators/" onClick={() => { Actions.getProgram({ programs: props.programs, param: 'astro-101-with-galaxy-zoo' }); }}>Enter</Link>
                }
              />
            </Tile>
          );
        })}
      </Tiles>
    </Section>
  );
};
