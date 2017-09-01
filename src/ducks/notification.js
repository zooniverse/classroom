import { State } from 'jumpstate';
import PropTypes from 'prop-types';

// Initial State and PropTypes - usable in React components.
const NOTIFICATION_INITIAL_STATE = {
  notification: null
};

const NOTIFICATION_PROPTYPES = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.string
  })
};

// Synchonous actions
const setNotification = (state, notification) => {
  return { ...state, notification };
};

const notification = State('notification', {
  // Initial state
  initial: NOTIFICATION_INITIAL_STATE,
  // Actions
  setNotification
});

export default notification;
export {
  NOTIFICATION_INITIAL_STATE,
  NOTIFICATION_PROPTYPES
};
