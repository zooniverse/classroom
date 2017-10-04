import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Actions } from 'jumpstate';
import Box from 'grommet/components/Box';
import Toast from 'grommet/components/Toast';

import ClassroomsManagerContainer from '../../containers/classrooms/ClassroomsManagerContainer';
import ClassroomEditorContainer from '../../containers/classrooms/ClassroomEditorContainer';

import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';

const ClassroomsLayout = ({ classroomInstructions, match, toast }) => {
  return (
    <Box
      className="classrooms-layout"
      direction="column"
      colorIndex="grey-5"
      full={{ horizontal: true, vertical: false }}
      pad="large"
    >
      {toast && toast.message &&
        <Toast
          status={toast.status ? toast.status : 'unknown'}
          onClose={() => { Actions.classrooms.setToastState({ status: null, message: null }); }}
        >
          {toast.message}
        </Toast>}
      <Switch>
        <Route exact path={`${match.url}`} component={ClassroomsManagerContainer} classroomInstructions={classroomInstructions} />
        <Route path={`${match.url}/classrooms/:id`} component={ClassroomEditorContainer} />
        <Redirect from={`${match.url}/classrooms`} to={`${match.url}`} />
      </Switch>
    </Box>
  );
};

ClassroomsLayout.defaultProps = {
  ...CLASSROOMS_INITIAL_STATE
};

ClassroomsLayout.propTypes = {
  ...CLASSROOMS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    toast: state.classrooms.toast
  };
}

export default connect(mapStateToProps)(ClassroomsLayout);
