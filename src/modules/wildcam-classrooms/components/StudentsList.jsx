/*
Students List
-------------

Renders a list of students attached to a WildCam Classroom or WildCam
Assignment. The user can optionally update the selected students within this
list.

Props:
- selectedClassroom: (required) the WildCam Classroom that we're listing
    students for.
- selectedAssignment: (optional) the WildCam Assignment that we're listing
    students for.
- selectedStudents: (optional) the list of students currently selected for this
    Assignment. Only used when viewing students in Assignments.
- doDeleteStudent: (optional) function that's called when the user deletes one
    student. (When viewing students for Classrooms only.)
- doSelectStudent: (optional) function that's called when the user selects OR
    unselects a student from the list of selected students. (When viewing
    students for Assignments only.)
    structure: function (studentObject) {}
- doSelectAllStudents: (optional) function that's call when the user selects OR
    unselects all students from the list. (For Assignments only.)
    structure: function (boolAddAllStudents) {}

Usage:
  <StudentsList
    selectedClassroom={myClassroom}
    doDeleteStudent={(student) => {
      ...
    }}
  />
  ...or...
  <StudentsList
    selectedClassroom={myClassroom}
    selectedAssignment={myAssignment}
    doSelectStudent={(student) => {
      ...
    }}
  />

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

import { TEXT } from '../text.js';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import CloseIcon from 'grommet/components/icons/base/Close';

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

class StudentsList extends React.Component {
  constructor() {
    super();
  }
  
  // ----------------------------------------------------------------
  
  render() {
    const props = this.props;
    
    //Sanity check
    if (!props.selectedClassroom) return null;
    
    //Are we viewing the student list of a Classroom or an Assignment?
    let listType = '';
    if (props.doDeleteStudent) listType = 'classroom';
    if (props.doSelectStudent) listType = 'assignment';
    
    const everyoneIsSelected = (props.selectedClassroom.students && props.selectedStudents)
      ? props.selectedClassroom.students.length === props.selectedStudents.length
      : false;
    
    return (
      <Box
        className="students-list"
        margin={{ horizontal: "none", vertical: "small" }}
        pad="small"
      >
        <Heading tag="h3">{TEXT.TITLES.STUDENTS}</Heading>
        {(listType === 'assignment' && props.doSelectAllStudents) && (
          <Box>
            <Button
              label={(!everyoneIsSelected)
                ? TEXT.ACTIONS.SELECT_ALL
                : TEXT.ACTIONS.UNSELECT_ALL
              }
              onClick={() => {
                props.doSelectAllStudents(!everyoneIsSelected);
              }}
            />
          </Box>
        )}
        <Table className="table">
          <tbody>
            {props.selectedClassroom.students.map((stud) => {
              return (
                <TableRow
                  className="item"
                  key={`students-list_${stud.id}`}
                >
                  <td>
                    <Heading tag="h4">{stud.zooniverseDisplayName}</Heading>
                  </td>
                  <td>
                    ({stud.zooniverseLogin})
                  </td>
                  {(listType === 'classroom') && (
                    <td>
                      <Box
                        className="actions-panel"
                        direction="row"
                        justify="end"
                      >
                        <Button
                          onClick={(e) => {
                            props.doDeleteStudent(stud);
                          }}
                        >
                          <CloseIcon size="small" />
                        </Button>
                      </Box>
                    </td>
                  )}
                  {(listType === 'assignment') && (
                    <td>
                      <Box
                        className="actions-panel"
                        direction="row"
                        justify="end"
                      >
                        <CheckBox
                          checked={props.selectedStudents && !!props.selectedStudents.find((s) => s === stud.id)}
                          onChange={(e) => {
                            props.doSelectStudent(stud.id);
                          }}
                        />
                      </Box>
                    </td>
                  )}
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </Box>
    );
  }
};

/*
--------------------------------------------------------------------------------
 */

StudentsList.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
  selectedStudents: [],
  doSelectStudent: null,
  doSelectAllStudents: null,
};

StudentsList.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
  selectedStudents: PropTypes.array,
  doSelectStudent: PropTypes.func,
  doSelectAllStudents: PropTypes.func,
};

export default StudentsList;