import React from 'react';
import PropTypes from 'prop-types';
//import ClassroomsLayout from '../classrooms/ClassroomsLayout';
import WildCamClassroom from '../../wildcam-classrooms/WildCamClassroom';

function DarienEducators(props) {
  return (
    <WildCamClassroom
      selectedProgram={props.selectedProgram}
    />
  );
};

DarienEducators.defaultProps = {};
DarienEducators.propTypes = {};

export default DarienEducators;
