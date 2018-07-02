import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import queryString from 'query-string';

import JoinPage from '../../components/common/JoinPage';
import {
  PROGRAMS_STATUS, PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
} from '../../ducks/programs';
import {
  CLASSROOMS_STATUS
} from '../../ducks/classrooms';
import { programsMocks } from '../../ducks/programs';

export class JoinPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.joinClassroom = this.joinClassroom.bind(this);
  }

  componentDidMount() {
    // We want to know which program so we know how to redirect the student after joining.
    // I2A doesn't have a student interface here.
    Actions.getPrograms().then((programs) => {
      Actions.getProgram({ programs, param: this.props.match.params.program })
      .then((program) => {
        if (program &&
          this.props.initialised &&
          this.props.user &&
          this.props.classroomsStatus === CLASSROOMS_STATUS.IDLE
        ) {
          this.joinClassroom(this.props, program);
        }
      });
    });
  }

  joinClassroom(props, program) {
    const classroomId = props.match.params.classroomId;
    const joinToken = queryString.parse(props.location.search);
    const selectedProgram = program || props.selectedProgram;

    Actions.joinClassroom({ classroomId, joinToken: joinToken.token })
      .then(() => {
        if ((props.programsStatus === PROGRAMS_STATUS.SUCCESS && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS) &&
            (selectedProgram && selectedProgram.metadata && selectedProgram.metadata.redirectOnJoin)) {
          // Make sure they see the success message before redirecting
          setTimeout(props.history.replace(`/${selectedProgram.slug}/students`), 2000);
        }
      });
  }

  render() {
    return (
      <JoinPage
        classroomsStatus={this.props.classroomsStatus}
        handleLogin={this.handleLogin}
        initialised={this.props.initialised}
        programsStatus={this.props.programsStatus}
        selectedProgram={this.props.selectedProgram}
        user={this.props.user}
      />
    );
  }
}

JoinPageContainer.defaultProps = {
  ...PROGRAMS_INITIAL_STATE
};

JoinPageContainer.propTypes = {
  ...PROGRAMS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    classroomsStatus: state.classrooms.status,
    initialised: state.auth.initialised,
    programs: state.programs.programs,
    programsStatus: state.programs.status,
    selectedProgram: state.programs.selectedProgram,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(JoinPageContainer);
