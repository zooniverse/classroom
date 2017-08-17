import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import oauth from 'panoptes-client/lib/oauth';
import apiClient from 'panoptes-client/lib/api-client';

import Main from './components/Main';
import { config } from './lib/config';
import configureStore from './store';

import './styles/main.styl';

const store = configureStore();

// TODO: Make app ID dynamic between env
oauth.init(config.panoptesAppId)
  .then(() => {
    ReactDOM.render((
      <Provider store={store}>
        <Router>
          <Route path="/" component={Main} />
        </Router>
      </Provider>),
      document.getElementById('root'),
    );
  });

window.zooAPI = apiClient;
