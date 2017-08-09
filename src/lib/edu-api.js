import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';
import { config } from './config';

superagentJsonapify(superagent);

// function formatQuery(query) {
//   const queryArray = [];
//   if (typeof query === 'object') {
//     Object.keys(query).forEach((key) => {
//       const queryString = `${key}=${query[key]}`;
//       queryArray.push(queryString);
//     });

//     return queryArray;
//   }
// }

export function get(endpoint, query) {
  const request = superagent.get(`${config.root}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', apiClient.headers.Authorization);
  if (query && query.length > 0) {
    query.forEach((obj) => {
      if (typeof obj === 'object') request.query(obj);
    });
  }
  return request.then(response => response.body.data);
}

window.eduAPI = superagent;
