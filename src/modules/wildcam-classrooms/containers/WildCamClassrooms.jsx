/*
WildCam Classrooms
------------------

The primary component for Teachers, allowing them to view and manage classrooms
and assignments for WildCam-type programs/projects.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Switch, Route } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Toast from 'grommet/components/Toast';

import ClassroomsList from '../components/ClassroomsList';
import ClassroomForm from '../components/ClassroomForm';
import AssignmentForm from '../components/AssignmentForm';
import Status404 from '../../../components/common/Status404';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

/*
--------------------------------------------------------------------------------
 */

class WildCamClassroom extends React.Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    //Get the list of Classrooms and Assignments.
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //Get the list of Classrooms and Assignments.
    if (this.props.selectedProgram !== nextProps.selectedProgram) this.initialise(nextProps);
  }
  
  //Initialise:
  //Fetch the classroom data for this Program.
  initialise(props = this.props) {
    //Sanity check
    if (!props.selectedProgram) return;
    
    return Actions.wcc_teachers_fetchClassrooms({ selectedProgram: props.selectedProgram })
    .then(() => {
      //Nothing
    });
  }

  render() {
    const props = this.props;
    const match = (props.match) ? props.match : {};

    //Sanity check
    if (!props.selectedProgram) return null;

    return (
      <Box
        colorIndex="grey-5"
        className="wildcam-classrooms"
      >
        {props.toast && props.toast.message && (
          <Toast
            status={props.toast.status ? props.toast.status : 'unknown'}
            onClose={() => { Actions.wildcamClassrooms.resetToast() }}
          >
            {props.toast.message}
          </Toast>
        )}
        
        <Switch>
          <Route
            path={`${match.url}/classrooms/:classroom_id/assignments/new`} exact
            component={AssignmentForm}
          />
          <Route
            path={`${match.url}/classrooms/:classroom_id/assignments/:assignment_id`} exact
            component={AssignmentForm}
          />
          <Route
            path={`${match.url}/classrooms/new`} exact
            component={ClassroomForm}
          />
          <Route
            path={`${match.url}/classrooms/:classroom_id`} exact
            component={ClassroomForm}
          />
          <Route
            path={`${match.url}`} exact
            component={ClassroomsList}
          />
          <Route path="*" component={Status404} />
        </Switch>

      </Box>
    );
  }
}

/*
--------------------------------------------------------------------------------
 */

WildCamClassroom.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  //Passed from parent.
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

WildCamClassroom.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(WildCamClassroom);
