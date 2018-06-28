import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { LogoutButton, SignedInUserNavigation, SignedOutUserNavigation } from 'zooniverse-react-components';
import Anchor from 'grommet/components/Anchor';

import { env } from '../../lib/config';
import { storeLocation, redirectErrorHandler } from '../../lib/redirect-manager';

export class AuthContainer extends React.Component {
  constructor(props) {
    super();

    this.login = this.login.bind(this);
  }

  toggleOauthModal() {
    Actions.auth.toggleOauthModal();
  }

  login() {
    new Promise((resolve, reject) => {
      const location = this.props.location;
      resolve(storeLocation(location.pathname, location.search));
    }).then(
      Actions.loginToPanoptes()
    ).catch((error) => { redirectErrorHandler(error); });
  }

  logout() {
    Actions.logoutFromPanoptes();
  }

  loginWithGoogle() {
    let googleUrl = 'https://panoptes.zooniverse.org/users/auth/google_oauth2';

    if (env === 'development') {
      googleUrl = 'https://panoptes-staging.zooniverse.org/users/auth/google_oauth2';
    }

    Promise.resolve(storeLocation(location.pathname, location.search))
      .then(() => { window.location.href = googleUrl; })
      .catch((error) => { redirectErrorHandler(error); });
  }

  render() {
    let userMenuNavList;
    if (this.props.user && this.props.initialised) {
      const login = this.props.user.login;
      userMenuNavList = [
        <Anchor href={`https://www.zooniverse.org/users/${login}`}>Profile</Anchor>,
        <Anchor href="https://www.zooniverse.org/settings">Settings</Anchor>,
        <Anchor href={`https://www.zooniverse.org/collections/${login}`}>Collections</Anchor>,
        <Anchor href={`https://www.zooniverse.org/favorites/${login}`}>Favorites</Anchor>,
        <LogoutButton logout={this.logout} />
      ];
    }


    return (this.props.user && this.props.initialised) ?
      <SignedInUserNavigation isAdmin={this.props.admin} user={this.props.user} userMenuNavList={userMenuNavList} /> :
      <SignedOutUserNavigation
        login={this.login}
        showOauthModal={this.props.showOauthModal}
        toggleModal={this.toggleOauthModal}
        useOauth={true}
      />;
  }
}

AuthContainer.propTypes = {
  admin: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string }),
  initialised: PropTypes.bool,
  showOauthModal: PropTypes.bool
};

AuthContainer.defaultProps = {
  admin: false,
  user: null,
  initialised: false,
  showOauthModal: false
};

const mapStateToProps = (state) => ({
  admin: state.auth.admin,
  user: state.auth.user,
  initialised: state.auth.initialised,
  showOauthModal: state.auth.showOauthModal
});

export default connect(mapStateToProps)(AuthContainer);  // Connects the Component to the Redux Store
