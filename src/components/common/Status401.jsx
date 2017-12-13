import React from 'react';
import PropTypes from 'prop-types';
import GenericStatusPage from './GenericStatusPage';

function Status401(props) {
  return (
    <GenericStatusPage status="warning" message="Please login to view this page." />
  );
};

export default Status401;
