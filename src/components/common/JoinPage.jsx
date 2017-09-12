import React from 'react';
import { Actions } from 'jumpstate';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Paragraph from 'grommet/components/Paragraph';
import Headline from 'grommet/components/Headline';
import Status from 'grommet/components/icons/Status';

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
        className="join-page"
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
        className="join-page"
      >
        <Paragraph size="large">You need to sign in to join a classroom.</Paragraph>
        <LoginButton className="join-page__login-button" login={Actions.loginToPanoptes} plain={false} />
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
        className="join-page"
      >

        {(props.programsStatus === PROGRAMS_STATUS.FETCHING || props.classroomsStatus === CLASSROOMS_STATUS.JOINING) &&
          <Headline align="center" size="medium" strong={true}>
            <Spinning size="large" />{' '}
            Joining classroom...
          </Headline>}

        {(props.programsStatus === PROGRAMS_STATUS.ERROR || props.classroomsStatus == CLASSROOMS_STATUS.ERROR) &&
          <Box>
            <Headline align="center" size="medium" strong={true}><Status value="critical" size="large" /> Error</Headline>
            <Paragraph align="center">
            Could not join Classroom. You might have already joined the classroom, or the classroom may no longer exist, or the join URL may be incorrect.
            </Paragraph>
          </Box>
        }
        {(props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS) &&
          <Box>
            <Headline align="center" size="medium" strong={true}><Status value="success" size="large" />Joined classroom</Headline>
            {props.selectedProgram.metadata.redirect &&
              <Paragraph align="center">Redirecting to activity...</Paragraph>}
          </Box>}
      </Box>
    );
  }
};

export default JoinPage;
