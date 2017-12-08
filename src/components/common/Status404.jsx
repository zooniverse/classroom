import React from 'react';
import PropTypes from 'prop-types';
import GenericStatusPage from './GenericStatusPage';

function Darien404(props) {
  return (
    <GenericStatusPage status="warning" message="Page not found." />
  );
};

export default Darien404;
