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
    
    return (
      <Table>
        <tbody>
          {props.classroomsList.map(classroom => this.render_readyState_classroom(classroom))}
        </tbody>
      </Table>
    );
  }
  
  render_readyState_classroom(classroom) {
    const props = this.props;
    
    //Sanity check not required.
    
    const assignmentsForThisClassroom = props.assignmentsList.filter(ass => parseInt(ass.classroomId) === parseInt(classroom.id));
    
    return (
      <TableRow key={`student_classroom_${classroom.id}`}>
        <td>
          <Heading tag='h3'>{classroom.name}</Heading>
          <Table>
            <tbody>
              {assignmentsForThisClassroom.map(ass => {
                if (!props.urlToAssignment) return;
                const workflowId = (ass && ass.workflowId)
                  ? ass.workflowId
                  : '';  //TODO: 
                const urlToAssignment = props.urlToAssignment.replace(/{WORKFLOW_ID}/g, workflowId);

                return (
                  <TableRow key={`student_classroom_${classroom.id}_assignment_${ass.id}`}>
                    <td>
                      <Heading tag='h4'>{ass.name}</Heading>
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
};

AssignmentsListForStudents.propTypes = {
  urlToAssignment: PropTypes.string,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(AssignmentsListForStudents);
