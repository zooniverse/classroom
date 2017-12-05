import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Home from '../../components/common/Home';
import {
  PROGRAMS_INITIAL_STATE,
  PROGRAMS_PROPTYPES
} from '../../ducks/programs';

class HomeContainer extends React.Component {
  componentDidMount() {
    Actions.getPrograms();
  }

  render() {
    return (
      <Home programs={this.props.programs} programsStatus={this.props.programsStatus} />
    );
  }
}

HomeContainer.defaultProps = {
  ...PROGRAMS_INITIAL_STATE
};

HomeContainer.propTypes = {
  ...PROGRAMS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    programs: state.programs.programs,
    programsStatus: state.programs.status
  };
}

export default connect(mapStateToProps)(HomeContainer);
