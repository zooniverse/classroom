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
import TextInput from 'grommet/components/TextInput';
import CheckBox from 'grommet/components/CheckBox';
import RadioButton from 'grommet/components/RadioButton';

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
  country: '',
  setting: '',
  age: '',
  course: '',
  foundon: '',
  resource: '',
  feedback: '',
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
    if (!this.props.userInitialised && nextProps.userInitialised) {
      this.initialise(nextProps);
    }
  }
  
  /*  Initialise
   */
  initialise(props = this.props) {
    const state = this.state;

    if (props.userInitialised && !state.formInitialised) {
      this.setState({ formInitialised: true });
      
      // If we have a user, try to pull
      if (props.user && props.user.id) {
        
        this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.FETCHING });
        
        get(`/users/${props.user.id}`)
        
        .then((response) => {
          if (response && response.ok && response.body && response.body.data) return response.body.data;
          throw 'ERROR or USER NOT FOUND';  // Warning: we don't differentiate between problems fetching a user's data, and the user data having not yet been created.
        })

        .then((data) => {
          Actions.wildcamClassrooms.setToast({ status: 'ok', message: TEXT.TEACHER_REGISTRATION_FORM.STATUS.DATA_FETCHED });
          this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS });
          this.initialiseForm(data && data.metadata);
        })

        // If the user data can't be found or hasn't been initialised (404), or
        // if there's an error fetching the data, just load the default form.
        .catch((err) => {
          //this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.ERROR });
          
          this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS });
          this.initialiseForm();
        });
       
      // Otherwise, intialise the form with default values.
      } else {
        this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS });
        this.initialiseForm();
      }
      
    }
  }
  
  /*  Initialises the classroom form.
   */
  initialiseForm(formData = {}) {
    const form = { ...INITIAL_FORM_DATA, ...formData };
    
    // Don't allow nulls or undefineds.
    Object.keys(form).forEach((key) => {
      if (form[key] === undefined || form[key] === null) form[key] = '';
    });
    
    this.setState({ form });
  }
  
  // ----------------------------------------------------------------
  
  updateForm_text(e) {
    let val = e.target.value;
    
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: val,
      }
    });
  }
  
  updateForm_checkbox (e) {
    const DELIMITER = ';';
    const name = e.target.name;
    const checked = e.target.checked;
    const index = parseInt(e.target.id.replace(`${name}_`, ''));
    const newValue = TEXT.TEACHER_REGISTRATION_FORM.ANSWERS[name.toUpperCase()][index];
    let answers = this.state.form[name].split(DELIMITER);
    
    // Remove any answers that aren't included in the known answer set. Required for backwards compatibility.
    answers = answers.filter((ans) => TEXT.TEACHER_REGISTRATION_FORM.ANSWERS[name.toUpperCase()].includes(ans))
    
    answers = answers.filter((ans) => ans !== newValue);  // Remove if answer exists, to start with a clean slate...
    checked && answers.push(newValue)  // ...then add if checkbox is checked.
    
    this.setState({
      form: {
        ...this.state.form,
        [name]: answers.join(DELIMITER),
      }
    });
  }
  
  updateForm_radio (e) {
    const name = e.target.name;
    const value = e.target.value;
    
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      }
    });
  }
  
  submitForm(e) {
    const props = this.props;
    const state = this.state;
    
    //Prevent standard browser actions
    e.preventDefault();
    
    const data = {
      data: {
        attributes: {
          metadata: { ...state.form }
        }
      }
    };
    
    this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.SENDING });
    
    put(`/users/${props.user.id}`, data)
        
    .then((response) => {
      if (response && response.ok) return;
      throw 'ERROR';
    })

    .then(() => {
      Actions.wildcamClassrooms.setToast({ status: 'ok', message: TEXT.TEACHER_REGISTRATION_FORM.STATUS.DATA_SENT });
      this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.SUCCESS });
    })

    .catch((err) => {
      Actions.wildcamClassrooms.setToast({ status: 'ok', message: TEXT.TEACHER_REGISTRATION_FORM.STATUS.ERROR });
      this.setState({ status: WILDCAMCLASSROOMS_DATA_STATUS.ERROR });
    });
  }

  // ----------------------------------------------------------------

  render() {
    const props = this.props;
    const state = this.state;
    
    //State: Working
    //Data is being processed. Don't let the user do anything.
    if (!props.userInitialised
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
          {TEXT.TITLES.TEACHER_REGISTRATION_FORM}
        </Heading>

        <fieldset>
          <FormField htmlFor="name" label={TEXT.TEACHER_REGISTRATION_FORM.FIELDS.COUNTRY}>
            <TextInput
              id="country"
              value={this.state.form.country}
              onDOMChange={this.updateForm_text.bind(this)}
            />
          </FormField>
          
          <FormField htmlFor="name" label={TEXT.TEACHER_REGISTRATION_FORM.FIELDS.SETTING}>
            {TEXT.TEACHER_REGISTRATION_FORM.ANSWERS.SETTING.map((answer, index) => 
              <CheckBox
                key={`setting_${index}`}
                id={`setting_${index}`}
                name="setting"
                checked={state.form.setting.includes(answer)}
                label={answer}
                onChange={this.updateForm_checkbox.bind(this)}
              />
            )}
          </FormField>
          
          <FormField htmlFor="name" label={TEXT.TEACHER_REGISTRATION_FORM.FIELDS.AGE}>
            {TEXT.TEACHER_REGISTRATION_FORM.ANSWERS.AGE.map((answer, index) => 
              <CheckBox
                key={`age_${index}`}
                id={`age_${index}`}
                name="age"
                checked={state.form.age.includes(answer)}
                label={answer}
                onChange={this.updateForm_checkbox.bind(this)}
              />
            )}
          </FormField>
          
          <FormField htmlFor="name" label={TEXT.TEACHER_REGISTRATION_FORM.FIELDS.COURSE}>
            {TEXT.TEACHER_REGISTRATION_FORM.ANSWERS.COURSE.map((answer, index) => 
              <CheckBox
                key={`course_${index}`}
                id={`course_${index}`}
                name="course"
                checked={state.form.course.includes(answer)}
                label={answer}
                onChange={this.updateForm_checkbox.bind(this)}
              />
            )}
          </FormField>
          
          <FormField htmlFor="name" label={TEXT.TEACHER_REGISTRATION_FORM.FIELDS.FOUNDON}>
            {TEXT.TEACHER_REGISTRATION_FORM.ANSWERS.FOUNDON.map((answer, index) => 
              <CheckBox
                key={`foundon_${index}`}
                id={`foundon_${index}`}
                name="foundon"
                checked={state.form.foundon.includes(answer)}
                label={answer}
                onChange={this.updateForm_checkbox.bind(this)}
              />
            )}
          </FormField>
          
          <FormField htmlFor="name" label={TEXT.TEACHER_REGISTRATION_FORM.FIELDS.RESOURCE}>
            {TEXT.TEACHER_REGISTRATION_FORM.ANSWERS.RESOURCE.map((answer, index) => 
              <RadioButton
                key={`resource_${index}`}
                id={`resource_${index}`}
                name="resource"
                checked={(state.form.resource === answer)}
                label={answer}
                value={answer}
                onChange={this.updateForm_radio.bind(this)}
              />
            )}
          </FormField>
          
          <FormField htmlFor="name" label={TEXT.TEACHER_REGISTRATION_FORM.FIELDS.FEEDBACK}>
            {TEXT.TEACHER_REGISTRATION_FORM.ANSWERS.FEEDBACK.map((answer, index) => 
              <RadioButton
                key={`feedback_${index}`}
                id={`feedback_${index}`}
                name="feedback"
                checked={(state.form.feedback === answer)}
                label={answer}
                value={answer}
                onChange={this.updateForm_radio.bind(this)}
              />
            )}
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
  user: null,
  userInitialised: false,
};

AssignmentForm.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
  user: PropTypes.shape({ login: PropTypes.string }),
  userInitialised: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
    user: state.auth.user,
    userInitialised: state.auth.initialised,
  };
}

export default connect(mapStateToProps)(AssignmentForm);