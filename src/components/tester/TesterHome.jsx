import React from 'react';
import MapExplorer from '../../containers/common/MapExplorer';
import { connect } from 'react-redux';

class TesterHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <MapExplorer />
    );
  }

}

TesterHome.propTypes = {};
TesterHome.defaultProps = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(TesterHome);
