import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';

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
        </Box>
        
        <Box>
        </Box>
      </Box>
    );
  }
}

WildCamClassroom.defaultProps = {
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  //Passed from parent.
};

WildCamClassroom.propTypes = {
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(WildCamClassroom);
