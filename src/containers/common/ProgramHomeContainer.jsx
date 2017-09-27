import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Switch, Route, Redirect } from 'react-router-dom';

import JoinPageContainer from './JoinPageContainer';
import AstroHome from '../../components/astro/AstroHome';
import DarienRoutesContainer from '../darien/DarienRoutesContainer';

import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
} from '../../ducks/programs';

export class ProgramHomeContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (!this.props.selectedProgram) {
      Actions.getProgram({ programs: this.props.programs, param: this.props.match.params.program });
    }
  }

  componentWillUnmount() {
    Actions.programs.selectProgram(PROGRAMS_INITIAL_STATE.program);
  }

  render() {
    // How do I pass props down consistently? They only get initial props, not the updated ones.
    // Check RR v.4 docs
    return (
      <Switch>
        <Route path="/:program/students/classrooms/:classroomId/join" component={JoinPageContainer} />
        <Route path="/astro-101-with-galaxy-zoo/educators" component={AstroHome} />
        <Redirect from="/astro-101-with-galaxy-zoo" to="/astro-101-with-galaxy-zoo/educators/" />
        <Route path="/wildcam-darien-lab" component={DarienRoutesContainer} />
      </Switch>
    );
  }
}

ProgramHomeContainer.propTypes = {
  ...PROGRAMS_PROPTYPES,
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string })
};

ProgramHomeContainer.defaultProps = {
  ...PROGRAMS_INITIAL_STATE,
  initialised: false,
  user: null
};

function mapStateToProps(state) {
  return {
    initialised: state.auth.initialised,
    programsStatus: state.programs.status,
    selectedProgram: state.programs.selectedProgram,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(ProgramHomeContainer);
