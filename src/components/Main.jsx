import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooHeader, ZooFooter, AdminLayoutIndicator } from 'zooniverse-react-components';
import HomeContainer from '../containers/common/HomeContainer';
import AdminContainer from '../containers/layout/AdminContainer';
import AuthContainer from '../containers/layout/AuthContainer';
import AppNotification from '../containers/layout/AppNotification';
import ProgramHomeContainer from '../containers/common/ProgramHomeContainer';
import AppHeader from './layout/AppHeader';
import {
  removeLocation,
  isRedirectStored,
  getRedirectPathname,
  getRedirectSearch
} from '../lib/redirect-manager';

const Main = ({ admin, location }) => {
  const redirect = isRedirectStored();
  const pathname = getRedirectPathname();
  const search = getRedirectSearch();
  if (redirect && location.pathname !== pathname) {
    removeLocation();

    if (search) {
      return (<Redirect to={{ pathname, search }} />);
    }

    return (<Redirect to={{ pathname }} />);
  }

  return (
    <App centered={false} className="app-layout" inline={true}>
      {admin &&
        <AdminLayoutIndicator />}
      <Box>
        <ZooHeader authContainer={<AuthContainer location={location} />} />
        <AppHeader location={location} />
        <AppNotification />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/:program" component={ProgramHomeContainer} />
        </Switch>
        <ZooFooter adminContainer={<AdminContainer />} />
      </Box>
    </App>
  );
};

Main.defaultProps = {
  admin: false
};

Main.propTypes = {
  admin: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    admin: state.auth.admin
  };
}

export default connect(mapStateToProps)(Main);
