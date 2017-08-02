import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import Anchor from 'grommet/components/Anchor';
import LoginButton from '../../components/layout/LoginButton';
import LogoutButton from '../../components/layout/LogoutButton';
import RegisterButton from '../../components/layout/RegisterButton';
import RegistrationFormContainer from './RegistrationFormContainer';
import UserMenu from '../../components/layout/UserMenu';

export class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    if (!props.initialised) {
      Actions.checkLoginUser();
    }
  }

  toggleRegistrationForm() {
    Actions.auth.toggleRegistrationForm();
  }

  login() {
    Actions.loginToPanoptes();
  }

  logout() {
    Actions.logoutFromPanoptes();
  }

  render() {
    let userMenuNavItems;
    if (this.props.user && this.props.initialised) {
      const login = this.props.user.login;
      userMenuNavItems = [
        <Anchor href={`https://www.zooniverse.org/users/${login}`}>Profile</Anchor>,
        <Anchor path="/">Home</Anchor>,
        <Anchor href="https://www.zooniverse.org/settings">Settings</Anchor>,
        <Anchor href={`https://www.zooniverse.org/collections/${login}`}>Collections</Anchor>,
        <Anchor href={`https://www.zooniverse.org/favorites/${login}`}>Favorites</Anchor>,
        <LogoutButton logout={this.logout} />
      ];
    }


    return (this.props.user && this.props.initialised)
      ? <UserMenu user={this.props.user} userMenuNavItems={userMenuNavItems} />
      : <div>
          <LoginButton login={this.login} />
          <RegisterButton toggleForm={this.toggleRegistrationForm} />
          {this.props.openRegistrationForm && <RegistrationFormContainer />}
        </div>;
  }
}

AuthContainer.propTypes = {
  user: PropTypes.shape({ login: PropTypes.string }),
  initialised: PropTypes.bool,
  openRegistrationForm: PropTypes.bool
};

AuthContainer.defaultProps = {
  user: null,
  initialised: false,
  openRegistrationForm: false
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  initialised: state.auth.initialised,
  openRegistrationForm: state.auth.openRegistrationForm
});

export default connect(mapStateToProps)(AuthContainer);  // Connects the Component to the Redux Store
