import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooniverseLogo, ZooFooter, AdminLayoutIndicator } from 'zooniverse-react-components';
import AboutLayout from './about';
import ZooHeader from './layout/ZooHeader';
import Home from './Home';
import AdminContainer from '../containers/layout/AdminContainer';
import AuthContainer from '../containers/layout/AuthContainer';
import AppNotification from '../containers/layout/AppNotification';
import AstroHome from './astro/AstroHome';
import DarienHome from './darien/DarienHome';

const Main = ({ admin }) => {
  const mainHeaderNavList = [
    <NavLink className="site-header__link--small" to="/about">About</NavLink>
  ];

  const logoHomeLink =
    (<NavLink className="site-header__link" to='/'>
      <ZooniverseLogo height="1.25em" width="1.25em" />
    </NavLink>);

  return (
    <App centered={false} className="app-layout" inline={true}>
      {admin &&
        <AdminLayoutIndicator />}
      <Box>
        <ZooHeader mainHeaderNavList={mainHeaderNavList} authContainer={<AuthContainer />} logoHomeLink={logoHomeLink} />
        <AppNotification />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={AboutLayout} />
          <Route path="/astro-101-with-galaxy-zoo/educators/" component={AstroHome} />
          <Redirect from="/astro-101-with-galaxy-zoo" to="/astro-101-with-galaxy-zoo/educators/" />
          <Route path="/darien" component={DarienHome} />
        </Switch>
        <ZooFooter adminContainer={<AdminContainer />} />
      </Box>
    </App>
  );
}

Main.defaultProps = {
  admin: false
};

Main.propTypes = {
  admin: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    admin: state.auth.admin
  };
}

export default connect(mapStateToProps)(Main);
