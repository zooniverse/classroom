import React from 'react';
import Header from 'grommet/components/Header';
import { NavLink } from 'react-router-dom';

const AppHeader = ({ location }) => {
  // We don't want the header to appear on the app home page or the join page
  const locationsToHideOn = location.pathname === '/' || location.pathname.includes('join');
  if (!locationsToHideOn) {
    return (
      <Header size="small" align="center" justify="center" colorIndex="grey-5" separator="bottom">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/astro-101-with-galaxy-zoo">Astro 101</NavLink>
        <NavLink to="/activities-for-undergraduates">Activities for Undergraduates</NavLink>
        <NavLink to="/zooniverse-in-schools">Zooniverse In Schools</NavLink>
        <NavLink to="/wildcam-darien-lab">WildCam Darién Lab</NavLink>
        <NavLink to="/wildcam-gorongosa-lab">WildCam Gorongosa Lab</NavLink>
        <NavLink to="/wildwatch-kenya">Wildwatch Kenya</NavLink>
      </Header>
    );
  }

  return null;
};

export default AppHeader;
