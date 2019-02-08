/*
Gorongosa Program
--------------
This container is the "main parent" that oversees/organises the rest of the
components used by WildCam Gorongosa Lab.

Currently, it has two concerns:
- Only allow non-logged-in users access to certain parts of the Lab.
- Route Teachers and Students to their correct components.

 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Switch, Route, Redirect } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';

import GorongosaHome from './pages/GorongosaHome';
import GorongosaEducators from './pages/GorongosaEducators';
import GorongosaStudents from './pages/GorongosaStudents';
import GorongosaMap from './pages/GorongosaMap';

import GorongosaNaviForEducators from './common/GorongosaNaviForEducators';
import GorongosaNaviForStudents from './common/GorongosaNaviForStudents';
import GorongosaNaviForExplorers from './common/GorongosaNaviForExplorers';

import GorongosaEducatorsIntro from './pages/info/GorongosaEducatorsIntro';
import GorongosaStudentsIntro from './pages/info/GorongosaStudentsIntro';
import GorongosaInfoCSV from './pages/info/GorongosaInfoCSV';
import GorongosaInfoEcology from './pages/info/GorongosaInfoEcology';
import GorongosaInfoResources from './pages/info/GorongosaInfoResources';
import GorongosaInfoAssignmentsGuide from './pages/info/GorongosaInfoAssignmentsGuide';

import Status401 from '../../components/common/Status401';
import Status404 from '../../components/common/Status404';
import GenericStatusPage from '../../components/common/GenericStatusPage';

class GorongosaProgram extends React.Component {
  constructor() {
    super();
  }
  
  componentWillReceiveProps(props = this.props) {
    //Register the connection between the WildCam Classrooms and the WildCam Maps.
    Actions.wildcamMap.setWccWcmMapPath(`${props.match.url}/educators/map`);
  }

  render() {
    const props = this.props;
    
    if (!props.initialised) {  //User status unknown: wait.
      return (<GenericStatusPage status="fetching" message="Loading..." />);
    } else if (!props.selectedProgram) {  //Anomaly: program status not set.
      //Users should _not_ see this, but might due to weird lifecycle/timing issues.
      return (<GenericStatusPage status="fetching" message="Loading Program..." />);
    } else {
      if (props.user) {  //User logged in: give access to all locations.
        return (
          <Box>
            {this.renderNavi()}
            <Switch>
              <Route exact path={`${props.match.url}/`} component={GorongosaHome} />

              <Route path={`${props.match.url}/(educators|students|explorers)/map`} component={GorongosaMap} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/data-guide`} component={GorongosaInfoCSV} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/ecology`} component={GorongosaInfoEcology} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/resources`} component={GorongosaInfoResources} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/assignments-guide`} component={GorongosaInfoAssignmentsGuide} />
              
              <Route exact path={`${props.match.url}/educators/intro`} component={GorongosaEducatorsIntro} />
              {/* //HACK: The following redirect avoids a weird bug where, if you go to a Classroom, then an Assignment, then press Back, then Back again, you end up in the /educators/classrooms URL. */}
              <Redirect exact from={`${props.match.url}/educators/classrooms`} to={`${props.match.url}/educators`}/>
              <Route path={`${props.match.url}/educators`} component={GorongosaEducators} />
              
              <Route exact path={`${props.match.url}/students/intro`} component={GorongosaStudentsIntro} />
              <Route path={`${props.match.url}/students`} component={GorongosaStudents} />

              <Route path="*" component={Status404} />
            </Switch>
          </Box>
        );
      } else {  //User not logged in: give limited access.
        return (
          <Box>
            {this.renderNavi()}
            <Switch>
              <Route exact path={`${props.match.url}/`} component={GorongosaHome} />

              <Route path={`${props.match.url}/(educators|students|explorers)/map`} component={GorongosaMap} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/data-guide`} component={GorongosaInfoCSV} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/ecology`} component={GorongosaInfoEcology} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/resources`} component={GorongosaInfoResources} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/assignments-guide`} component={GorongosaInfoAssignmentsGuide} />
              
              <Route path={`${props.match.url}/educators`} component={Status401} />
              <Route path={`${props.match.url}/students`} component={Status401} />

              <Route path="*" component={Status404} />
            </Switch>
          </Box>
        );
      }
    }
  }
  
  renderNavi() {
    const props = this.props;
    
    return (
      <Switch>
        <Route path={`${props.match.url}/educators`} component={GorongosaNaviForEducators} />
        <Route path={`${props.match.url}/students`} component={GorongosaNaviForStudents} />
        <Route path={`${props.match.url}/explorers`} component={GorongosaNaviForExplorers} />
        <Route path="*" component={null} />
      </Switch>
    );
  }
}

GorongosaProgram.propTypes = {
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string }),
  selectedProgram: PropTypes.object,
};

GorongosaProgram.defaultProps = {
  initialised: false,
  user: null,
  selectedProgram: null,
};

function mapStateToProps(state) {
  return {
    initialised: state.auth.initialised,
    user: state.auth.user,
    selectedProgram: state.programs.selectedProgram,
  };
}

export default connect(mapStateToProps)(GorongosaProgram);
