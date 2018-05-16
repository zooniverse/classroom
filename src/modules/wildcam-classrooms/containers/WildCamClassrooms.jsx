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
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';

import ClassroomsList from '../components/ClassroomsList';
import ClassroomForm from '../components/ClassroomForm';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODE as MODE,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

const MODES = {
  INIT: 'init',
  VIEW_ALL_CLASSROOMS: 'view all classrooms',
  VIEW_ONE_CLASSROOM: 'view one classroom',
  CREATE_NEW_CLASSROOM: 'create new classroom',
};

class WildCamClassroom extends React.Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    //Get the list of Classrooms and Assignments.
    this.initialiseList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //Get the list of Classrooms and Assignments.
    if (this.props.selectedProgram !== nextProps.selectedProgram) this.initialiseList(nextProps);
  }
  
  initialiseList(props = this.props) {
    //Sanity check
    if (!props.selectedProgram) return;
    
    Actions.wcc_teachers_fetchClassrooms(props.selectedProgram)
    .then(() => {
      Actions.wildcamClassrooms.resetSelectedClassroom();
      Actions.wildcamClassrooms.setComponentMode(MODES.VIEW_ALL_CLASSROOMS);
      this.setState({ mode: MODES.VIEW_ALL_CLASSROOMS });
    });
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
          Classrooms Count: [{props.classroomsList && props.classroomsList.length}] <br/>
          Mode: {props.componentMode}
        </Box>
        
        <Box pad="medium">
          <Button>Create new classroom</Button>
        </Box>
        
        {props.componentMode === MODES.INIT && (
          <Box pad="medium">
            <Spinning />
          </Box>
        )}
        
        {props.componentMode === MODES.VIEW_ALL_CLASSROOMS && (
          <ClassroomsList
            classroomsList={props.classroomsList}
          />
        )}
        
        {props.componentMode === MODES.VIEW_ONE_CLASSROOM && props.selectedClassroom && (
          <ClassroomForm
            selectedProgram={props.selectedProgram}
            classroomsStatus={props.classroomsStatus}
            selectedClassroom={props.selectedClassroom}
          />
        )}
        
        {props.componentMode === MODES.CREATE_NEW_CLASSROOM && !props.selectedClassroom && (
          <ClassroomForm
            selectedProgram={props.selectedProgram}
            classroomsStatus={props.classroomsStatus}
            selectedClassroom={null}
          />
        )}

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
