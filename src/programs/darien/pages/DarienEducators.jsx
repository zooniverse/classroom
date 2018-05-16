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
    if (!this.props.selectedProgram) {
      return null;
    }
    
    return (
      <WildCamClassrooms
        selectedProgram={this.props.selectedProgram}
      />
    );
  }
};

DarienEducators.propTypes = {
  selectedProgram: PropTypes.object,
};

DarienEducators.defaultProps = {
  selectedProgram: null,
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.programs.selectedProgram,
  };
}

export default connect(mapStateToProps)(DarienEducators);
