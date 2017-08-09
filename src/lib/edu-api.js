import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';
import { config } from './config';

superagentJsonapify(superagent);

export function get(endpoint, query) {
  return superagent.get(`${config.root}${endpoint}?include=assignments`)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .then(response => response.body.data);
}

window.eduAPI = superagent;
