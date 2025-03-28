import React from 'react';
import { Actions } from 'jumpstate';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Paragraph from 'grommet/components/Paragraph';
import Headline from 'grommet/components/Headline';
import Status from 'grommet/components/icons/Status';

import { LoginButton } from 'zooniverse-react-components';

import {
  PROGRAMS_STATUS, PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
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
        <LoginButton className="join-page__login-button" toggleModal={Actions.auth.toggleOauthModal} plain={false} />
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

        {(props.programsStatus === PROGRAMS_STATUS.ERROR || props.classroomsStatus === CLASSROOMS_STATUS.ERROR) &&
          <Box>
            <Headline align="center" size="medium" strong={true}><Status value="critical" size="large" /> Error</Headline>
            <Paragraph align="center">
            Could not join Classroom. You might have already joined the classroom, or the classroom may no longer exist, or the join URL may be incorrect.
            </Paragraph>
          </Box>
        }
        {(props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS) &&
          <Box>
            <Headline align="center" size="medium" strong={true}><Status value="ok" size="large" /> Joined classroom</Headline>
            {props.selectedProgram && props.selectedProgram.metadata && props.selectedProgram.metadata.redirectOnJoin &&
              <Paragraph align="center">Redirecting to activity...</Paragraph>}
          </Box>}
      </Box>
    );
  }
};

JoinPage.defaultProps = {
  ...PROGRAMS_INITIAL_STATE
};

JoinPage.propTypes = {
  ...PROGRAMS_PROPTYPES
};

export default JoinPage;
