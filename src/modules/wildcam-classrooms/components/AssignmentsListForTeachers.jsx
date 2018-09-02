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

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
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
        className="assignments-list"
        margin="small"
        pad="small"
      >
        <Heading tag="h3">{TEXT.TITLES.ASSIGNMENTS}</Heading>
        <Table className="table">
          <tbody>
            {assignments.map((assignment) => {
              return (
                <TableRow
                  className="item"
                  key={`assignments-list_${assignment.id}`}
                >
                  <td>
                    <Heading tag="h4">{assignment.name}</Heading>
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