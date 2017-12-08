import React from 'react';
import PropTypes from 'prop-types';
import MapExplorer from '../../containers/maps/MapExplorer';
import mapConfig from '../../lib/wildcam-darien.mapConfig.js';

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
