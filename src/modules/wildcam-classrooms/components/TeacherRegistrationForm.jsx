/*
TeacherRegistrationForm
-----------------------

Component for viewing or editing a teacher's profile.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import { TEXT } from '../text.js'
import { config } from '../../../lib/config';
import { get, post, put } from '../../../lib/edu-api';

import StatusWorking from './StatusWorking';
import StatusNotFound from './StatusNotFound';
import StatusBorked from './StatusBorked';
import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import TextInput from 'grommet/components/TextInput';
import NumberInput from 'grommet/components/NumberInput';

import CloseIcon from 'grommet/components/icons/base/Close';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import StatusIcon from 'grommet/components/icons/Status';

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES, WILDCAMMAP_MAP_STATE,
} from '../../wildcam-map/ducks/index.js';
import {
  WILDCAMCLASSROOMS_COMPONENT_MODES as MODES,
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
} from '../ducks/index.js';

/*
--------------------------------------------------------------------------------
 */

const INITIAL_FORM_DATA = {
  name: 'TESTER',
};

/*
--------------------------------------------------------------------------------
 */

class AssignmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      form: INITIAL_FORM_DATA,  //Contains basic Assignment data: name, description, etc.
      formInitialised: false,  //Has initialiseForm() already been run?
      status: WILDCAMCLASSROOMS_DATA_STATUS.IDLE,
    };
  }
  
  // ----------------------------------------------------------------
  
  componentDidMount() {
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialise(nextProps);
  }
  
  /*  //Initialise
   */
  initialise(props = this.props) {
    const state = this.state;
    
    this.initialiseForm(props, null);
  }
  
  /*  Initialises the classroom form.
   */
  initialiseForm(props, selectedAssignment) {
    //Only run this once per page load, thank you.
    if (this.state.formInitialised) return;
    this.setState({ formInitialised: true });
    
    if (!selectedAssignment) {
      this.setState({
        form: INITIAL_FORM_DATA,
      });
    } else {
      const originalForm = INITIAL_FORM_DATA;
      const updatedForm = {};
      
      Object.keys(originalForm).map((key) => {

      });
      
      this.setState({
        form: updatedForm,
      });
    }
  }
  
  // ----------------------------------------------------------------
  
  updateForm(e) {
    let val = e.target.value;
    
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: val,
      }
    });
  }
  
  submitForm(e) {
    const props = this.props;
    const state = this.state;
    
    //Prevent standard browser actions
    e.preventDefault();
    
    //Sanity check
    if (!props.selectedProgram) return;
    if (!props.selectedClassroom) return;
  }

  // ----------------------------------------------------------------

  render() {
    const props = this.props;
    const state = this.state;
    
    //State: Working
    //Data is being processed. Don't let the user do anything.
    if (!props.initialised
        || state.status === WILDCAMCLASSROOMS_DATA_STATUS.FETCHING
        || state.status === WILDCAMCLASSROOMS_DATA_STATUS.SENDING
    ) {
      return (
        <Box
          className="teacher-registration-form"
          margin="medium"
          pad="medium"
        >
          {this.render_workingState()}
        </Box>
      );
    }
    
    //State: Ready
    //Page is now ready to accept user input.
    if (state.status === WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS) {
      return (
        <Box
          className="teacher-registration-form"
          margin="medium"
          pad="medium"
        >
          {this.render_editState()}
          <ScrollToTopOnMount />
        </Box>
      );
    }
    
    //State: Error
    if (state.status === WILDCAMCLASSROOMS_DATA_STATUS.ERROR) {
      return (
        <Box
          className="teacher-registration-form"
          margin="medium"
          pad="medium"
        >
          {this.render_errorState()}
        </Box>
      );
    }
    
    //State: WTF
    //How did we even get here?
    return null;
  }
  
  render_editState() {
    const props = this.props;
    const state = this.state;
    
    return (
      <Form
        className="form"
        onSubmit={this.submitForm.bind(this)}
      >
        <Heading tag="h2">
          ...
        </Heading>

        <fieldset>
          <FormField htmlFor="name" label="Name">
            <TextInput
              id="name"
              required={true}
              value={this.state.form.name}
              onDOMChange={this.updateForm.bind(this)}
            />
          </FormField>
        </fieldset>

        <Footer
          className="actions-panel"
          pad="medium"
        >
          <Button
            className="button"
            icon={<LinkPreviousIcon size="small" />}
            label={TEXT.ACTIONS.BACK}
            onClick={() => {
              props.history && props.history.push('../');
            }}
          />
          
          <Button
            className="button"
            icon={<LinkNextIcon size="small" />}
            label={TEXT.ACTIONS.SUBMIT}
            primary={true}
            type="submit"
          />
        </Footer>
      </Form>
    );
  }
  
  render_workingState() {
    return (
      <StatusWorking />
    );
  }
  
  render_errorState() {
    return (
      <Box
        align="center"
        alignContent="center"
        className="status-box"
        direction="column"
        pad="medium"
      >
      <StatusIcon value="critical" />
      <Label>{TEXT.STATUS.ERRORS.GENERAL}</Label>
      <p>Could not access registration details</p>
    </Box>
    );
  }
};

/*
--------------------------------------------------------------------------------
 */

AssignmentForm.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
  initialised: false,
  user: null,
};

AssignmentForm.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string }),
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
    initialised: state.auth.initialised,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(AssignmentForm);