import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Actions } from 'jumpstate';
import Box from 'grommet/components/Box';
import Toast from 'grommet/components/Toast';

import WildCamClassroomsManagerContainer from '../../containers/wildcam-classrooms/WildCamClassroomsManagerContainer';
import WildCamClassroomEditorContainer from '../../containers/wildcam-classrooms/WildCamClassroomEditorContainer';

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
        <Route exact path={`${match.url}/classrooms/:id`} component={WildCamClassroomEditorContainer} />
        <Route path={`${match.url}`} component={WildCamClassroomsManagerContainer} classroomInstructions={classroomInstructions} />
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
