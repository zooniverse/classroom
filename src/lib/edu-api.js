import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';
import { config } from './config';

superagentJsonapify(superagent);

export function get(endpoint) {
  return superagent.get(`${config.root}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .then(response => response);
}

window.eduAPI = superagent;
