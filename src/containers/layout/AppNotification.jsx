import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import Notification from 'grommet/components/Notification';
import { NOTIFICATION_INITIAL_STATE, NOTIFICATION_PROPTYPES } from '../../ducks/notification';

export class AppNotification extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification && nextProps.notification.message) {
      window.scrollTo(0, 0);
    }
  }

  onClose() {
    Actions.notification.setNotification(NOTIFICATION_INITIAL_STATE.notification);
  }

  render() {
    const status = (this.props.notification && this.props.notification.status) ? this.props.notification.status : 'unknown';
    if (this.props.notification && this.props.notification.message) {
      return (
        <Notification
          closer={true}
          message={this.props.notification.message}
          onClose={this.onClose}
          status={status}
        />
      );
    }

    return null;
  }
}

AppNotification.defaultProps = {
  ...NOTIFICATION_INITIAL_STATE
};

AppNotification.propTypes = {
  ...NOTIFICATION_PROPTYPES
};

function mapStateToProps(state) {
  return {
    notification: state.notification.notification
  };
}

export default connect(mapStateToProps)(AppNotification);
