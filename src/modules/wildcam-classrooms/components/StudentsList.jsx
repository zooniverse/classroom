/*
Students List
-------------

Renders a list of students 

--------------------------------------------------------------------------------
 */

/*
ClassroomForm
-------------

Component for viewing, editing, or deleting a single classroom.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';

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


class StudentsList extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [],
      form: {},
    };
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
    
    const form = {};
    const students = props.selectedClassroom.students || [];
    
    students.map((stud) => { form[stud.id] = true; });
          
    //TODO: React if there's a SelectedAssignment.
    
    this.setState({ students, form });
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
    
    //const students = (props.selectedClassroom && props.selectedClassroom.students) ? props.selectedClassroom.students : [];
    //const assignments = (props.selectedClassroom && props.assignments && props.assignments[props.selectedClassroom.id])
    //  ? props.assignments[props.selectedClassroom.id]
    //  : [];
    
    return (
      <div>
        {state.students.map((stud) => {
          console.log('+++ student: ', stud);
          return (
            <div key={stud.id}>
              {stud.zooniverseDisplayName}
              {state.form[stud.id] && ' (tick) '}
            </div>
          );
        })}
      </div>
    );
    
    //State: WTF
    //How did we even get here?
    return null;
  }
};

/*
--------------------------------------------------------------------------------
 */

StudentsList.defaultProps = {
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

StudentsList.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

export default StudentsList;