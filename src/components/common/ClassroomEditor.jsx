import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
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
        <Box flex="grow">
          <Paragraph align="start" size="small">Click a project column to toggle between percentages and number of classifications.</Paragraph>
        </Box>
        <Box align="center">
          <b>Classroom Join Link</b>
          <span>{joinURL}</span>
        </Box>
        <Button type="button" primary={true} label="Export Grades" onClick={()=>{}} />
      </Box>
      
      <Table className="manager-table">
        <thead className="manager-table__headers">
          <TableRow>
            <th className="manager-table__summary" colSpan="4">
              <Anchor
                onClick={()=>{console.log(props.selectClassroom); props.selectClassroom(null)}}
                icon={<LinkPreviousIcon size="small" />}
                label="Back to Classroom List"
                className="summary__return-link"
              />
              <Heading tag="h2" strong={true}>{props.selectedClassroom.name}</Heading>
            </th>
          </TableRow>
        </thead>
        <thead className="manager-table__headers">
          <TableRow>
            <th scope="col" className="headers__header">Student Name/Zooniverse ID</th>
            <th scope="col" className="headers__header">Introduction</th>
            <th scope="col" className="headers__header">Galaxy Zoo 101</th>
            <th scope="col" className="headers__header">Hubble's Law</th>
          </TableRow>
        </thead>
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
