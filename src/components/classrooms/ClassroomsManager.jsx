import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import { Link } from 'react-router-dom';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';
import Layer from 'grommet/components/Layer';

import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';

import ClassroomFormContainer from '../../containers/classrooms/ClassroomFormContainer';
import ClassroomsTableContainer from '../../containers/classrooms/ClassroomsTableContainer';

const ClassroomsManager = (props) => {
  // TODO: Pagination for Classrooms
  return (
    <Box className="classrooms-manager">
      <Box className="classrooms-manager__instructions" align="center" direction="row" justify="between" size="xxlarge">
        <Paragraph align="start" size="small">{props.classroomInstructions}</Paragraph>
        <Button
          className="button--primary"
          type="button"
          primary={true}
          label="Create New Classroom"
          onClick={props.toggleFormVisibility}
        />
      </Box>
      {props.showForm &&
        <Layer closer={true} onClose={props.toggleFormVisibility}>
          <ClassroomFormContainer heading="Create Classroom" submitLabel="Create" />
        </Layer>}
      {(props.classrooms.length === 0 && props.classroomsStatus === CLASSROOMS_STATUS.FETCHING) &&
        <Box align="center"><Spinning /></Box>}
      {props.classrooms.length === 0 && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS &&
        <Paragraph>No classrooms have been created yet.</Paragraph>}
      {props.classrooms.length === 0 && props.classroomsStatus === CLASSROOMS_STATUS.ERROR &&
        <Paragraph>Error: Classrooms could not be loaded.</Paragraph>}
      {(props.classrooms.length > 0 && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS) &&
        <ClassroomsTableContainer match={props.match} />}
    </Box>
  );
};

ClassroomsManager.defaultProps = {
  classroomInstructions: 'First, make sure your students have set up a Zooniverse account. Then create a classroom and share the classroom\'s unique join URL with your students to keep track of their progress as they work through each assignment. Students must be logged in to their Zooniverse accounts first to be able to use the join link. Share the URL under View Project with your students for them to complete the assignment.',
  showForm: false,
  toggleFormVisibility: Actions.classrooms.toggleFormVisibility,
  ...CLASSROOMS_INITIAL_STATE
};

ClassroomsManager.propTypes = {
  classroomInstructions: PropTypes.string,
  showForm: PropTypes.bool,
  toggleFormVisibility: PropTypes.func,
  ...CLASSROOMS_PROPTYPES
};

export default ClassroomsManager;
