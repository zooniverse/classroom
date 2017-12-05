import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import DarienHome from '../../components/darien/DarienHome';
import DarienEducators from '../../components/darien/DarienEducators';
import DarienMap from '../../components/darien/DarienMap';

export default class DarienRoutesContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/`} component={DarienHome} />
        <Route path={`${this.props.match.url}/educators`} component={DarienEducators} />
        <Route path={`${this.props.match.url}/map`} component={DarienMap} />
      </Switch>
    );
  }
}
