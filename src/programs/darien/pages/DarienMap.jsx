import React from 'react';
import PropTypes from 'prop-types';
import MapExplorer from '../../../modules/wildcam-map/containers/MapExplorer';
import mapConfig from '../wildcam-darien.map-config.js';

function DarienMap(props) {
  return (
    <MapExplorer
      mapConfig={mapConfig}
      history={props.history}
      location={props.location}
      match={props.match}
    />
  );
};

DarienMap.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  mapConfig: null,
};

DarienMap.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  mapConfig: PropTypes.object,
};

export default DarienMap;
