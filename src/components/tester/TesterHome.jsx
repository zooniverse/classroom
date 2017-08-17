import React from 'react';
import MapExplorer from '../../containers/maps/MapExplorer';
import { connect } from 'react-redux';

import mapConfig from '../../lib/wildcam-darien.mapConfig.json';

class TesterHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <MapExplorer
        mapConfig={mapConfig}
      />
    );
  }
}

TesterHome.propTypes = {};
TesterHome.defaultProps = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(TesterHome);
