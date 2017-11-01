import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Switch, Route, Redirect } from 'react-router-dom';

import AstroHome from '../../components/astro/AstroHome';
import DarienRoutesContainer from '../darien/DarienRoutesContainer';
import GenericStatusPage from '../../components/common/GenericStatusPage';

import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES, PROGRAMS_STATUS
} from '../../ducks/programs';

export class ProgramHomeContainer extends React.Component {
  constructor() {
    super();

    this.getProgram = this.getProgram.bind(this);
  }

  componentDidMount() {
    if (this.props.programs.length === 0 && !this.props.selectedProgram) {
      Actions.getPrograms().then((programs) => {
        this.getProgram(programs, this.props.match.params.program);
      });
    }

    if (this.props.programs && !this.props.selectedProgram) {
      this.getProgram(this.props.programs, this.props.match.params.program);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.programs.length > 0 && nextProps.selectedProgram && nextProps.selectedProgram.slug !== nextProps.match.params.program) {
      this.getProgram(nextProps.programs, nextProps.match.params.program);
    }
  }

  componentWillUnmount() {
    Actions.programs.selectProgram(PROGRAMS_INITIAL_STATE.selectedProgram);
  }

  getProgram(programs, param) {
    Actions.getProgram({ programs, param });
  }

  render() {
    // How do I pass props down consistently? They only get initial props, not the updated ones.
    // Check RR v.4 docs

    if (this.props.programsStatus === PROGRAMS_STATUS.FETCHING) {
      return (<GenericStatusPage status={this.props.programsStatus} message="Loading" />);
    }

    if (this.props.programsStatus === PROGRAMS_STATUS.ERROR) {
      return (<GenericStatusPage status="critical" message="Something went wrong" />);
    }

    return (
      <Switch>
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
    programs: state.programs.programs,
    programsStatus: state.programs.status,
    selectedProgram: state.programs.selectedProgram,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(ProgramHomeContainer);
