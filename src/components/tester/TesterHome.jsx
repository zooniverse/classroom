import React from 'react';
import MapExplorer from '../../containers/maps/MapExplorer';
import { connect } from 'react-redux';

const mapConfig = require('../../lib/wildcam-darien.mapConfig.json');

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
