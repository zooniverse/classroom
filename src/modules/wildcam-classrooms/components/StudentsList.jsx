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

/*
--------------------------------------------------------------------------------
 */

const TEXT = {
  ACTIONS: {
    UPDATE_STUDENTS: 'Update students'
  },
  HEADINGS: {
    STUDENTS: 'Students',
  }
}
  
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
      <Box
        className="students-list"
        pad="small"
      >
        <Heading tag="h3">{TEXT.HEADINGS.STUDENTS}</Heading>
        <Table className="table">
          <tbody>
            {state.students.map((stud) => {
              return (
                <TableRow
                  className="item"
                  key={`students-list_${stud.id}`}
                >
                  <td>
                    <Heading tag="h4">{stud.zooniverseDisplayName}</Heading>
                  </td>
                  <td>
                    ({stud.zooniverseLogin})
                  </td>
                  <td>
                    <Box
                      className="actions-panel"
                      direction="row"
                      justify="end"
                    >
                      <CheckBox
                        checked={state.form[stud.id]}
                        onChange={(e) => {
                          this.setState({
                            form: {
                              ...state.form,
                              [stud.id]: !state.form[stud.id],
                            }
                          });
                        }}
                      />
                    </Box>
                  </td>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
        <Footer>
          <Button
            className="button"
            label={TEXT.ACTIONS.UPDATE_STUDENTS}
            onClick={() => {
              props.doUpdateStudents(this.state.form);
            }}
          />
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
  doUpdateStudents: () => {},
};

StudentsList.propTypes = {
  ...WILDCAMCLASSROOMS_PROPTYPES,
  doUpdateStudents: PropTypes.func,
};

export default StudentsList;