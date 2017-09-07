import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import { Link } from 'react-router-dom';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import EditIcon from 'grommet/components/icons/base/Edit';
import CloseIcon from 'grommet/components/icons/base/Close';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_STATUS, ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';

import ClassroomFormContainer from '../../containers/classrooms/ClassroomFormContainer';
import ConfirmationDialog from '../common/ConfirmationDialog';

const ClassroomsManager = (props) => {
  // TODO: Pagination for Classrooms
  const classroomInstructions = 'First, make sure your students have set up a Zooniverse account. Then create a classroom and share the classroom\'s unique join URL with your students to keep track of their progress as they work through each assignment. Students must be logged in to their Zooniverse accounts first to be able to use the join link. Share the URL under View Project with your students for them to complete the assignment.';

  return (
    <Box className="classrooms-manager">
      <Box align="center" direction="row" justify="between">
        <Paragraph align="start" size="small">{classroomInstructions}</Paragraph>
        <Button type="button" primary={true} label="Create New Classroom" onClick={props.toggleFormVisibility} />
      </Box>
      <ConfirmationDialog
        confirmationButtonLabel="Delete"
        onConfirmation={props.deleteClassroom}
        onClose={props.closeConfirmationDialog}
        showConfirmationDialog={props.showConfirmationDialog}
      >
        <Paragraph size="small">Deleting a classroom will also delete the associated assignments.</Paragraph>
      </ConfirmationDialog>
      {props.showForm &&
        <Layer closer={true} onClose={props.toggleFormVisibility}>
          <ClassroomFormContainer heading="Create Classroom" submitLabel="Create" />
        </Layer>}
      {(props.classrooms.length === 0 && props.classroomsStatus === CLASSROOMS_STATUS.FETCHING) &&
        <Box align="center"><Spinning /></Box>}
      {props.classrooms.length === 0 && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS &&
        <Paragraph>No classrooms have been created yet.</Paragraph>}
      {(props.classrooms.length > 0 && props.classroomsStatus === CLASSROOMS_STATUS.SUCCESS) &&
        <Table className="manager-table">
          <thead className="manager-table__headers">
            <TableRow>
              <th id="assignments" scope="col" className="manager-table__caption">Your Classrooms</th>
              <th id="completed" scope="col" className="headers__header">Completed</th>
              <th id="export" scope="col" className="headers__header">Export Data</th>
              <th id="view-project" scope="col" className="headers__header">View Project</th>
            </TableRow>
          </thead>
          {props.classrooms.map((classroom) => {
            // TODO update URL once we have staging/production hosts

            const joinURL = `${window.location.host}/#${props.selectedProgram.slug}/students/classrooms/${classroom.id}/join?token=${classroom.joinToken}`;
            // Can we get linked assignments with classrooms in single get request?
            // No, if we want this, then we need to open an issue with the API
            // TODO replace classifications_target with calculated percentage

            // The trailing slash is inconsistent in React Router 4's match.url property...
            const editURL = (props.match.url[props.match.url.length - 1] === '/') ? props.match.url : `${props.match.url}/`;
            return (
              <tbody className="manager-table__body" key={classroom.id}>
                <TableRow>
                  <th className="manager-table__row-header" id="classroom" colSpan="4" scope="colgroup">
                    <Box pad="none" margin="none" justify="between" direction="row">
                      <span>
                        <Button
                          className="manager-table__button--edit"
                          path={`${editURL}classrooms/${classroom.id}`}
                          onClick={() => { Actions.classrooms.selectClassroom(classroom); }}
                          icon={<EditIcon size="small" />}
                        />
                        {' '}{classroom.name}{' '}
                        <CopyToClipboard text={joinURL} onCopy={() => { Actions.classrooms.setToastState({ status: 'ok', message: 'Copied join link.' }); }}>
                          <Button type="button" className="manager-table__button--as-link" plain={true} onClick={() => {}}>
                            Copy Join Link
                          </Button>
                        </CopyToClipboard>
                      </span>
                      <Button className="manager-table__button--delete" type="button" onClick={props.maybeDeleteClassroom.bind(null, classroom.id)}>
                        <CloseIcon size="small" />
                      </Button>
                    </Box>
                  </th>
                </TableRow>
                {(props.assignments[classroom.id] &&
                  props.assignments[classroom.id].length === 0 &&
                  props.assignmentsStatus === ASSIGNMENTS_STATUS.FETCHING) &&
                  <TableRow className="manager-table__row-data">
                    <td colSpan="4"><Spinning /></td>
                  </TableRow>}
                {(props.assignments[classroom.id] &&
                  props.assignments[classroom.id].length === 0 &&
                  props.assignmentsStatus === ASSIGNMENTS_STATUS.SUCCESS) &&
                  <TableRow className="manager-table__row-data">
                    <td colSpan="4"><Paragraph>No assignments have been created yet.</Paragraph></td>
                  </TableRow>}
                {(props.assignments[classroom.id] && props.assignmentsStatus === ASSIGNMENTS_STATUS.SUCCESS) &&
                  props.assignments[classroom.id].map((assignment) => {
                    return (
                      <TableRow className="manager-table__row-data" key={assignment.id}>
                        <td headers="classroom assignments">{assignment.name}</td>
                        <td headers="classroom completed">
                          {(assignment.metadata && assignment.metadata.classifications_target) ?
                            assignment.metadata.classifications_target : ''}
                        </td>
                        <td headers="classroom export">
                          <Button
                            type="button"
                            className="manager-table__button--as-link"
                            plain={true}
                            onClick={() => {}}
                          >
                            Export Data{' '}
                            <i className="fa fa-arrow-down" aria-hidden="true"></i>
                          </Button>
                        </td>
                        <td headers="classroom view-project">
                          <Anchor
                            className="manager-table__link"
                            href="#"
                          >
                            Project Page{' '}
                            <i className="fa fa-mail-forward" aria-hidden="true"></i>
                          </Anchor>
                        </td>
                      </TableRow>
                    );
                  })}
              </tbody>
            );
          })}
        </Table>}
    </Box>
  );
};

ClassroomsManager.defaultProps = {
  classroomInstructions: '',
  closeConfirmationDialog: () => {},
  deleteClassroom: () => {},
  maybeDeleteClassroom: () => {},
  selectClassroom: () => {},
  showForm: false,
  toggleFormVisibility: Actions.classrooms.toggleFormVisibility,
  ...CLASSROOMS_INITIAL_STATE,
  ...ASSIGNMENTS_INITIAL_STATE
};

ClassroomsManager.propTypes = {
  classroomInstructions: PropTypes.string,
  closeConfirmationDialog: PropTypes.func,
  deleteClassroom: PropTypes.func,
  maybeDeleteClassroom: PropTypes.func,
  selectClassroom: PropTypes.func,
  showForm: PropTypes.bool,
  toggleFormVisibility: PropTypes.func,
  ...CLASSROOMS_PROPTYPES,
  ...ASSIGNMENTS_PROPTYPES
};

export default ClassroomsManager;
