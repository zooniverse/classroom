import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import apiClient from 'panoptes-client/lib/api-client';
import AdminCheckbox from '../../components/layout/AdminCheckbox';

export class AdminContainer extends React.Component {
  constructor(props) {
    super(props);

    this.setAdminState = this.setAdminState.bind(this);
    this.toggleAdminMode = this.toggleAdminMode.bind(this);
  }
  componentDidMount() {
    const isAdmin = !!localStorage.getItem('adminFlag');
    if (isAdmin) {
      this.setAdminState(isAdmin);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.admin !== this.props.admin) {
      this.setAdminState(nextProps.admin);
    }
  }

  setAdminState(isAdmin) {
    apiClient.update({
      'params.admin': isAdmin || undefined
    });

    if (isAdmin) {
      localStorage.setItem('adminFlag', true);
    } else {
      localStorage.removeItem('adminFlag');
    }

    Actions.auth.setAdminUser(isAdmin);
  }

  toggleAdminMode(e) {
    const isAdmin = e.target.checked;
    this.setAdminState(isAdmin);
  }

  render() {
    if (this.props.initialised && this.props.user && this.props.user.admin) {
      return (<AdminCheckbox user={this.props.user} onChange={this.toggleAdminMode} checked={this.props.admin} />);
    }

    return null;
  }
}

AdminContainer.defaultProps = {
  admin: false,
  initialised: false,
  user: null
};

AdminContainer.propTypes = {
  admin: PropTypes.bool,
  initialised: PropTypes.bool,
  user: PropTypes.shape({
    admin: PropTypes.bool
  })
};

function mapStateToProps(state) {
  return {
    admin: state.auth.admin,
    initialised: state.auth.initialised,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(AdminContainer);
