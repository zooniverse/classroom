import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import { TEXT } from '../../../modules/wildcam-classrooms/text.js';
import { ZooTranGetLanguage } from '../../../lib/zooniversal-translator'

import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Label from 'grommet/components/Label';

import ProgramHome from '../../../components/common/ProgramHome';
import imgDarienSplash from '../images/darien-splash-B.jpg';

import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, PROGRAMS_STATUS
} from '../../../ducks/programs';

function DarienHome(props) {
  const signedIn = (props.user && props.initialised);
  const selectedProgramExists = (props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.selectedProgram);
  const name = (selectedProgramExists && props.selectedProgram.name) ? props.selectedProgram.name : '';
  
  const lang = ZooTranGetLanguage();

  return (
    <ProgramHome className="darien-home">
      <Hero
        className="program-home__hero"
        background={<Image src={imgDarienSplash} fit="cover" />}
        backgroundColorIndex="dark"
        size="medium"
      >
        <Box align="center"><Heading className="program-home__header">{name}</Heading></Box>
      </Hero>
      <Section
        className="program-home__section"
        align="center"
        colorIndex="accent-3"
        direction="column"
        margin={{ vertical: 'none', horizontal: 'none' }}
        pad={{ vertical: 'none', horizontal: 'none' }}
        justify="center"
      >
        <Box align="center" direction="column">
          <Paragraph size="large">
            {(lang !== 'es')
              ? 'Investigate ecological questions by exploring trail camera data using an interactive map. Filter and download data to perform analyses and test hypotheses.'
              : 'Investigue las cuestiones ecológicas explorando los datos de la cámara de camino usando un mapa interactivo. Filtra y descarga datos para realizar análisis y probar hipótesis.'
            }
          </Paragraph>
          <Box align="end" direction="row" justify="center" wrap={true}>
            <Box pad="medium" size="medium">
              <Paragraph>
                {(lang !== 'es')
                  ? 'If you are an educator, you can set up private classrooms and invite your students to join. Curate data sets or let your students explore on their own. Guided activities and supporting educational resources are also available.'
                  : 'Si eres un educador, puedes configurar aulas privadas e invitar a tus alumnos a unirse. Cura los conjuntos de datos o deja que tus alumnos lo exploren solos. Actividades dirigidas y recursos educativos de apoyo también están disponibles.'
                }
                {(signedIn) ? null : ` (${TEXT.LABELS.SIGN_IN_REQUIRED}) `}
              </Paragraph>
              {(signedIn)
                ? <Button type="button" className="button--secondary" path="/wildcam-darien-lab/educators/intro" label={TEXT.LABELS.EDUCATOR} />
                : <Button type="button" className="button--secondary" onClick={Actions.auth.toggleOauthModal} label={TEXT.LABELS.EDUCATOR} />
              }            
            </Box>
            
            <Box pad="medium" size="medium">
              <Paragraph>
                {(lang !== 'es')
                  ? 'If you are a student, you can explore and download the trail camera data, and work on assignments you have been given.'
                  : 'Si eres un estudiante, puedes explorar y descargar los datos de la cámara del camino y trabajar en las tareas que te han sido asignadas.'
                }
                {(signedIn) ? null : ` (${TEXT.LABELS.SIGN_IN_REQUIRED}) `}
              </Paragraph>
              {(signedIn)
                ? <Button type="button" className="button--secondary" path="/wildcam-darien-lab/students/intro" label={TEXT.LABELS.STUDENT} />
                : <Button type="button" className="button--secondary" onClick={Actions.auth.toggleOauthModal} label={TEXT.LABELS.EDUCATOR} />
              }            
            </Box>

            <Box pad="medium" size="medium">
              <Paragraph>
                {(lang !== 'es')
                  ? 'If you simply want to explore the data, enter as an explorer. You can use an interactive map to view and analyze the trail camera data from Darién and Soberanía National Parks.'
                  : 'Si simplemente desea explorar los datos, ingrese como explorador. Puede usar un mapa interactivo para ver y analizar los datos de la cámara del sendero de los Parques Nacionales Darién y Soberanía.'
                }
              </Paragraph>
              <Button type="button" className="button--secondary" path="/wildcam-darien-lab/explorers/map/" label={TEXT.LABELS.EXPLORER} />
            </Box>
          </Box>
        </Box>
      </Section>
      {/*
      //WildCam Darien Lab's specific version of <NeedHelp />
      //----------------
      */}
      <Section className="home__section" align="center" colorIndex="accent-2">
        <Paragraph className="section__paragraph" align="center">
          Need help? Have questions?<br />
          Check out the <Anchor href="https://www.zooniverse.org/projects/wildcam/wildcam-darien/talk/843">WildCam Darién Talk Board</Anchor> or <Anchor href="mailto:collab@zooniverse.org">email us</Anchor>
        </Paragraph>
      </Section>
      {/*
      //----------------
      */}
    </ProgramHome>
  );
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
