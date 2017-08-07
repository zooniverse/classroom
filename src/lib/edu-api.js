import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';

superagentJsonapify(superagent);

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.api+json',
  'Authorization': apiClient.headers.Authorization
};

const eduAPI = superagent;

export default eduAPI;
window.eduAPI = eduAPI;
