/*
Subjects List
-------------

Renders a list of subjects attached to a WildCam Classroom or WildCam
Assignment. The user can optionally update the selected students within this
list.

Props:
- selectedClassroom: (required)
- selectedAssignment: (optional) the WildCam Assignment that we're listing
    subjects for. If null, means we're creating a new Assignment.
- history/location/match: (required) for routing purposes
- wccwcmMapPath: (required) for routing purposes

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';
import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES,
} from '../../wildcam-map/ducks/index.js';

/*
--------------------------------------------------------------------------------
 */

const TEXT = {
  ACTIONS: {
    SELECT_SUBJECTS: 'Select subjects',
  },
  HEADINGS: {
    SUBJECTS: 'Subjects',
  }
}
  
/*
--------------------------------------------------------------------------------
 */

class StudentsList extends React.Component {
  constructor() {
    super();
  }
  
  // ----------------------------------------------------------------
  
  componentDidMount() {
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialise(nextProps);
  }
  
  /*  //Initialise: populate the form with students
   */
  initialise(props = this.props) {
    //Sanity check
    if (!props.selectedClassroom) return;
    
  }
  
  // ----------------------------------------------------------------
  
  updateForm(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value
      }
    });
  }

  // ----------------------------------------------------------------

  render() {
    const props = this.props;
    const state = this.state;
    
    //Sanity check
    if (!props.selectedClassroom) return null;
    
    return (
      <Box
        className="subjects-list"
        margin="small"
        pad="small"
      >
        <Heading tag="h3">{TEXT.HEADINGS.SUBJECTS}</Heading>
        
        <Footer>
          {(props.wccwcmMapPath && props.location) && (
            <Button
              className="button"
              label={TEXT.ACTIONS.SELECT_SUBJECTS}
              onClick={() => {
                //Save the return path
                Actions.wildcamMap.setWccWcmAssignmentPath(props.location.pathname);
                
                //Transition to: WildCam Map
                props.history.push(props.wccwcmMapPath);
              }}
            />
          )}
        </Footer>
      </Box>
    );
  }
};

/*
--------------------------------------------------------------------------------
 */

StudentsList.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
  ...WILDCAMMAP_INITIAL_STATE,
};

StudentsList.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
  ...WILDCAMMAP_PROPTYPES,
};

export default StudentsList;