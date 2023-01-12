import { State, Effect, Actions } from 'jumpstate';
import oauth from 'panoptes-client/lib/oauth';
import { config } from '../lib/config';

// Constants
const AUTH_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Helper functions
const computeRedirectURL = () => config.origin;

function handleError(error) {
  Actions.auth.setStatus(AUTH_STATUS.ERROR);
  Actions.auth.setError(error);
  Actions.notification.setNotification({ status: 'critical', message: `Something went wrong: ${(error && error.toString())}` });
  console.error(error);
}

// Synchronous Actions
const toggleOauthModal = (state) => ({ ...state, showOauthModal: !state.showOauthModal });

const setLoginUser = (state, user) => ({ ...state, initialised: true, user });

const setAdminUser = (state, isAdmin) => ({ ...state, admin: isAdmin });

const setStatus = (state, status) => ({ ...state, status });

const setError = (state, error) => ({ ...state, error });

// Effects are for async actions and get automatically to the global Actions list
Effect('checkLoginUser', () => {
  Actions.auth.setStatus(AUTH_STATUS.FETCHING);

  oauth.checkCurrent()
    .then((user) => {
      Actions.auth.setLoginUser(user);
      Actions.auth.setStatus(AUTH_STATUS.SUCCESS);
    }).catch((error) => {
      handleError(error);
    });
});

Effect('loginToPanoptes', () => {
  // Returns a login page URL for the user to navigate to.
  oauth.signIn(computeRedirectURL())
    .catch((error) => {
      handleError(error);
    });
});

Effect('logoutFromPanoptes', () => {
  Actions.auth.setStatus(AUTH_STATUS.FETCHING);
  oauth.signOut()
    .then((user) => {
      Actions.auth.setLoginUser(user);
      Actions.auth.setStatus(AUTH_STATUS.SUCCESS);
    }).catch((error) => {
      handleError(error);
    });
});

const auth = State('auth', {
  // Initial State
  initial: {
    admin: false,
    error: null,
    initialised: false,
    showOauthModal: false,
    status: AUTH_STATUS.IDLE,
    user: null
  },
  // Actions
  setAdminUser,
  setError,
  setLoginUser,
  setStatus,
  toggleOauthModal
});

export default auth;
