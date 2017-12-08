import React from 'react';
import PropTypes from 'prop-types';
import GenericStatusPage from '../../components/common/GenericStatusPage';

function Darien401(props) {
  return (
    <GenericStatusPage status="warning" message="Please login to view this page." />
  );
};

export default Darien401;
