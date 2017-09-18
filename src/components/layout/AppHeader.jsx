import React from 'react';
import Header from 'grommet/components/Header';
import { NavLink } from 'react-router-dom';

const AppHeader = ({ location }) => {
  if (location.pathname !== '/') {
    return (
      <Header size="small" align="center" justify="center" colorIndex="grey-5">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/astro-101-with-galaxy-zoo">Astro 101</NavLink>
        <NavLink to="/wildcam-darien-lab">Wildcam Darien Lab</NavLink>
      </Header>
    );
  }

  return null;
};

export default AppHeader;
