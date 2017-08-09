import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import { Actions } from 'jumpstate';

const ClassroomManager = (props) => {
  const renderClassroomTableRow = () => {
    return props.classrooms.map((classroom) => {
      // Can we get linked assignments with classrooms in single get request?
      // TODO replace classifications_target with calculated percentage
      const linkedAssignments = [
        { attributes: { name: 'fake assignment', id: '35' },
          metadata: { classifications_target: '20' }
        },
        { attributes: { name: 'another', id: '37' },
          metadata: { classifications_target: '26' }
        }]; // Just for building out UI
      return (
        <span key={classroom.id}>
          <TableRow>
            <td>{classroom.attributes.name}</td>
            <td></td>
            <td></td>
            <td></td>
          </TableRow>
          {linkedAssignments.map((assignment) => {
            return (
              <TableRow key={assignment.attributes.id}>
                <td headers="assignments">{assignment.attributes.name}</td>
                <td headers="completed">{assignment.metadata.classifications_target}</td>
                <td headers="export">Export data link placeholder</td>
                <td headers="view-project">project link placeholder</td>
              </TableRow>
            );
          })}
        </span>
      );
    });
  };

  return (
    <Box direction="column" colorIndex="light-2" full={true}>
      <Box direction="row">
        <Paragraph align="start" size="small">{props.classroomInstructions}</Paragraph>
        <Button type="button" label="Create New Classroom" onClick={props.onCreateNewClassroom} />
      </Box>
      <Box>
        {(props.classrooms.length === 0 && props.fetching) &&
          <Spinning />}
        {(props.classrooms.length > 0 && !props.fetching) &&
          <Table summary="Your classrooms and linked assignments, assignment percentage completed, export data links, and assignment project links (row headings)">
            <caption>Your Classrooms</caption>
            <tbody>
              <TableRow>
                <th scope="col" id="assignments">Assignments</th>
                <th scope="col" id="completed">Completed</th>
                <th scope="col" id="export">Export Data</th>
                <th scope="col" id="view-project">View Project</th>
              </TableRow>
              {renderClassroomTableRow()}
            </tbody>
          </Table>}
      </Box>
    </Box>
  );
};

ClassroomManager.defaultProps = {
  classroomInstructions: '',
  fetching: false,
  onCreateNewClassroom: () => {}
};

ClassroomManager.propTypes = {
  classrooms: PropTypes.arrayOf(PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string
    }),
    id: PropTypes.string
  })),
  classroomInstructions: PropTypes.string,
  fetching: PropTypes.bool,
  onCreateNewClassroom: PropTypes.func
};

export default ClassroomManager;
