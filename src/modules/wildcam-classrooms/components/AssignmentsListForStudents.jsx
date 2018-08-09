/*
AssignmentsListForStudents
--------------------------

Component for listing all assignments. (This is for the student's view.)

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import StatusWorking from './StatusWorking';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import AddIcon from 'grommet/components/icons/base/Add';
import EditIcon from 'grommet/components/icons/base/Edit';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';
  
const TEXT = {
  WORKING: 'Working...',
  VIEW: 'View',
  CREATE_NEW_CLASSROOM: 'Create new classroom',
};

class AssignmentsListForStudents extends React.Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    Actions.wcc_fetchAssignments({});
  }
  
  // ----------------------------------------------------------------
  
  render() {
    const props = this.props;
    
    return (
      <Box
        className="assignments-list-for-students"
        margin="medium"
        pad="medium"
      >
        <Heading tag="h2">Your Assignments</Heading>
        {(() => {
          if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS && props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
            return this.render_readyState();
          } else if (
            props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING
            || props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING
            || props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING
            || props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING
          ) {
            return this.render_workingState();
          }
        })()}
        
        <p>Classrooms Status: {props.classroomsStatus}</p>
        <p>Assignments Status: {props.assignmentsStatus}</p>
        
        <ScrollToTopOnMount />
      </Box>
    );
  }
  
  render_readyState() {
    const props = this.props;
    
    console.log('+++ CLASSROOMS: \n', props.classroomsList);
    console.log('+++ ASSIGNMENTS: \n', props.assignmentsList);
    
    return (
      <Box>
        ...
      </Box>
    );
  }
  
  render_workingState() {
    return (
      <StatusWorking />
    );
  }
};

AssignmentsListForStudents.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

AssignmentsListForStudents.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(AssignmentsListForStudents);