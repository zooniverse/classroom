import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import queryString from 'query-string';

import JoinPage from '../../components/common/JoinPage';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
} from '../../ducks/programs';
import {
  CLASSROOMS_STATUS
} from '../../ducks/classrooms';

function storeLocation(pathname, search) {
  localStorage.setItem('redirectPathname', pathname);
  localStorage.setItem('redirectSearch', search);
}

function removeLocation() {
  localStorage.removeItem('redirectPathname');
  localStorage.removeItem('redirectSearch');
}

export class JoinPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.joinClassroom = this.joinClassroom.bind(this);
  }

  componentDidMount() {
    // We want to know which program so we know how to redirect the student after joining.
    // I2A doesn't have a student interface here.
    Actions.getProgram({ programs: this.props.programs, param: this.props.match.params.program })
      .then(() => {
        if (this.props.initialised && !this.props.user) {
          storeLocation(this.props.location.pathname, this.props.location.search);
        }

        if (this.props.initialised && this.props.user) {
          this.joinClassroom();
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialised && !nextProps.user) {
      if (!localStorage.getItem('classroomJoinRedirect')) {
        storeLocation(nextProps.location.pathname, nextProps.location.search);
      }
    }

    if (nextProps.selectedProgram &&
        nextProps.classroomsStatus === CLASSROOMS_STATUS.IDLE &&
        nextProps.initialised &&
        nextProps.user) {
      // TODO debug when you are attempt to join your own classroom. Getting 500 error?
      this.joinClassroom();
    }
  }

  joinClassroom() {
    const classroomId = this.props.match.params.classroomId;
    const joinToken = queryString.parse(this.props.location.search);

    Actions.joinClassroom({ classroomId, joinToken: joinToken.token })
      .then(() => {
        removeLocation();
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
