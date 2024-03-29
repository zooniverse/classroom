/*
Configuration Settings
----------------------

The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed either by:

* An env query string, e.g. localhost:3998?env=production
  (This changes the Panoptes JS Client does)
* The NODE_ENV environment variable on the system running the app.

 */

const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${envFromShell}`);
}

const baseConfig = {
  development: {
    caesar: 'https://caesar-staging.zooniverse.org',
    google: 'https://apis.google.com/js/client.js',
    googleApiKey: 'AIzaSyDknAC_jN4mCzLD6rhFsWiV1bJQt1BMj9Y',
    googleClientId: '460639483341-77spp98rnt01nhrn0mbimdhh3pi44nhl.apps.googleusercontent.com',
    googleScope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata',
    googleDiscoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    origin: window.location.origin,
    panoptesAppId: '397e9bf4e29e75c0a092261ebe3338d3ef2687f2c5935d55c7ca0f63ecc2dd33',
    root: 'https://education-api-staging.zooniverse.org',
    zooniverse: 'https://master.pfe-preview.zooniverse.org'
  },
  staging: {
    caesar: 'https://caesar-staging.zooniverse.org',
    google: 'https://apis.google.com/js/client.js',
    googleApiKey: 'AIzaSyDknAC_jN4mCzLD6rhFsWiV1bJQt1BMj9Y',
    googleClientId: '460639483341-77spp98rnt01nhrn0mbimdhh3pi44nhl.apps.googleusercontent.com',
    googleScope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata',
    googleDiscoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    origin: `${window.location.origin}/classroom`,
    panoptesAppId: '397e9bf4e29e75c0a092261ebe3338d3ef2687f2c5935d55c7ca0f63ecc2dd33',
    root: 'https://education-api-staging.zooniverse.org',
    zooniverse: 'https://master.pfe-preview.zooniverse.org'
  },
  production: {
    caesar: 'https://caesar.zooniverse.org',
    google: 'https://apis.google.com/js/client.js',
    googleApiKey: 'AIzaSyDknAC_jN4mCzLD6rhFsWiV1bJQt1BMj9Y',
    googleClientId: '460639483341-77spp98rnt01nhrn0mbimdhh3pi44nhl.apps.googleusercontent.com',
    googleScope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata',
    googleDiscoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    origin: window.location.origin,
    panoptesAppId: '47f9799996f91be6d0ee386dbcf044fcb43a37b4d07ac1b0787002111e61a152',
    root: 'https://education-api.zooniverse.org',
    zooniverse: 'https://www.zooniverse.org'
  }
};

const config = baseConfig[env];
export { env, config };

// Try and match the location.search property against a regex. Basically mimics
// the CoffeeScript existential operator, in case we're not in a browser.
function locationMatch(regex) {
  let match;
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}
