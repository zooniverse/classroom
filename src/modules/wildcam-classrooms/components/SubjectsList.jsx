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
import { TEXT } from '../text.js';

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

const MAX_SUBJECTS_COUNT = 10;

/*
--------------------------------------------------------------------------------
 */

class SubjectsList extends React.Component {
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
        margin={{ horizontal: "none", vertical: "small" }}
        pad="small"
      >
        <Heading tag="h3">{TEXT.TITLES.SUBJECTS}</Heading>
        
        <Box className="data-count">
          {(props.subjects) ? props.subjects.length : 0} {TEXT.LABELS.PHOTOS_SELECTED}
        </Box>
        
        {this.render_filters()}
        
        {this.render_subjects()}
        
        <Footer>
          {(props.wccwcmMapPath && props.location) && (
            <Button
              className="button"
              label={(props.subjects && props.subjects.length > 0)
                ? TEXT.ACTIONS.SELECT_SUBJECTS_AGAIN
                : TEXT.ACTIONS.SELECT_SUBJECTS
              }
              onClick={() => {
                //Save the return path, assignment state, and the initial filters to be used by the map.
                Actions.wildcamMap.setWccWcmAssignmentPath(props.location.pathname);
                Actions.wildcamMap.setWccWcmSavedAssignmentState(props.assignmentStateForSaving);
                if (props.filters) Actions.wildcamMap.setFilters(props.filters);
                
                //Transition to: WildCam Map
                props.history.push(props.wccwcmMapPath);
              }}
            />
          )}
        </Footer>
      </Box>
    );
  }
  
  render_filters() {
    const props = this.props;
    
    if (!props.filters) return null;
    
    return (
      <Box
        className="data-filters"
        pad="small"
        margin="small"
      >
        {(()=> {
          return Object.keys(props.filters).map((key, index) => {
            const val = props.filters[key];
            return (
              <div key={`subjects-list-filter_${index}`}>{key} : {(()=>{
                if (Array.isArray(val, index)) {
                  let output = '';
                  val.map((v) => {
                    output += ((output !== '') ? ', ' : '' ) + v;
                  });
                  return output;
                } else {
                  return val;
                }
              })()}</div>
            );
          });
        })()}
      </Box>
    );
  }
  
  render_subjects() {
    const props = this.props;
    
    if (!props.subjects || props.subjects.length === 0) return null;
    
    return (
      <Box
        className="data-subjects"
        direction="row"
        wrap={true}
        margin="small"
        separator="all"
      >
        {props.subjects.slice(0,MAX_SUBJECTS_COUNT).map((subject, index) => {
          if (!subject.location) return null;
          
          return (
            <Box
              className="item"
              margin="small"
              key={`subjects-list-subjects_${index}`}
            >
              <img src={subject.location} />
            </Box>
          );
        })}
      </Box>
    );
  }
};

/*
--------------------------------------------------------------------------------
 */

SubjectsList.defaultProps = {
  filters: null,
  subjects: [],
  assignmentStateForSaving: null,
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
  ...WILDCAMMAP_INITIAL_STATE,
};

SubjectsList.propTypes = {
  filters: PropTypes.object,
  subjects: PropTypes.array,
  assignmentStateForSaving: PropTypes.object,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
  ...WILDCAMMAP_PROPTYPES,
};

export default SubjectsList;