import React from 'react';
import PropTypes from 'prop-types';
import ClassroomManagerContainer from '../../containers/common/ClassroomManagerContainer';

export default function AstroClassroomManager(props) {
  const classroomInstructions = 'First, make sure your students have set up a Zooniverse account. Then create a classroom and share the classroom\'s unique join URL with your students to keep track of their progress as they work through each assignment. Students must be logged in to their Zooniverse accounts first to be able to use the join link. Share the URL under View Project with your students for them to complete the assignment.';
  return (
    <ClassroomManagerContainer
      classroomInstructions={classroomInstructions}
    />
  );
};
