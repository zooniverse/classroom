import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../../components/common/Home';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Home programs={this.props.programs} />
    );
  }
}

function mapStateToProps(state) {
  return {
    programs: state.programs.programs
  };
}

export default connect(mapStateToProps)(HomeContainer);
