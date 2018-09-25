import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import classroomConfig from '../wildcam-darien.classroom-config.js';

import WildCamForEducators from '../../../modules/wildcam-classrooms/containers/WildCamForEducators';

class DarienEducators extends React.Component {
  render() {
    if (!this.props.selectedProgram) {
      return null;
    }
    
    return (
      <WildCamForEducators
        selectedProgram={this.props.selectedProgram}
        classroomConfig={classroomConfig}
        location={this.props.match}
        history={this.props.history}
        match={this.props.match}
      />
    );
  }
};

DarienEducators.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: null,
};

DarienEducators.propTypes = {
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

export default connect(mapStateToProps)(DarienEducators);
