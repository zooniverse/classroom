/*
ClassroomsList
--------------

Component for listing all classrooms.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import StatusWorking from './StatusWorking';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import AddIcon from 'grommet/components/icons/base/Add';
import EditIcon from 'grommet/components/icons/base/Edit';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';
  
const TEXT = {
  WORKING: 'Working...',
  VIEW: 'View',
  CREATE_NEW_CLASSROOM: 'Create new classroom',
};

class ClassroomsList extends React.Component {
  constructor() {
    super();
    
    //Initialise:
    //Set data to match view state
    Actions.wildcamClassrooms.resetSelectedClassroom();
    //TODO: Reset selectedAssignment
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
        {(() => {
          if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
            return this.render_readyState();
          } else if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING || props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING) {
            return this.render_workingState();
          }
        })()}
        
        <ScrollToTopOnMount />
      </Box>
    );
  }
  
  render_readyState() {
    const props = this.props;
    
    return (
      <Box>
        <Table className="table">
          <tbody>
          {props.classroomsList.map((classroom, index) => {
            return (
              <TableRow
                className="item"
                key={`classrooms-list_${index}`}
              >
                <td>
                  <Heading tag="h3">{classroom.name}</Heading>
                </td>
                <td>
                  <Box
                    className="actions-panel"
                    direction="row"
                    justify="end"
                  >
                    <Button
                      className="button"
                      icon={<LinkNextIcon size="small" />}
                      label={TEXT.VIEW}
                      onClick={() => {
                        //Transition to: View One Classroom
                        props.history && props.history.push(`${props.match.url.replace(/\/+$/,'')}/classrooms/${classroom.id}`);
                      }}
                    />
                  </Box>
                </td>
              </TableRow>
            );
          })}
          </tbody>
        </Table>
        
        <Box
          className="actions-panel"
          direction="row"
          justify="end"
          pad="medium"
        >
          <Button
            className="button"
            icon={<AddIcon size="small" />}
            label={TEXT.CREATE_NEW_CLASSROOM}
            onClick={() => {
              //Transition to: Create New Classroom
              props.history && props.history.push(`${props.match.url.replace(/\/+$/,'')}/classrooms/new`);
            }}
          />
        </Box>
      </Box>
    );
  }
  
  render_workingState() {
    return (
      <StatusWorking />
    );
  }
};

ClassroomsList.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

ClassroomsList.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(ClassroomsList);
