import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooHeader, ZooFooter, AdminLayoutIndicator } from 'zooniverse-react-components';
import HomeContainer from '../containers/common/HomeContainer';
import AdminContainer from '../containers/layout/AdminContainer';
import AuthContainer from '../containers/layout/AuthContainer';
import AppNotification from '../containers/layout/AppNotification';
import ProgramHomeContainer from '../containers/common/ProgramHomeContainer';
import JoinPageContainer from '../containers/common/JoinPageContainer';
import GenericStatusPage from './common/GenericStatusPage';
import GlobalNotification from './GlobalNotification';
import GooglePrivacyPolicy from './GooglePrivacyPolicy';

import AppHeader from './layout/AppHeader';
import {
  removeLocation,
  isRedirectStored,
  getRedirectPathname,
  getRedirectSearch
} from '../lib/redirect-manager';

const Main = ({ admin, initialised, location }) => {
  const redirect = isRedirectStored();
  const pathname = getRedirectPathname();
  const search = getRedirectSearch();
  if (!initialised) {
    Actions.checkLoginUser();
    return (<GenericStatusPage status="fetching" message="Loading" />)
  }

  if (redirect && location.pathname !== pathname && initialised) {
    removeLocation();

    if (search) {
      return (<Redirect to={{ pathname, search }} />);
    }

    return (<Redirect to={{ pathname }} />);
  }

  return (
    <App centered={false} className="app-layout">
      {admin &&
        <AdminLayoutIndicator />}
      <Box>
        <ZooHeader authContainer={<AuthContainer location={location} />} isAdmin={admin} />
        <GlobalNotification />
        <AppHeader location={location} />
        <AppNotification />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/google-privacy-policy" component={GooglePrivacyPolicy} />
          <Route exact path="/:program/students/classrooms/:classroomId/join" component={JoinPageContainer} />
          <Route path="/:program" component={ProgramHomeContainer} />
        </Switch>
        <ZooFooter adminContainer={<AdminContainer />} />
      </Box>
    </App>
  );
};

Main.defaultProps = {
  admin: false,
  initialised: false
};

Main.propTypes = {
  admin: PropTypes.bool,
  initialised: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    admin: state.auth.admin,
    initialised: state.auth.initialised
  };
}

export default connect(mapStateToProps)(Main);
