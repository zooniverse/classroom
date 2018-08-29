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
import { Link } from 'react-router-dom';

import StatusWorking from './StatusWorking';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';
  
const TEXT = {
  TITLE: {
    YOUR_ASSIGNMENTS: 'Your Assignments'
  },
  ACTIONS: {
    START_ASSIGNMENT: 'Start assignment'
  }
};

class AssignmentsListForStudents extends React.Component {
  constructor() {
    super();
    
    this.state = {
      expandedAssignments: [],
    };
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
        <Heading tag="h2">{TEXT.TITLE.YOUR_ASSIGNMENTS}</Heading>
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
        <ScrollToTopOnMount />
      </Box>
    );
  }
  
  render_readyState() {
    const props = this.props;
    
    //Sanity check
    if (!props.classroomsList || !props.assignmentsList) return null;
    
    //Determine who the student is, so we can narrow down their assignment
    //progress later. This mildly hacky way tries to determine the user's
    //student ID via their Panoptes login ID, since there's no easy way to
    //do this via the Education API.
    let myStudentId = undefined;
    if (props.user && props.classroomsStudents) {  //Go through the whole list of students in the classrooms and figu
      const myStudentData = props.classroomsStudents.find(stud => stud.attributes && (stud.attributes.zooniverse_id === props.user.id));
      myStudentId = myStudentData && myStudentData.id;
    }
    
    return (
      <Table>
        <tbody>
          {props.classroomsList.map(classroom => this.render_readyState_classroom(classroom, myStudentId))}
        </tbody>
      </Table>
    );
  }
  
  render_readyState_classroom(classroom, studentId) {
    const props = this.props;
    
    //Sanity check not required.
    //We know we have props.classroomsList and props.assignmentsList
    
    //Determine specifics for this classroom.
    const assignmentsForThisClassroom = props.assignmentsList.filter(ass => parseInt(ass.classroomId) === parseInt(classroom.id));
    
    
    //TODO: Determine classification count!
    //WARNING: Complicated as all hell.
    if (studentId && props.assignmentsAuxData) {
      console.log(`+++ We want to list the Classification count for Student ${studentId} . \n The Assignments auxilliary data includes: `, props.assignmentsAuxData);
      
      //See, Student-Assignments pairings have different IDs from Students and from Assignments.
      const studentAssignmentIds = props.assignmentsAuxData  //In the auxilliary data for Assignments...
        .filter(i => i.attributes.student_user_id == studentId)  //...find all the Student-Assignment pairings with this student's ID...  (NOTE: Use ==, not ===, since we're comparing strings and integers)
        .map(i => i.id);  //...and return the Student-Assignment pairings' IDs.
      
      console.log('+++ \n', studentAssignmentIds);
    }
    
    return (
      <TableRow key={`student_classroom_${classroom.id}`}>
        <td>
          <Heading tag='h3'>{classroom.name}</Heading>
          <Table>
            <thead>
              <TableRow>
                <td>Assignment Name</td>
                <td>Progress</td>
                <td>&nbsp;</td>
              </TableRow>
            </thead>
            
            <tbody>
              {assignmentsForThisClassroom.map(ass => {
                if (!props.urlToAssignment) return;
                const workflowId = (ass && ass.workflowId)
                  ? ass.workflowId
                  : '';  //TODO: 
                const urlToAssignment = props.urlToAssignment.replace(/{WORKFLOW_ID}/g, workflowId);
                
                const classificationsCount = (false)  //TODO!
                  ? '0'
                  : '?';
                const classificationsTarget = (ass.metadata && ass.metadata.classifications_target)
                  ? ass.metadata.classifications_target
                  : '?';

                return (
                  <TableRow key={`student_classroom_${classroom.id}_assignment_${ass.id}`}>
                    <td>
                      <Heading tag='h4'> [{ass.id}] {ass.name}</Heading>
                    </td>
                    <td>
                      {classificationsCount} / {classificationsTarget}
                    </td>
                    <td>
                      <Box
                          className="actions-panel"
                          direction="row"
                          justify="end"
                        >
                          <Button label={TEXT.ACTIONS.START_ASSIGNMENT} href={urlToAssignment} target="_blank" rel="noopener noreferrer" icon={<LinkNextIcon />} />
                      </Box>
                    </td>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </td>
      </TableRow>
    );
  }
  
  render_workingState() {
    return (
      <StatusWorking />
    );
  }
};

AssignmentsListForStudents.defaultProps = {
  urlToAssignment: '',  //Passed from parent.
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
  // ----------------
  user: null,  //Special case
};

AssignmentsListForStudents.propTypes = {
  urlToAssignment: PropTypes.string,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
  // ----------------
  user: PropTypes.object,  //Special case
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
    // ----------------
    user: state.auth.user,  //Special case
  };
}

export default connect(mapStateToProps)(AssignmentsListForStudents);
