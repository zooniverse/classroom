/*
WildCam Classrooms
------------------

The primary component for viewing and managing classrooms and assignments for
WildCam-type programs/projects.

--------------------------------------------------------------------------------
 */

import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';

import ClassroomsList from '../components/ClassroomsList';
import ClassroomForm from '../components/ClassroomForm';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

class WildCamClassroom extends React.Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    //Get the list of Classrooms and Assignments.
    if (this.props.selectedProgram) Actions.wcc_teachers_fetchClassrooms(this.props.selectedProgram);
  }

  componentWillReceiveProps(nextProps) {
    //Get the list of Classrooms and Assignments.
    if (nextProps.selectedProgram && this.props.selectedProgram !== nextProps.selectedProgram) {
      Actions.wcc_teachers_fetchClassrooms(nextProps.selectedProgram);
    }
  }

  render() {
    const props = this.props;

    //Sanity check
    if (!props.selectedProgram) return null;

    return (
      <Box
        colorIndex="grey-5"
        className="wildcam-classrooms"
      >
        <Box pad="medium">
          Classrooms Status: [{props.classroomsStatus}] <br/>
          Classrooms Count: [{props.classroomsList && props.classroomsList.length}]
        </Box>
        
        <ClassroomsList
          classroomsList={props.classroomsList}
        />
        
        <ClassroomForm
          selectedProgram={props.selectedProgram}
          classroomsStatus={props.classroomsStatus}
          selectedClassroom={props.selectedClassroom}
        />
      </Box>
    );
  }
}

WildCamClassroom.defaultProps = {
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  //Passed from parent.
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

WildCamClassroom.propTypes = {
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
