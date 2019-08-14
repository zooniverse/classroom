/*
WildCam Students
----------------

The primary component for Teachers, allowing them to view their assigned
Assignments.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Switch, Route } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Toast from 'grommet/components/Toast';

import AssignmentsListForStudents from '../components/AssignmentsListForStudents';

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

class WildCamForStudents extends React.Component {
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
    
    return Actions.wcc_students_fetchClassrooms({ selectedProgram: props.selectedProgram })
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
        
        <AssignmentsListForStudents
          selectedProgram={props.selectedProgram}
          transformData={(props.classroomConfig && props.classroomConfig.forStudents && props.classroomConfig.forStudents.transformClassificationsDownload)
            ? props.classroomConfig.forStudents.transformClassificationsDownload
            : null
          }
          urlToAssignment={(props.classroomConfig && props.classroomConfig.forStudents && props.classroomConfig.forStudents.urlToAssignment)
            ? props.classroomConfig.forStudents.urlToAssignment
            : ''
          }
        />

      </Box>
    );
  }
}

/*
--------------------------------------------------------------------------------
 */

WildCamForStudents.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  classroomConfig: {},
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  //Passed from parent.
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

WildCamForStudents.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  classroomConfig: PropTypes.object,
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(WildCamForStudents);
