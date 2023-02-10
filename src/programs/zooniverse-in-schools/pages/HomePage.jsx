import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Section from 'grommet/components/Section'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'
import Paragraph from 'grommet/components/Paragraph'

import ProgramHome from '../../../components/common/ProgramHome'
import imgZooInSchools from '../../../images/astro-background.jpg'

import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, PROGRAMS_STATUS
} from '../../../ducks/programs'

function HomePage (props) {
  const selectedProgramExists = (props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.selectedProgram)
  const name = (selectedProgramExists && props.selectedProgram.name) ? props.selectedProgram.name : ''

  return (
    <ProgramHome className="zooniverseInSchools-home">
      <Hero
        className="program-home__hero"
        background={<Image src={imgZooInSchools} fit="cover" />}
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
            Welcome to Zooniverse In Schools! Here you'll find everything you need to use Galaxy Zoo with younger audiences.
          </Paragraph>
          <Box align="end" direction="row" justify="center" wrap={true}>
            <Box pad="medium" size="medium">
              <Paragraph>
                Intro Video
              </Paragraph>
              <Button type="button" className="button--secondary" path="/zooniverse-in-schools" label="Coming Soon" />
            </Box>

            <Box pad="medium" size="medium">
              <Paragraph>
                Resources
              </Paragraph>
              <Button type="button" className="button--secondary" path="/zooniverse-in-schools/resources" label="Go" />
            </Box>

            <Box pad="medium" size="medium">
              <Paragraph>
                Educator Page for Zooniverse Classroom ActivityCreate a virtual classroom for activities 2 and 3
              </Paragraph>
              <Button type="button" className="button--secondary" path="/astro-101-with-galaxy-zoo" label="Go" />
            </Box>

            <Box pad="medium" size="medium">
              <Paragraph>
                Go to <b>I'm A Scientist</b> to chat to researchers
              </Paragraph>
              <Button type="button" className="button--secondary" href="https://zooniverse.imascientist.org.uk/" label="Go" />
            </Box>

          </Box>
        </Box>
      </Section>
    </ProgramHome>
  )
}

HomePage.propTypes = {
  ...PROGRAMS_PROPTYPES,
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string })
}

HomePage.defaultProps = {
  ...PROGRAMS_INITIAL_STATE,
  initialised: false,
  user: null
}

function mapStateToProps(state) {
  return {
    initialised: state.auth.initialised,
    programsStatus: state.programs.status,
    selectedProgram: state.programs.selectedProgram,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(HomePage)
