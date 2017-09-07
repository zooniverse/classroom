import React from 'react';
import { Actions } from 'jumpstate';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Paragraph from 'grommet/components/Paragraph';
import Headline from 'grommet/components/Headline';

import LoginButton from '../layout/LoginButton';

import {
  PROGRAMS_STATUS
} from '../../ducks/programs';
import {
  CLASSROOMS_STATUS
} from '../../ducks/classrooms';

const JoinPage = (props) => {
  if (!props.user && !props.initialised) {
    return (
      <Box
        align="center"
        full={true}
        colorIndex="grey-5"
        justify="center"
      >
        <Spinning size="large" />
      </Box>
    );
  }

  if (!props.user && props.initialised) {
    return (
      <Box
        align="center"
        full={true}
        colorIndex="grey-5"
        justify="center"
      >
        <Paragraph size="large">You need to sign in to join a classroom.</Paragraph>
        <LoginButton login={Actions.loginToPanoptes} />
      </Box>
    );
  }

  if (props.user && props.initialised) {
    return (
      <Box
        align="center"
        full={true}
        colorIndex="grey-5"
        justify="center"
      >

        {props.programsStatus === PROGRAMS_STATUS.FETCHING || props.classroomsStatus === CLASSROOMS_STATUS.JOINING &&
          <Headline align="center" size="large" strong={true}>
            <Spinning />
            Joining classroom...
          </Headline>}

        {props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS &&
          <Paragraph>
            <Headline align="center" size="large" strong={true}>Joined classroom successfully.</Headline>
            {props.selectedProgram.metadata.redirect &&
              <span>Redirecting to activity...</span>}
          </Paragraph>}
      </Box>
    );
  }
};

export default JoinPage;
