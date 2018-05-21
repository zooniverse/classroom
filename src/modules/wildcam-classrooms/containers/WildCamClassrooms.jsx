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
import Toast from 'grommet/components/Toast';

import ClassroomsList from '../components/ClassroomsList';
import ClassroomForm from '../components/ClassroomForm';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

const TEXT = {
  
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
    
    //Initial mode
    Actions.wildcamClassrooms.setComponentMode(MODES.VIEW_ALL_CLASSROOMS);
    
    Actions.wcc_teachers_fetchClassrooms(props.selectedProgram)
    .then(() => {
      //Transition to: View All Classrooms
      Actions.wildcamClassrooms.resetSelectedClassroom();
      Actions.wildcamClassrooms.setComponentMode(MODES.VIEW_ALL_CLASSROOMS);
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
        {props.toast && props.toast.message && (
          <Toast
            status={props.toast.status ? props.toast.status : 'unknown'}
            onClose={() => { Actions.wildcamClassrooms.resetToast() }}
          >
            {props.toast.message}
          </Toast>
        )}
        
        {props.componentMode === MODES.VIEW_ALL_CLASSROOMS && (
          <ClassroomsList
            classroomsList={props.classroomsList}
            classroomsStatus={props.classroomsStatus}
            selectedClassroom={props.selectedClassroom}
          />
        )}

        {props.componentMode === MODES.VIEW_ONE_CLASSROOM && (
          <ClassroomForm
            view={ClassroomForm.VIEWS.EDIT}
            componentMode={props.componentMode}
            selectedProgram={props.selectedProgram}
            classroomsStatus={props.classroomsStatus}
            selectedClassroom={props.selectedClassroom}
          />
        )}
        
        {props.componentMode === MODES.CREATE_NEW_CLASSROOM && (
          <ClassroomForm
            view={ClassroomForm.VIEWS.CREATE}
            componentMode={props.componentMode}
            selectedProgram={props.selectedProgram}
            classroomsStatus={props.classroomsStatus}
            selectedClassroom={null}
          />
        )}
        
        <Box pad="medium">
          <h4>Debug Panel</h4>
          <Box>
            Classrooms Status: [{props.classroomsStatus}] <br/>
            Classrooms Count: [{props.classroomsList && props.classroomsList.length}] <br/>
            Component Mode: {props.componentMode}
          </Box>
        </Box>

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
