/*
ClassroomsList
--------------

Component for listing all classrooms.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import AddIcon from 'grommet/components/icons/base/Add';
import EditIcon from 'grommet/components/icons/base/Edit';
import SpinningIcon from 'grommet/components/icons/Spinning';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
} from '../ducks/index.js';
  
const TEXT = {
  WORKING: 'Working...',
  EDIT: 'Edit',
  CREATE_NEW_CLASSROOM: 'Create new classroom',
};

class ClassroomsList extends React.Component {
  constructor() {
    super();
  }
  
  // ----------------------------------------------------------------
  
  render() {
    const props = this.props;
    
    //Sanity check
    if (!props.classroomsList) return null;
    
    return (
      <Box
        className="classrooms-list"
        margin="medium"
        pad="medium"
      >
        <Heading tag="h2">List of Classrooms</Heading>
        
        {(() => {
          if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
            return this.render_readyState();
          } else if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING || props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING) {
            return this.render_workingState();
          }
        })()}
      </Box>
    );
  }
  
  render_readyState() {
    const props = this.props;
    
    return (
      <Box>
        <Box
          className="actions-panel"
          pad="medium"
        >
          <Button
            className="button"
            icon={<AddIcon size="small" />}
            label={TEXT.CREATE_NEW_CLASSROOM}
            onClick={() => {
              //Transition to: Create New Classroom
              Actions.wildcamClassrooms.resetSelectedClassroom();
              Actions.wildcamClassrooms.setComponentMode(MODES.CREATE_NEW_CLASSROOM);
            }}
          />
        </Box>
        
        <Table className="table">
          <tbody>
          {props.classroomsList.map((classroom, index) => {
            return (
              <TableRow
                className="item"
                key={`classrooms-list_${index}`}
              >
                <td>{classroom.name}</td>
                <td className="actions-panel">
                  <Button
                    className="button"
                    icon={<EditIcon size="small" />}
                    label="Edit"
                    onClick={() => {
                      //Transition to: View One Classroom
                      Actions.wildcamClassrooms.setSelectedClassroom(classroom);
                      Actions.wildcamClassrooms.setComponentMode(MODES.VIEW_ONE_CLASSROOM);
                    }}
                  />
                </td>
              </TableRow>
            );
          })}
          </tbody>
        </Table>
      </Box>
    );
  }
  
  render_workingState() {
    return (
      <Box
        align="center"
        alignContent="center"
        className="status-box"
        direction="column"
        pad="medium"
      >
        <SpinningIcon />
        <Label>{TEXT.WORKING}</Label>
      </Box>
    );
  }
};

ClassroomsList.defaultProps = {
  classroomsList: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsList,
  classroomsStatus: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsStatus,
};

ClassroomsList.propTypes = {
  classroomsList: WILDCAMCLASSROOMS_PROPTYPES.classroomsList,
  classroomsStatus: WILDCAMCLASSROOMS_PROPTYPES.classroomsStatus,
};

export default ClassroomsList;
