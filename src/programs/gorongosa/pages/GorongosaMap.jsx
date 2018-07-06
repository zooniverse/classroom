import React from 'react';
import PropTypes from 'prop-types';
import MapExplorer from '../../../modules/wildcam-map/containers/MapExplorer';
import mapConfig from '../wildcam-gorongosa.map-config.js';

function GorongosaMap(props) {
  return (
    <MapExplorer
      mapConfig={mapConfig}
      history={props.history}
      location={props.location}
      match={props.match}
    />
  );
};

GorongosaMap.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  mapConfig: null,
};

GorongosaMap.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  mapConfig: PropTypes.object,
};

export default GorongosaMap;
