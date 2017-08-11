import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_STATUS, ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';

const ClassroomManager = (props) => {
  return (
    <Box
      className="classroom-manager"
      direction="column"
      colorIndex="grey-5"
      full={{ horizontal: true, vertical: false }}
      pad="large"
    >
      <Box align="center" direction="row" justify="center">
        <Paragraph align="start" size="small">{props.classroomInstructions}</Paragraph>
        <Button type="button" primary={true} label="Create New Classroom" onClick={props.onCreateNewClassroom} />
      </Box>
      <Box>
        {(props.classrooms.length === 0 && props.classroomsStatus === CLASSROOMS_STATUS.FETCHING) &&
          <Spinning />}
        {(props.classrooms.length > 0 && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS) &&
          <Table className="classroom-manager__table"
            summary="Your classrooms and linked assignments, assignment percentage completed, export data links, and assignment project links (row headings)"
          >
            <caption className="table__caption">Your Classrooms</caption>
            <thead className="table__headers">
              <TableRow>
                <th id="assignments" scope="col"></th>
                <th id="completed" scope="col">Completed</th>
                <th id="export" scope="col">Export Data</th>
                <th id="view-project" scope="col">View Project</th>
              </TableRow>
            </thead>
            {props.classrooms.map((classroom) => {
              // Can we get linked assignments with classrooms in single get request?
              // No, if we want this, then we need to open an issue with the API
              // TODO replace classifications_target with calculated percentage
              return (
                <tbody className="table__body" key={classroom.id}>
                  <TableRow>
                    <th className="table__row-header" id="classroom" colSpan="4" scope="colgroup">{classroom.name}</th>
                  </TableRow>
                  {(!props.assignments && props.assignmentsStatus === ASSIGNMENTS_STATUS.FETCHING) &&
                    <Spinning />}
                  {(props.assignments[classroom.id] && props.assignmentsStatus === ASSIGNMENTS_STATUS.SUCCESS) &&
                    props.assignments[classroom.id].map((assignment) => {
                      return (
                        <TableRow className="table__row-data" key={assignment.id}>
                          <td headers="classroom assignments">{assignment.name}</td>
                          <td headers="classroom completed">{assignment.metadata.classifications_target}</td>
                          <td headers="classroom export">Export data link placeholder</td>
                          <td headers="classroom view-project">project link placeholder</td>
                        </TableRow>
                      );
                    })}
                </tbody>
              );
            })}
          </Table>}
      </Box>
    </Box>
  );
};

ClassroomManager.defaultProps = {
  classroomInstructions: '',
  onCreateNewClassroom: () => {},
  ...CLASSROOMS_INITIAL_STATE,
  ...ASSIGNMENTS_INITIAL_STATE
};

ClassroomManager.propTypes = {
  classroomInstructions: PropTypes.string,
  onCreateNewClassroom: PropTypes.func,
  ...CLASSROOMS_PROPTYPES,
  ...ASSIGNMENTS_PROPTYPES
};

export default ClassroomManager;
