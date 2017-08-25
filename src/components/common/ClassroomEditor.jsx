import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import Box from 'grommet/components/Box';
import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';

const ClassroomEditor = (props) => {
  return (
    <Box
      className="classroom-editor"
      direction="column"
      colorIndex="grey-5"
      full={{ horizontal: true, vertical: false }}
      pad="large"
    >
      ...
    </Box>
  );
};

ClassroomEditor.defaultProps = {
  ...CLASSROOMS_INITIAL_STATE,
};

ClassroomEditor.propTypes = {
  ...CLASSROOMS_PROPTYPES,
};

export default ClassroomEditor;
