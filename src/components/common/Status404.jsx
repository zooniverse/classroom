import React from 'react';
import PropTypes from 'prop-types';
import GenericStatusPage from './GenericStatusPage';

function Status404(props) {
  return (
    <GenericStatusPage status="warning" message="Page not found." />
  );
};

export default Status404;
