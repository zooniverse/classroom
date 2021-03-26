import React from 'react';
import PropTypes from 'prop-types';
import MapExplorer from '../../../modules/wildcam-map/containers/MapExplorer';
import mapConfig from '../wildwatch-kenya.map-config.js';

function KenyaMap(props) {
  return (
    <MapExplorer
      mapConfig={mapConfig}
      history={props.history}
      location={props.location}
      match={props.match}
    />
  );
};

KenyaMap.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  mapConfig: null,
};

KenyaMap.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  mapConfig: PropTypes.object,
};

export default KenyaMap;
