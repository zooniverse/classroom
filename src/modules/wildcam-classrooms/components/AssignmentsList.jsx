/*
Assignments List
----------------

Renders a list of assignments.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

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

const TEXT = {
  HEADINGS: {
    ASSIGNMENTS: 'Assignments',
  },
  ACTIONS: {
    EDIT: 'Edit',
    CREATE_NEW_ASSIGNMENT: 'Create new assignment',
  },
}
  
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
        className="assignments-list"
        margin="small"
        pad="small"
      >
        <Heading tag="h3">{TEXT.HEADINGS.ASSIGNMENTS}</Heading>
        <Table className="table">
          <tbody>
            {assignments.map((assignment) => {
              return (
                <TableRow
                  className="item"
                  key={`assignments-list_${assignment.id}`}
                >
                  <td>
                    <Heading tag="h4">...</Heading>
                  </td>
                  <td>
                    ...
                  </td>
                  <td>
                    <Box
                      className="actions-panel"
                      direction="row"
                      justify="end"
                    >
                      EDIT
                    </Box>
                  </td>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
        <Footer>
          <Button
            className="button"
            label={TEXT.ACTIONS.CREATE_NEW_ASSIGNMENT}
            onClick={() => {
              //Transition to: Create New Assignment
              props.history && props.history.push(`${props.selectedClassroom.id}/assignments/new`);
            }}
          />
        </Footer>
      </Box>
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