import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import WildCamClassrooms from '../../../modules/wildcam-classrooms/containers/WildCamClassrooms';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';

class DarienEducators extends React.Component {
  render() {
    console.log('+++ ... ', this.props);
    
    if (!this.props.selectedProgram) {
      return null;
    }
    
    return (
      <WildCamClassrooms
        selectedProgram={this.props.selectedProgram}
        location={this.props.match}
        history={this.props.history}
        match={this.props.match}
      />
    );
  }
};

DarienEducators.defaultProps = {
  location: null,
  history: null,
  match: null,
  selectedProgram: null,
};

DarienEducators.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedProgram: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.programs.selectedProgram,
  };
}

export default connect(mapStateToProps)(DarienEducators);
