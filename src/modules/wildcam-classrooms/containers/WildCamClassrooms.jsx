import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';

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
    if (!this.props.selectedProgram) return null;
    
    return (
      <Box
        colorIndex="grey-5"
        className="wildcam-classrooms"
      >
        <Box>
          Classrooms Status: [{this.props.classroomsStatus}] <br/>
          Classrooms Count: [{this.props.classroomsList && this.props.classroomsList.length}]
        </Box>
        
        <Box>
          {(this.props.classroomsList && this.props.classroomsList.map((item) => {
            return 'aaa';
          }))}
        </Box>
        
        
      </Box>
    );
  }
}

WildCamClassroom.defaultProps = {
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  //Passed from parent.
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

WildCamClassroom.propTypes = {
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(WildCamClassroom);
