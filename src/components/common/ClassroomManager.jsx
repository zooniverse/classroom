import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Toast from 'grommet/components/Toast';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import CloseIcon from 'grommet/components/icons/base/Close';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  ASSIGNMENTS_STATUS, ASSIGNMENTS_INITIAL_STATE, ASSIGNMENTS_PROPTYPES
} from '../../ducks/assignments';
import ClassroomCreateFormContainer from '../../containers/common/ClassroomCreateFormContainer';

const ClassroomManager = (props) => {
  // TODO: Pagination for Classrooms
  return (
    <Box
      className="classroom-manager"
      direction="column"
      colorIndex="grey-5"
      full={{ horizontal: true, vertical: false }}
      pad="large"
    >
      <Box align="center" direction="row" justify="between">
        <Paragraph align="start" size="small">{props.classroomInstructions}</Paragraph>
        <Button type="button" primary={true} label="Create New Classroom" onClick={props.toggleFormVisibility} />
      </Box>
      {props.showCreateForm &&
        <Layer closer={true} onClose={props.toggleFormVisibility}>
          <ClassroomCreateFormContainer />
        </Layer>}
      {props.toast && props.toast.message &&
        <Toast status={props.toast.status ? props.toast.status : 'unknown'} onClose={props.resetToastState}>
          {props.toast.message}
        </Toast>}
      {(props.classrooms.length === 0 && props.classroomsStatus === CLASSROOMS_STATUS.FETCHING) &&
        <Spinning />}
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
            const joinURL = `https://${window.location.host}/students/classrooms/join?id=${classroom.id}&token=${classroom.joinToken}`;
            // Can we get linked assignments with classrooms in single get request?
            // No, if we want this, then we need to open an issue with the API
            // TODO replace classifications_target with calculated percentage
            return (
              <tbody className="manager-table__body" key={classroom.id}>
                <TableRow>
                  <th className="manager-table__row-header" id="classroom" colSpan="4" scope="colgroup">
                    <Box pad="none" margin="none" justify="between" direction="row">
                      <span>
                        {classroom.name}{' '}
                        <CopyToClipboard text={joinURL} onCopy={props.copyJoinLink}>
                          <Button type="button" className="manager-table__button--as-link" plain={true} onClick={() => {}}>
                            Copy Join Link
                          </Button>
                        </CopyToClipboard>
                      </span>
                      <Button className="manager-table__button--delete" type="button" onClick={props.deleteClassroom.bind(null, classroom.id)}>
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

ClassroomManager.defaultProps = {
  classroomInstructions: '',
  copyJoinLink: () => {},
  deleteClassroom: () => {},
  resetToastState: () => {},
  showCreateForm: false,
  toggleFormVisibility: Actions.classrooms.toggleCreateFormVisibility,
  toast: null,
  ...CLASSROOMS_INITIAL_STATE,
  ...ASSIGNMENTS_INITIAL_STATE
};

ClassroomManager.propTypes = {
  classroomInstructions: PropTypes.string,
  copyJoinLink: PropTypes.func,
  deleteClassroom: PropTypes.func,
  resetToastState: PropTypes.func,
  showCreateForm: PropTypes.bool,
  toggleFormVisibility: PropTypes.func,
  toast: PropTypes.shape({
    message: null,
    status: null
  }),
  ...CLASSROOMS_PROPTYPES,
  ...ASSIGNMENTS_PROPTYPES
};

export default ClassroomManager;
