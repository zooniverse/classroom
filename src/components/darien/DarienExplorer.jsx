import React from 'react';
import PropTypes from 'prop-types';
import MapExplorer from '../../containers/maps/MapExplorer';
import mapConfig from '../../lib/wildcam-darien.mapConfig.js';

const DarienExplorer = (props) => {
  return (
    <MapExplorer
      mapConfig={props.mapConfig}
    />
  );
};

DarienExplorer.defaultProps = {
  mapConfig
};

DarienExplorer.propTypes = {
  mapConfig: PropTypes.object
};

export default DarienExplorer;
