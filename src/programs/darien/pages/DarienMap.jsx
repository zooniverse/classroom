import React from 'react';
import PropTypes from 'prop-types';
import MapExplorer from '../../../modules/wildcam-map/containers/MapExplorer';
import mapConfig from '../wildcam-darien.map-config.js';

function DarienMap(props) {
  return (
    <MapExplorer
      mapConfig={props.mapConfig}
    />
  );
};

DarienMap.defaultProps = {
  mapConfig
};

DarienMap.propTypes = {
  mapConfig: PropTypes.object
};

export default DarienMap;
