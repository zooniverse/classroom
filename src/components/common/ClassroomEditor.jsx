import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Paragraph from 'grommet/components/Paragraph';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';

import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';

const ClassroomEditor = (props) => {
  
  if (!props.selectedClassroom) return null;
  
  const joinURL = `https://${window.location.host}/students/classrooms/join?id=${props.selectedClassroom.id}&token=${props.selectedClassroom.joinToken}`;
  const students = (props.selectedClassroom.students) ? props.selectedClassroom.students : [];
  
  console.log('--------');
  console.log(props);
  console.log('--------');
  
  return (
    <Box
      className="classroom-editor"
      direction="column"
      colorIndex="grey-5"
      full={{ horizontal: true, vertical: false }}
      pad="large"
    >
      <Box
        align="center"
        direction="row"
        justify="between"
        pad="large"
      >
        <Box flex={true}>
          <Paragraph align="start" size="small">Click a project column to toggle between percentages and number of classifications.</Paragraph>
        </Box>
        <Box align="center" className="join-link">
          <b>Classroom Join Link</b>
          <span>{joinURL}</span>
        </Box>
        <Button type="button" primary={true} label="Export Grades" onClick={()=>{}} />
      </Box>
      
      <Table className="manager-table">
        <thead className="manager-table__headers">
          <TableRow>
            <th id="classroom" className="manager-table__summary" colSpan="4">
              <Anchor
                onClick={()=>{console.log(props.selectClassroom); props.selectClassroom(null)}}
                icon={<LinkPreviousIcon size="small" />}
                label="Back to Classroom List"
                className="summary__return-link"
              />
              <Heading tag="h2" strong={true}>{props.selectedClassroom.name}</Heading>
              <List>
                {(!(props.selectedClassroom.subject && props.selectedClassroom.subject.length > 0)) ? null :
                  <ListItem justify="between" separator="horizontal">
                    <span className="secondary">Subject</span>
                    <span>{props.selectedClassroom.subject}</span>
                  </ListItem>
                }
                {(!(props.selectedClassroom.school && props.selectedClassroom.school.length > 0)) ? null :
                  <ListItem justify="between" separator="horizontal">
                    <span className="secondary">Institution</span>
                    <span>{props.selectedClassroom.school}</span>
                  </ListItem>
                }
                {(!(props.selectedClassroom.description && props.selectedClassroom.description.length > 0)) ? null :
                  <ListItem justify="between" separator="horizontal">
                    <span className="secondary">Description</span>
                    <span>{props.selectedClassroom.description}</span>
                  </ListItem>
                }
              </List>
            </th>
          </TableRow>
          <TableRow>
            <th id="student-name" scope="col" className="manager-table__row-header">Student Name/Zooniverse ID</th>
            <th id="assignment-intro" scope="col" className="manager-table__row-header">Introduction</th>
            <th id="assignment-galaxy" scope="col" className="manager-table__row-header">Galaxy Zoo 101</th>
            <th id="assignment-hubble" scope="col" className="manager-table__row-header">Hubble's Law</th>
          </TableRow>
        </thead>
        
        {students.map((student) => {
          return (
            <tbody className="manager-table__body" key={`classroom-student-${student.id}`}>
              <TableRow>
                <td headers="student-name">
                  {(student.zooniverseDisplayName && student.zooniverseDisplayName.length > 0)
                    ? <span>{student.zooniverseDisplayName}</span>
                    : <span className="secondary">{student.zooniverseLogin}</span> }
                </td>
                <td headers="assignment-intro">...</td>
                <td headers="assignment-galaxy">...</td>
                <td headers="assignment-hubble">...</td>
              </TableRow>
            </tbody>
          );
        })}
        
        
      </Table>
    </Box>
  );
};

ClassroomEditor.defaultProps = {
  selectClassroom: () => {},
  ...CLASSROOMS_INITIAL_STATE,
};

ClassroomEditor.propTypes = {
  selectClassroom: PropTypes.func,
  ...CLASSROOMS_PROPTYPES,
};

export default ClassroomEditor;
