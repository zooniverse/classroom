/*
WildCam Classrooms
------------------

The primary component for Teachers, allowing them to view and manage classrooms
and assignments for WildCam-type programs/projects.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Switch, Route } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Toast from 'grommet/components/Toast';

import ClassroomsList from '../components/ClassroomsList';
import ClassroomForm from '../components/ClassroomForm';
import AssignmentForm from '../components/AssignmentForm';
import TeacherRegistrationForm from '../components/TeacherRegistrationForm'
import Status404 from '../../../components/common/Status404';
import HelpfulGuide from '../../../components/common/HelpfulGuide';

import { PROGRAMS_PROPTYPES, PROGRAMS_INITIAL_STATE } from '../../../ducks/programs';
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

class WildCamForEducators extends React.Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    //Get the list of Classrooms and Assignments.
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //Get the list of Classrooms and Assignments.
    if (this.props.selectedProgram !== nextProps.selectedProgram) this.initialise(nextProps);
  }
  
  //Initialise:
  //Fetch the classroom data for this Program.
  initialise(props = this.props) {
    //Sanity check
    if (!props.selectedProgram) return;
    
    return Actions.wcc_teachers_fetchClassrooms({ selectedProgram: props.selectedProgram })
    .then(() => {
      //Nothing
    });
  }

  render() {
    const props = this.props;
    const match = (props.match) ? props.match : {};

    //Sanity check
    if (!props.selectedProgram) return null;

    return (
      <Box
        colorIndex="grey-5"
        className="wildcam-classrooms"
      >
        {props.toast && props.toast.message && (
          <Toast
            status={props.toast.status ? props.toast.status : 'unknown'}
            onClose={() => { Actions.wildcamClassrooms.resetToast() }}
          >
            {props.toast.message}
          </Toast>
        )}
        
        <Switch>
          <Route
            path={`${match.url}/register`} exact
            component={TeacherRegistrationForm}
          />
          <Route
            path={`${match.url}/classrooms/:classroom_id/assignments/new`} exact
            component={AssignmentForm}
          />
          <Route
            path={`${match.url}/classrooms/:classroom_id/assignments/:assignment_id`} exact
            component={AssignmentForm}
          />
          <Route
            path={`${match.url}/classrooms/new`} exact
            component={ClassroomForm}
          />
          <Route
            path={`${match.url}/classrooms/:classroom_id`} exact
            component={ClassroomForm}
          />
          <Route
            path={`${match.url}`} exact
            render={(routeProps)=>(  //This is how set a component for a route with specific props.
              <ClassroomsList
                {...routeProps}  //Passes history, location, match
                classroomConfig={props.classroomConfig}
              />
            )}
          />
          <Route path="*" component={Status404} />
        </Switch>
        
        {(props.showHelp === 'classrooms-management') &&
          (props.classroomConfig && props.classroomConfig.forEducators && props.classroomConfig.forEducators.extraInfoFor && props.classroomConfig.forEducators.extraInfoFor.classroomsHelpPart1) && (
          <HelpfulGuide
            onClose={() => { Actions.wildcamClassrooms.hideHelp() }}
          >
            {props.classroomConfig.forEducators.extraInfoFor.classroomsHelpPart1.map((text, index) =>
              <Box key={`helpful-guide-classrooms-management-${index}`}>
                <Paragraph>{text}</Paragraph>
              </Box>
            )}
          </HelpfulGuide>
        )}
        
        {(props.showHelp === 'assignments-management') && (
          <HelpfulGuide
            onClose={() => { Actions.wildcamClassrooms.hideHelp() }}
          >
            <Box>
              <Paragraph>An assignment allows you to select a specific subset of photos (e.g. 30 photos from the Dry Season) and assign those photos to a group of students in your classroom to identify. Another group of students can identify a different set of photos (e.g. 30 photos from the Wet Season). Let’s walk through how it works.</Paragraph>
            </Box>
            <Box>
              <Paragraph>After you create a classroom and your students join, click “View”, then click “Create New Assignment”.</Paragraph>
            </Box>
            <Box>
              <Paragraph>Fill in the Assignment name, instructions, and due date that your students will see. Include as much detail as you like in the instructions. For example, you may ask students to do a task outside the WildCam Lab platform (e.g. record observations while making animal identifications).</Paragraph>
            </Box>
            <Box>
              <Paragraph>Click select photos. On the interactive map, the entire set of trail camera photos will be preselected. The number in this box shows the total number of photos selected.</Paragraph>
            </Box>
            <Box>
              <Paragraph>If you want your students to identify any random type of photo, do not select any filters. Simply edit the number of photos in the box to indicate the number of photos you want each student to identify. Click Select.</Paragraph>
            </Box>
            <Box>
              <Paragraph>If you want your students to identify a particular type of photo, click the filters dropdown and select as many filters as you wish to apply. Next, edit the number of photos in the box to indicate the number of photos you want each student to identify. Click Select.</Paragraph>
            </Box>
            <Box>
              <Paragraph>If you only want to send this assignment to a group of students within a classroom, select only those students. You can create a new assignment if you wish to assign different photos to another group. Click Create to send the assignment to those students.</Paragraph>
            </Box>
            <Box>
              <Paragraph>To view and edit your assignments, navigate to that classroom and click Edit. You can see a list of your students and the number of classifications they made.</Paragraph>
            </Box>
            <Box>
              <Paragraph>Your students can view their assignment by going to the assignments page in the Explorer section. They must be logged into their Zooniverse account to access their assignment.</Paragraph>
            </Box>
          </HelpfulGuide>
        )}

      </Box>
    );
  }
}

/*
--------------------------------------------------------------------------------
 */

WildCamForEducators.defaultProps = {
  history: null,
  location: null,
  match: null,
  // ----------------
  selectedProgram: PROGRAMS_INITIAL_STATE.selectedProgram,  //Passed from parent.
  classroomConfig: null,  //Passed from parent.
  // ----------------
  ...WILDCAMCLASSROOMS_INITIAL_STATE,
};

WildCamForEducators.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  // ----------------
  selectedProgram: PROGRAMS_PROPTYPES.selectedProgram,
  classroomConfig: PropTypes.object,
  // ----------------
  ...WILDCAMCLASSROOMS_PROPTYPES,
};

function mapStateToProps(state) {
  return {
    ...WILDCAMCLASSROOMS_MAP_STATE(state),
  };
}

export default connect(mapStateToProps)(WildCamForEducators);
