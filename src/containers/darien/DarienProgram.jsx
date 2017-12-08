/*
Darien Program
--------------
This container is the "main parent" that oversees/organises the rest of the
components used by WildCam Darien Lab.

Currently, it has two concerns:
- Only allow non-logged-in users access to certain parts of the Lab.
- Route Teachers and Students to their correct components.

 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import DarienHome from '../../components/darien/DarienHome';
import DarienEducators from '../../components/darien/DarienEducators';
import DarienMap from '../../components/darien/DarienMap';
import Status401 from '../../components/common/Status401';
import Status404 from '../../components/common/Status404';
import GenericStatusPage from '../../components/common/GenericStatusPage';

function DarienProgram(props) {
  if (!props.initialised) {  //User status unknown: wait.
    return (<GenericStatusPage status="fetching" message="Loading" />);
  } else {

    if (props.user) {  //User logged in: give access to all locations.
      return (
        <Switch>
          <Route exact path={`${props.match.url}/`} component={DarienHome} />
          <Route path={`${props.match.url}/educators`} component={DarienEducators} />
          <Route path={`${props.match.url}/map`} component={DarienMap} />
          <Route path="*" component={Status404} />
        </Switch>
      );
    } else {  //User not logged in: give limited access.
      return (
        <Switch>
          <Route exact path={`${props.match.url}/`} component={DarienHome} />
          <Route path={`${props.match.url}/educators`} component={Status401} />
          <Route path={`${props.match.url}/map`} component={DarienMap} />
          <Route path="*" component={Status404} />
        </Switch>
      );
    }
  }
}

DarienProgram.propTypes = {
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string }),
};

DarienProgram.defaultProps = {
  initialised: false,
  user: null,
};

function mapStateToProps(state) {
  return {
    initialised: state.auth.initialised,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(DarienProgram);
