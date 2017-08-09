import React from 'react';
import PropTypes from 'prop-types';
import ClassroomManagerContainer from '../../containers/common/ClassroomManagerContainer';

export default function AstroClassroomManager(props) {
  const classroomInstructions = 'Share the classroom\'s unique join URL with your students to keep track of their progress as they work through each assignment. Share the URL under View Project with your students for them to complete the assignemnt.';
  return (
    <ClassroomManagerContainer
      classroomInstructions={classroomInstructions}
    />
  );
};
