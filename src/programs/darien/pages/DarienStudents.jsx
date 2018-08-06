import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import WildCamForStudents from '../../../modules/wildcam-classrooms/containers/WildCamForStudents';
import DarienNavi from '../common/DarienNavi';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';

class DarienStudents extends React.Component {
  render() {
    if (!this.props.selectedProgram) {
      return null;
    }
    
    return (
      <Box>
        <DarienNavi />
        <WildCamForStudents
          selectedProgram={this.props.selectedProgram}
          location={this.props.match}
          history={this.props.history}
          match={this.props.match}
        />
      </Box>
    );
  }
};

DarienStudents.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: null,
};

DarienStudents.propTypes = {
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

export default connect(mapStateToProps)(DarienStudents);
