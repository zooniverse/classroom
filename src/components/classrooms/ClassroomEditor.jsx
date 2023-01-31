import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Paragraph from 'grommet/components/Paragraph';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import CloseIcon from 'grommet/components/icons/base/Close';
import EditIcon from 'grommet/components/icons/base/Edit';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import CopyToClipboard from 'react-copy-to-clipboard';
import ClassroomFormContainer from '../../containers/classrooms/ClassroomFormContainer';
import ConfirmationDialog from '../common/ConfirmationDialog';

import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_STATUS
} from '../../ducks/assignments';
import { i2aAssignmentNames } from '../../ducks/programs';
import { config } from '../../lib/config';

const ClassroomEditor = (props) => {
  const joinURL = props.selectedClassroom ?
    `${config.origin}/#/${props.selectedProgram.slug}/students/classrooms/${props.selectedClassroom.id}/join?token=${props.selectedClassroom.joinToken}` :
    '';

  // Get students and assignments only for this classroom.
  const students = (props.selectedClassroom && props.selectedClassroom.students) ? props.selectedClassroom.students : [];
  const assignments = (props.selectedClassroom && props.assignments && props.assignments[props.selectedClassroom.id])
    ? props.assignments[props.selectedClassroom.id]
    : [];

  const programURL = props.match.url.split('/'); // Remove once programs is in place with API

  if (!props.selectedClassroom && props.classroomsStatus === CLASSROOMS_STATUS.FETCHING) {
    return (
      <Box align="center" className="classroom-editor"><Spinning /></Box>
    );
  }

  if (!props.selectedClassroom && props.classroomsStatus === CLASSROOMS_STATUS.ERROR) {
    return (
      <Box className="classroom-editor" direction="column" colorIndex="light-1">
        <Box pad="small">
          <Anchor
            path={`/${programURL[1]}/educators`}
            icon={<LinkPreviousIcon size="small" />}
            label="Back to Classroom List"
            className="summary__return-link"
          />
        </Box>
        <Box pad="small">
          <Paragraph>Error: Classroom could not be loaded</Paragraph>
        </Box>
      </Box>
    );
  }

  if (props.selectedClassroom && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS) {
    return (
      <Box
        className="classroom-editor"
        direction="column"
      >
        <ConfirmationDialog
          confirmationButtonLabel="Remove"
          onConfirmation={props.removeStudentFromClassroom}
          onClose={props.closeConfirmationDialog}
          showConfirmationDialog={props.showConfirmationDialog}
        >
          <Paragraph size="small">This will remove the student record and their progress from the classroom.</Paragraph>
        </ConfirmationDialog>

        {props.showForm &&
          <ClassroomFormContainer heading="Edit Classroom" submitLabel="Update" />
        }

        <Box
          align="center"
          direction="row"
          justify="between"
          pad="small"
        >
          <Box flex={true}>
            <Paragraph align="start" size="small">Click an assignment column to toggle between percentages and number of classifications.</Paragraph>
          </Box>

          <CopyToClipboard
            className="join-link__button"
            text={joinURL}
            onCopy={() => { Actions.classrooms.setToastState({ status: 'ok', message: 'Copied join link.' }); }}
          >
            <Button type="button" label="Copy Join Link" />
          </CopyToClipboard>

          <Button
            className="button--primary"
            type="button"
            primary={true}
            label="Export Stats"
            onClick={props.selectedClassroom && props.selectedClassroom.students.length > 0 ? props.exportStats : null}
          />
        </Box>

        <Box
          className="manager-summary"
          pad="small"
        >
          <Box pad="small">
            <Anchor
              path={`/${programURL[1]}/educators`}
              icon={<LinkPreviousIcon size="small" />}
              label="Back to Classroom List"
              className="summary__return-link"
            />
          </Box>
          <Box direction="row">
            <Button
              className="manager-table__button--edit"
              type="button"
              onClick={props.editClassroom}
              icon={<EditIcon size="small" />}
            />
            <Heading tag="h2" strong={true}>{props.selectedClassroom.name}</Heading>
          </Box>
          <List>
            {(!(props.selectedClassroom.subject && props.selectedClassroom.subject.length > 0)) ? null :
              <ListItem>
                <Label className="secondary">Subject</Label>
                <span>{props.selectedClassroom.subject}</span>
              </ListItem>
            }
            {(!(props.selectedClassroom.school && props.selectedClassroom.school.length > 0)) ? null :
              <ListItem>
                <Label className="secondary">Institution</Label>
                <span>{props.selectedClassroom.school}</span>
              </ListItem>
            }
            {(!(props.selectedClassroom.description && props.selectedClassroom.description.length > 0)) ? null :
              <ListItem>
                <Label className="secondary">Description</Label>
                <span>{props.selectedClassroom.description}</span>
              </ListItem>
            }
            <ListItem>
              <Label className="secondary">Join Link</Label>
              <span>{joinURL}</span>
            </ListItem>
          </List>
        </Box>

        <Table className="manager-table">
          <thead className="manager-table__headers">
            <TableRow>
              <th id="student-name" scope="col">
                <span className="headers__header">Student Name/Zooniverse ID</span>
              </th>
              {assignments.map(ass => (
                <th id={`assignment-${ass.id}`} scope="col">
                  <Button
                    className="headers__header"
                    onClick={props.toggleCountView.bind(null)}
                    plain={true}
                  >
                    {ass.name}
                  </Button>
                </th>
              ))}
              <th id="student-remove" scope="col">
                <span className="headers__header">Remove Student</span>
              </th>
            </TableRow>
          </thead>

          <tbody className="manager-table__body">
            {props.assignmentsStatus === ASSIGNMENTS_STATUS.FETCHING && (
              <TableRow className="manager-table__row-data">
                <td colSpan="4"><Spinning /></td>
              </TableRow>
            )}

            {props.assignmentsStatus === ASSIGNMENTS_STATUS.SUCCESS &&
            assignments &&
            assignments.length > 0 &&
            students.length === 0 && (
              <TableRow className="manager-table__row-data">
                <td colSpan="4"><Paragraph>No students have joined yet.</Paragraph></td>
              </TableRow>
            )}

            {props.assignmentsStatus === ASSIGNMENTS_STATUS.SUCCESS &&
            assignments &&
            assignments.length > 0 &&
            students.length > 0 &&
              students.map((student) => {
                const galaxyAssignment = assignments.filter(
                  assignment => assignment.name === i2aAssignmentNames.galaxy);
                const hubbleAssignment = assignments.filter(
                  assignment => assignment.name === i2aAssignmentNames.hubble);

                // Why are the ids in the student_user_id property numbers?!?!?!
                const galaxyStudentData = galaxyAssignment[0].studentAssignmentsData.filter(
                  data => data.attributes.student_user_id.toString() === student.id);
                const hubbleStudentData = hubbleAssignment[0].studentAssignmentsData.filter(
                  data => data.attributes.student_user_id.toString() === student.id);

                const galaxyPercentage = ((galaxyStudentData[0].attributes.classifications_count / (+galaxyAssignment[0].metadata.classifications_target)).toFixed(2) * 100);
                const hubblePercentage = ((hubbleStudentData[0].attributes.classifications_count / (+hubbleAssignment[0].metadata.classifications_target)).toFixed(2) * 100);

                const galaxyCount = `${galaxyStudentData[0].attributes.classifications_count} / ${+galaxyAssignment[0].metadata.classifications_target}`;
                const hubbleCount = `${hubbleStudentData[0].attributes.classifications_count} / ${+hubbleAssignment[0].metadata.classifications_target}`;

                return (<TableRow className="manager-table__row-data" key={`classroom-student-${student.id}`}>
                  <td headers="student-name">
                    {(student.zooniverseDisplayName && student.zooniverseDisplayName.length > 0)
                      ? <span>{student.zooniverseDisplayName}</span>
                      : <span className="secondary">{student.zooniverseLogin}</span> }
                  </td>
                  {assignments.map((ass, i) => {
                    const studentData = ass.studentAssignmentsData.filter(data => data.attributes.student_user_id.toString() === student.id)
                    const studentCount = studentData[0]?.attributes.classifications_count || 0
                    const targetCount = +ass.metadata.classifications_target
                    const resultsAsPercentage = (studentCount / targetCount).toFixed(2) * 100
                    const resultsAsWholeNumbers = `${studentCount} / ${targetCount}`

                    return (
                      <td
                        headers={`assignment-${ass.id}`}
                        key={`assignment-${ass.id}-${i}`}
                      >
                        {props.showCounts ? resultsAsWholeNumbers : `${resultsAsPercentage <= 100 ? resultsAsPercentage : 100}%`}
                      </td>
                    )

                    /*return (
                      <td headers={`assignment-${ass.id}`}>
                        {props.showCounts ? resultsAsWholeNumbers : `${resultsAsPercentage <= 100 ? resultsAsPercentage : 100}%`}
                      </td>
                    )*/
                  })}

                  {/*
                  <td headers="assignment-galaxy">{props.showCounts ? galaxyCount : `${galaxyPercentage <= 100 ? galaxyPercentage : 100}%`}</td>
                  <td headers="assignment-hubble">{props.showCounts ? hubbleCount : `${hubblePercentage <= 100 ? hubblePercentage : 100}%`}</td>
                  */}
                  <td headers="student-remove">
                    <Button
                      className="manager-table__button--delete"
                      type="button"
                      onClick={props.maybeRemoveStudentFromClassroom.bind(null, props.selectedClassroom.id, student.id)}
                      icon={<CloseIcon size="small" />}
                    />
                  </td>
                </TableRow>);
              })}
          </tbody>

        </Table>
      </Box>
    );
  }

  return null;
};

ClassroomEditor.defaultProps = {
  editClassroom: () => {},
  exportStats: () => {},
  selectClassroom: () => {},
  removeStudentFromClassroom: () => {},
  //----------------
  showConfirmationDialog: false,
  showCounts: false,
  showForm: false,
  toggleFormVisibility: Actions.classrooms.toggleFormVisibility,
  //----------------
  ...CLASSROOMS_INITIAL_STATE
};

ClassroomEditor.propTypes = {
  editClassroom: PropTypes.func,
  exportStats: PropTypes.func,
  selectClassroom: PropTypes.func,
  removeStudentFromClassroom: PropTypes.func,
  //----------------
  showConfirmationDialog: PropTypes.bool,
  showCounts: PropTypes.bool,
  showForm: PropTypes.bool,
  toggleFormVisibility: PropTypes.func,
  //----------------
  ...CLASSROOMS_PROPTYPES
};

export default ClassroomEditor;
