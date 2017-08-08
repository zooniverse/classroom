import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';
import { config } from './config';

superagentJsonapify(superagent);

export const defaultHeaders = {
  'Content-Type': 'application/json',
  // 'Accept': 'application/vnd.api+json',
  'Authorization': apiClient.headers.Authorization,
};

export function get(endpoint) {
  console.log('config.root', config.root)
  return fetch(`${config.root}teachers/classrooms/`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      'Authorization': apiClient.headers.Authorization,
      'Content-Type': 'application/json'
    })
  }).then(response => response.json());
  // return superagent.get(`${config.root}${endpoint}`)
  //   .withCredentials()
  //   .set(defaultHeaders)
  //   .then(response => response);
}

window.eduAPI = superagent;
