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

import { TEXT } from '../text.js';

import StatusWorking from './StatusWorking';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Paragraph from 'grommet/components/Paragraph';
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
        className="assignments-list for-students"
        margin="medium"
        pad="medium"
      >
        <Heading tag="h2">{TEXT.TITLES.YOUR_ASSIGNMENTS}</Heading>
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
    
    return (
      <TableRow className="classroom" key={`student_classroom_${classroom.id}`}>
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
                
                //Determine Student's progress in this Assignment.
                //NOTE: A Student-Assignment pairing is distinct from a Student
                //or an Assignment, and is used to keep track of how far a
                //student has progressed in a given Assignment.
                const studentAssignment = ass.studentAssignments
                  && ass.studentAssignments.find(i => i.studentUserId == studentId);  //NOTE: use ==, not ===
                const classificationsCount = (studentAssignment)  //TODO!
                  ? studentAssignment.classificationsCount
                  : '?';
                const classificationsTarget = (ass.metadata && ass.metadata.classifications_target)
                  ? ass.metadata.classifications_target
                  : '?';
                
                console.log('+++ ass: ', ass);

                return (
                  <TableRow className="assignment" key={`student_classroom_${classroom.id}_assignment_${ass.id}`}>
                    <td>
                      <Accordion>
                        <AccordionPanel heading={ass.name}>
                          {(ass.metadata && ass.metadata.description) && (
                            <Paragraph>{ass.metadata.description}</Paragraph>
                          )}
                          {(ass.metadata && ass.metadata.duedate) && (
                            <Paragraph size="small">{TEXT.ASSIGNMENT_FORM.DUEDATE}: {ass.metadata.duedate}</Paragraph>
                          )}
                        </AccordionPanel>
                      </Accordion>
                    </td>
                    <td>
                      <Box
                          className="actions-panel"
                          direction="column"
                          justify="end"
                          align="center"
                        >
                          <Button className="button" label={TEXT.ACTIONS.START_ASSIGNMENT + ' '} href={urlToAssignment} target="_blank" rel="noopener noreferrer" icon={<LinkNextIcon size="small" />} reverse={true} />
                          <Paragraph size="small">{TEXT.LABELS.PROGRESS}: {classificationsCount} / {classificationsTarget}</Paragraph>
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
