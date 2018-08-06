import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import WildCamForEducators from '../../../modules/wildcam-classrooms/containers/WildCamForEducators';
import GorongosaNavi from '../common/GorongosaNavi';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';

class GorongosaEducators extends React.Component {
  render() {
    if (!this.props.selectedProgram) {
      return null;
    }
    
    return (
      <Box>
        <GorongosaNavi />
        <WildCamForEducators
          selectedProgram={this.props.selectedProgram}
          location={this.props.match}
          history={this.props.history}
          match={this.props.match}
        />
      </Box>
    );
  }
};

GorongosaEducators.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: null,
};

GorongosaEducators.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedProgram: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.programs.selectedProgram,
  };
}

export default connect(mapStateToProps)(GorongosaEducators);
