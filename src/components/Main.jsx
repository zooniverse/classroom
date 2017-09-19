import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
<<<<<<< a375ad121e7e785ab243602f9f097a42ec4eadf7
import { Route, Switch, NavLink } from 'react-router-dom';
=======
import { Route, Switch, Redirect } from 'react-router-dom';
>>>>>>> A sign in modal and cleaned up main zooniverse header
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import { ZooFooter, AdminLayoutIndicator } from 'zooniverse-react-components';
import ZooHeader from './layout/ZooHeader';
import HomeContainer from '../containers/common/HomeContainer';
import AdminContainer from '../containers/layout/AdminContainer';
import AuthContainer from '../containers/layout/AuthContainer';
import AppNotification from '../containers/layout/AppNotification';
import ProgramHomeContainer from '../containers/common/ProgramHomeContainer';
import JoinPageContainer from '../containers/common/JoinPageContainer';
import AppHeader from './layout/AppHeader';
import {
  removeLocation,
  isRedirectStored,
  getRedirectPathname,
  getRedirectSearch,
  redirectErrorHandler
} from '../lib/redirect-manager';

const Main = ({ admin, location }) => {
  const redirect = isRedirectStored();
  const pathname = getRedirectPathname();
  const search = getRedirectSearch();

  if (redirect && location.pathname !== pathname) {
    Promise.resolve(() => {
      if (search) {
        return (<Redirect to={{ pathname, search }} />);
      }

      return (<Redirect to={{ pathname }} />);
    }).then(removeLocation())
    .catch((error) => { redirectErrorHandler(error); });
  }

  return (
    <App centered={false} className="app-layout" inline={true}>
      {admin &&
        <AdminLayoutIndicator />}
      <Box>
        <ZooHeader authContainer={<AuthContainer />} />
        <AppHeader location={location} />
        <AppNotification />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/:program" component={ProgramHomeContainer} />
          <Route path="/:program/students/classrooms/:classroomId/join" component={JoinPageContainer} />
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
