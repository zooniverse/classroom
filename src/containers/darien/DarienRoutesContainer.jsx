import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import DarienHome from '../../components/darien/DarienHome';
import DarienExplorer from '../../components/darien/DarienExplorer';
import ClassroomsLayout from '../../components/classrooms/ClassroomsLayout';

export default class DarienRoutesContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/`} component={DarienHome} />
        <Route path={`${this.props.match.url}/educators`} component={ClassroomsLayout} />
        <Route path={`${this.props.match.url}/students`} component={DarienExplorer} />
      </Switch>
    );
  }
}
