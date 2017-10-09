import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import CopyToClipboard from 'react-copy-to-clipboard';
import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import EditIcon from 'grommet/components/icons/base/Edit';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';

import CaesarExportModal from './CaesarExportModal';
import { config } from '../../lib/config';
import {
  ASSIGNMENTS_STATUS, ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';
import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';

const AstroClassroomsTable = (props) => {
  // TODO: Replace classroom.zooniverse_user_group_id with actual serialized user group id when available
  const assignmentsMetadata = (props.selectedProgram && props.selectedProgram.metadata) ? props.selectedProgram.metadata.assignments : '';
  return (
    <Box>
      <CaesarExportModal onClose={props.onExportModalClose} assignment={props.assignmentToExport} />

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
              {((props.assignments[classroom.id] &&
                props.assignments[classroom.id].length === 0 &&
                props.assignmentsStatus === ASSIGNMENTS_STATUS.FETCHING) ||
                (Object.keys(props.assignments).length === 0 &&
                props.assignmentsStatus === ASSIGNMENTS_STATUS.FETCHING)) &&
                  <TableRow className="manager-table__row-data">
                    <td colSpan="4"><Spinning /></td>
                  </TableRow>}
              {(props.assignments[classroom.id] &&
                props.assignments[classroom.id].length === 0 &&
                props.assignmentsStatus === ASSIGNMENTS_STATUS.SUCCESS) &&
                <TableRow className="manager-table__row-data">
                  <td colSpan="4"><Paragraph>No assignments have been created yet.</Paragraph></td>
                </TableRow>}
              {(props.assignments[classroom.id] &&
                props.assignmentsStatus === ASSIGNMENTS_STATUS.SUCCESS) &&
                props.assignments[classroom.id].map((assignment) => {
                  const projectUrl = (assignmentsMetadata && assignmentsMetadata[assignment.workflowId]) ?
                    `${config.zooniverse}/projects/${assignmentsMetadata[assignment.workflowId].slug}/classify?group=${classroom.attributes.zooniverse_group_id}` :
                    null;

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
                          onClick={props.showExportModal.bind(null, assignment, classroom)}
                        >
                          Export Data{' '}
                          <i className="fa fa-arrow-down" aria-hidden="true" />
                        </Button>
                      </td>
                      <td headers="classroom view-project">
                        {projectUrl &&
                          <Anchor
                            className="manager-table__link"
                            href={projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Project Page{' '}
                            <i className="fa fa-mail-forward" aria-hidden="true" />
                          </Anchor>}
                        {!projectUrl &&
                          <span>Unavailable</span>}
                      </td>
                    </TableRow>
                  );
                })}
            </tbody>
          );
        })}
      </Table>
    </Box>
  );
};

AstroClassroomsTable.defaultProps = {
  assignmentToExport: {},
  closeConfirmationDialog: () => {},
  maybeDeleteClassroom: () => {},
  selectClassroom: () => {},
  showExportModal: () => {},
  ...CLASSROOMS_INITIAL_STATE,
  ...ASSIGNMENTS_INITIAL_STATE
};

AstroClassroomsTable.propTypes = {
  assignmentToExport: PropTypes.object,
  closeConfirmationDialog: PropTypes.func,
  maybeDeleteClassroom: PropTypes.func,
  selectClassroom: PropTypes.func,
  showExportModal: PropTypes.func,
  ...CLASSROOMS_PROPTYPES,
  ...ASSIGNMENTS_PROPTYPES
};

export default AstroClassroomsTable;
