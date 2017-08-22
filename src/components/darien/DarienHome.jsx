import React from 'react';
import MapExplorer from '../../containers/maps/MapExplorer';
import { connect } from 'react-redux';

import mapConfig from '../../lib/wildcam-darien.mapConfig.json';

class DarienHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapExplorer
        mapConfig={mapConfig}
      />
    );
  }
}

DarienHome.propTypes = {};
DarienHome.defaultProps = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(DarienHome);
