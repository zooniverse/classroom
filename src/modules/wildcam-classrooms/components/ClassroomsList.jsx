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
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import AddIcon from 'grommet/components/icons/base/Add';
import EditIcon from 'grommet/components/icons/base/Edit';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
} from '../ducks/index.js';

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
        
        <Box pad="medium">
          <Button
            icon={<AddIcon size="small" />}
            onClick={() => {
              Actions.wildcamClassrooms.resetSelectedClassroom();
              Actions.wildcamClassrooms.setComponentMode(MODES.CREATE_NEW_CLASSROOM);
            }}
          >
            Create new classroom
          </Button>
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
                <td>
                  <Button
                    icon={<EditIcon size="small" />}
                    onClick={() => {
                      console.log('+++ ');
                      Actions.wildcamClassrooms.setSelectedClassroom(classroom);
                      Actions.wildcamClassrooms.setComponentMode(MODES.VIEW_ONE_CLASSROOM);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </TableRow>
            );
          })}
          </tbody>
        </Table>
      </Box>
    );
  }
};

ClassroomsList.defaultProps = {
  classroomsList: WILDCAMCLASSROOMS_INITIAL_STATE.classroomsList,
};

ClassroomsList.propTypes = {
  classroomsList: WILDCAMCLASSROOMS_PROPTYPES.classroomsList,
};

export default ClassroomsList;
