import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../ducks/programs';
import { CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES } from '../../ducks/classrooms';
import { ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES } from '../../ducks/assignments';

class WildCamClassroom extends React.Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    //Get the list of Classrooms and Assignments.
    if (this.props.selectedProgram) Actions.getClassroomsAndAssignments(this.props.selectedProgram);
  }

  componentWillReceiveProps(nextProps) {
    //Get the list of Classrooms and Assignments.
    if (nextProps.selectedProgram && this.props.selectedProgram !== nextProps.selectedProgram) {
      Actions.getClassroomsAndAssignments(nextProps.selectedProgram);
    }
  }

  render() {
    if (!this.props.selectedProgram) return null;
    
    return (
      <Box
        colorIndex="grey-5"
      >
        <Box>
          STATUS: [{this.props.classroomsStatus}]
        </Box>
        
        <Box>
        {this.props.classrooms && this.props.classrooms.map((item, index)=>{
          return (
            <div key={`classroom_{$index}`}>
              {index}: {item.name}
            </div>
          );
        })}
        </Box>
      </Box>
    );
  }
}

WildCamClassroom.defaultProps = {
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  //Passed from parent.
  //--------------------------------
  ...CLASSROOMS_INITIAL_STATE,
  classroomsStatus: CLASSROOMS_INITIAL_STATE.status,
  //--------------------------------
  ...ASSIGNMENTS_INITIAL_STATE,
  assignmentsStatus: ASSIGNMENTS_INITIAL_STATE.status,
  
};

WildCamClassroom.propTypes = {
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  //--------------------------------
  ...CLASSROOMS_PROPTYPES,
  classroomsStatus: CLASSROOMS_PROPTYPES.status,
  //--------------------------------
  ...ASSIGNMENTS_PROPTYPES,
  assignmentsStatus: ASSIGNMENTS_PROPTYPES.status,
  
};

function mapStateToProps(state) {
  return {
    classrooms: state.classrooms.classrooms,
    classroomsStatus: state.classrooms.status,
    //--------------------------------
    assignments: state.assignments.assignments,
    assignmentsStatus: state.assignments.status,
  };
}

export default connect(mapStateToProps)(WildCamClassroom);
