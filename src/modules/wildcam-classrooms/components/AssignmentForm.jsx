/*
AssignmentForm
--------------

Component for viewing, editing, or deleting a single assignment.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';

import StatusWorking from './StatusWorking';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

const VIEWS = {
  CREATE: 'create',
  EDIT: 'edit',
  NOT_FOUND: 'classroom/assignment not found',
}

const TEXT = {
  ACTIONS: {
    BACK: 'Back',
    SUBMIT: 'Submit',
    CREATE: 'Create',
    UPDATE: 'Update',
    DELETE: 'Delete',
  },
};

const INITIAL_FORM_DATA = {
  name: '',
};

/*
--------------------------------------------------------------------------------
 */
class AssignmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      view: VIEWS.CREATE,
      form: INITIAL_FORM_DATA,
      //Note: the reason this object structure is one level deep is because
      //the state previously had other things stored here, e.g. state.mode.
    };
  }
  
  // ----------------------------------------------------------------
  
  componentDidMount() {
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialise(nextProps);
  }
  
  /*  //Initialise:
      //Fetch the selected classroom data.
      
      Based on the route/URL, we'll either create a new classroom or edit an existing one.
        .../classroom/new - create a new classroom (i.e. no classroom_id parameter)
        .../classroom/123 - edit classroom 123 (i.e. classroom_id=123 supplied.)
   */
  initialise(props = this.props) {
    const state = this.state;
  }
  
  // ----------------------------------------------------------------
  
  updateForm(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value
      }
    });
    
    //Apparently [square_brackets] a superconvenient way of specifying an
    //object key name that's variable. Sweet.
    
  }
  
  submitForm(e) {}
  
  // ----------------------------------------------------------------

  render() {
    const props = this.props;
    
    return (
      <Box
        className="classroom-form"
        margin="medium"
        pad="medium"
      >
        {(() => {
          if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS && props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
            return this.render_readyState();
          } else if (props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING || props.classroomsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING ||
              props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.SENDING || props.assignmentsStatus === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING) {
            return this.render_workingState();
          }
        })()}
        
        <ScrollToTopOnMount />
      </Box>
    );
    
    return null;
  }
  
  render_readyState() {
    const props = this.props;
    const state = this.state;
    
    return (
      <Form
        className="form"
        onSubmit={this.submitForm.bind(this)}
      >
        ...
      </Form>
    );
  }
  
  render_workingState() {
    return (
      <StatusWorking />
    );
  }
};

// -----------------------------------------------------------------------------

AssignmentForm.VIEWS = VIEWS;
AssignmentForm.defaultProps = {
  location: null,
  history: null,
  match: null,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

AssignmentForm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.programs.selectedProgram,
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(AssignmentForm);
