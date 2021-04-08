import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import classroomConfig from '../wildwatch-kenya.classroom-config.js';

import WildCamForStudents from '../../../modules/wildcam-classrooms/containers/WildCamForStudents';

class KenyaStudents extends React.Component {
  render() {
    if (!this.props.selectedProgram) {
      return null;
    }
    
    return (
      <WildCamForStudents
        classroomConfig={classroomConfig}
        selectedProgram={this.props.selectedProgram}
        location={this.props.match}
        history={this.props.history}
        match={this.props.match}
      />
    );
  }
};

KenyaStudents.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: null,
};

KenyaStudents.propTypes = {
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

export default connect(mapStateToProps)(KenyaStudents);
