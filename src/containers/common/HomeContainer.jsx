import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Home from '../../components/common/Home';
import { post } from '../../lib/edu-api';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Actions.getPrograms();
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
