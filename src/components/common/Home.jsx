import React from 'react';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';

import { Actions } from 'jumpstate';
import { Link } from 'react-router-dom';

import {
  PROGRAMS_INITIAL_STATE,
  PROGRAMS_PROPTYPES,
  PROGRAMS_STATUS,
  programsArray
} from '../../ducks/programs';

// TODO: Look into grommet's path prop for buttons to see if it works with React-Router v4
export default function Home(props) {
  const sortedPrograms = props.programs.length > 0 && props.programs.sort(
    function (programA, programB) {
      const lowercaseProgramA = programA.name.toLowerCase()
      const lowercaseProgramB = programB.name.toLowerCase()
      return lowercaseProgramA.localeCompare(lowercaseProgramB);
    }
  ) 
  return (
    <Section className="home" colorIndex="light-2">
      <Box align="center">
        <Heading>Zooniverse Classrooms</Heading>
        <Paragraph>Classrooms and educational tools built for students, teachers, and explorers of all kinds. Powered by the <Anchor href="https://www.zooniverse.org">Zooniverse.</Anchor></Paragraph>
      </Box>
      <Tiles
        fill={true}
        flush={false}
      >
        {props.programsStatus === PROGRAMS_STATUS.FETCHING &&
          programsArray.map((program) => {
            return (
              <Tile key={program.name}>
                <div className="home__placeholder-card">
                  <Spinning />
                </div>
              </Tile>);
          })}
        {props.programsStatus === PROGRAMS_STATUS.SUCCESS &&
          props.programs.length > 0 &&
          sortedPrograms.map((program) => {
            const programLink = (program.metadata && program.metadata.redirect) ?
              <Anchor href={program.metadata.redirect} label="Visit Lab" /> :
              <Link to={program.slug} onClick={() => { Actions.getProgram({ programs: props.programs, param: program.slug }); }}>Enter</Link>;

            return (
              <Tile key={program.name}>
                <Card
                  thumbnail={`../images/${program.metadata.cardImage}`}
                  heading={program.name}
                  description={program.description}
                  link={programLink}
                />
              </Tile>
            );
          })}
      </Tiles>
      <hr />
      <Box align='center' justify='center'>
        <Image alt='National Science Foundation' src='../../images/nsf.png' size='small' />
        <Paragraph width='large'>This project is made possible in part thanks to a grant from the National Science Foundation.</Paragraph>
      </Box>
    </Section>
  );
}

Home.defaultProps = {
  ...PROGRAMS_INITIAL_STATE
};

Home.propTypes = {
  ...PROGRAMS_PROPTYPES
};

