import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';
import { config } from './config';

superagentJsonapify(superagent);

export function get(endpoint, query) {
  const request = superagent.get(`${config.root}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization);
  if (query && query.length > 0) {
    query.forEach((obj) => {
      if (typeof obj === 'object') request.query(obj);
    });
  }
  return request.then(response => response);
}

export function post(endpoint, data) {
  return superagent.post(`${config.root}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .send(data)
    .then(response => response);
}

export function put(endpoint, data) {
  return superagent.put(`${config.root}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .send({ data: { attributes: data } })
    .then(response => response);
}

export function httpDelete(endpoint) {
  return superagent.delete(`${config.root}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization)
    .then(response => response);
}

window.eduAPI = superagent;
