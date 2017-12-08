import React from 'react';
import PropTypes from 'prop-types';
import ClassroomsLayout from '../classrooms/ClassroomsLayout';

function DarienEducators(props) {
  return (
    <ClassroomsLayout match={props.match} />
  );
};

DarienEducators.defaultProps = {};
DarienEducators.propTypes = {};

export default DarienEducators;
