/*
Assignments List
----------------

Renders a list of assignments.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import { TEXT } from '../text.js';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import AddIcon from 'grommet/components/icons/base/Add';
import HelpIcon from 'grommet/components/icons/base/Help';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

/*
--------------------------------------------------------------------------------
 */

class AssignmentsList extends React.Component {
  constructor() {
    super();
  }
  
  // ----------------------------------------------------------------
  
  render() {
    const props = this.props;
    const state = this.state;
    
    //Sanity check
    if (!props.selectedClassroom) return null;
    
    //const students = (props.selectedClassroom && props.selectedClassroom.students) ? props.selectedClassroom.students : [];
    //const assignments = (props.selectedClassroom && props.assignments && props.assignments[props.selectedClassroom.id])
    //  ? props.assignments[props.selectedClassroom.id]
    //  : [];
    
    const assignments = props.assignmentsList || [];
    
    return (
      <Box
        className="assignments-list for-educators"
        margin="small"
        pad="small"
      >
        <Heading tag="h3">{TEXT.TITLES.ASSIGNMENTS}</Heading>
        <Box className="helper-text">
          {TEXT.HELPERS.EDUCATORS_ASSIGNMENT_LIST}
        </Box>
        <Table className="table">
          <tbody>
            {assignments.map((assignment) => {
              return (
                <TableRow
                  className="assignment"
                  key={`assignments-list_${assignment.id}`}
                >
                  <td>
                    <Accordion>
                      <AccordionPanel heading={assignment.name}>
                        {this.render_studentProgress(props.selectedClassroom, assignment)}
                      </AccordionPanel>
                    </Accordion>
                  </td>
                  <td>
                    <Box
                      className="actions-panel"
                      direction="row"
                      justify="end"
                    >
                      <Button
                        className="button"
                        icon={<LinkNextIcon size="small" />}
                        label={TEXT.ACTIONS.EDIT}
                        onClick={() => {
                          //Transition to: View One Assignment
                          props.history && props.history.push(`${props.match.url.replace(/\/+$/,'')}/assignments/${assignment.id}`);
                        }}
                      />
                    </Box>
                  </td>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
        <Footer
          className="actions-panel"
          direction="row"
          justify="end"
          pad="medium"
        >
          <Button
            className="button"
            icon={<HelpIcon />}
            label={TEXT.ACTIONS.HELP}
            onClick={() => {
              Actions.wildcamClassrooms.showHelp('assignments-management');
            }}
          />
          
          <Button
            className="button"
            icon={<AddIcon size="small" />}
            label={TEXT.ACTIONS.CREATE_NEW_ASSIGNMENT}
            onClick={() => {
              //Transition to: Create New Assignment
              props.history && props.history.push(`${props.match.url.replace(/\/+$/,'')}/assignments/new`);
            }}
          />
        </Footer>
      </Box>
    );
  }

  render_studentProgress(classroom, assignment) {
    //Sanity check
    if (!classroom || !assignment) return null;
    
    const classificationsTarget = (assignment.metadata)
      ? assignment.metadata.classifications_target
      : '-';

    const students = (assignment.studentAssignments && assignment.studentAssignments.map)
      ? assignment.studentAssignments.map((stuass) => {
          const thisStudent = classroom.students && classroom.students.find(s=>s.id==stuass.studentUserId);  //Use == instead of === due to the differing data types.
          return {
            id: stuass.id,
            name: (thisStudent && thisStudent.zooniverseDisplayName)
              ? thisStudent.zooniverseDisplayName
              : '-',
            progress: stuass.classificationsCount,
          };
        })
      : [];
    
    return (
      <List className="details-list">
        {students.map((s)=>
          <ListItem key={`assignments-list_${assignment.id}_${s.id}`}>
            <Label>{s.name}</Label>
            <span>{s.progress} / {classificationsTarget}</span>
          </ListItem>
        )}
        
      </List>
    );
  }
};

/*
--------------------------------------------------------------------------------
 */

AssignmentsList.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedClassroom: WILDCAMCLASSROOMS_INITIAL_STATE.selectedClassroom,
};

AssignmentsList.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedClassroom: WILDCAMCLASSROOMS_PROPTYPES.selectedClassroom,
};

export default AssignmentsList;