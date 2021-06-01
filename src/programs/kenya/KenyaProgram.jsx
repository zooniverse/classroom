/*
Kenya Program
--------------
This container is the "main parent" that oversees/organises the rest of the
components used by Wildwatch Kenya Lab.

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

import KenyaHome from './pages/KenyaHome';
import KenyaEducators from './pages/KenyaEducators';
import KenyaStudents from './pages/KenyaStudents';
import KenyaMap from './pages/KenyaMap';

import KenyaNaviForEducators from './common/KenyaNaviForEducators';
import KenyaNaviForStudents from './common/KenyaNaviForStudents';
import KenyaNaviForExplorers from './common/KenyaNaviForExplorers';

import KenyaEducatorsIntro from './pages/info/KenyaEducatorsIntro';
import KenyaStudentsIntro from './pages/info/KenyaStudentsIntro';
import KenyaInfoCSV from './pages/info/KenyaInfoCSV';
import KenyaInfoProjectOverview from './pages/info/KenyaInfoProjectOverview';
import KenyaInfoAssignmentsGuide from './pages/info/KenyaInfoAssignmentsGuide';

import Status401 from '../../components/common/Status401';
import Status404 from '../../components/common/Status404';
import GenericStatusPage from '../../components/common/GenericStatusPage';

class KenyaProgram extends React.Component {
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
              <Route exact path={`${props.match.url}/`} component={KenyaHome} />

              <Route path={`${props.match.url}/(educators|students|explorers)/map`} component={KenyaMap} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/data-guide`} component={KenyaInfoCSV} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/project-overview`} component={KenyaInfoProjectOverview} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/assignments-guide`} component={KenyaInfoAssignmentsGuide} />
              
              <Route exact path={`${props.match.url}/educators/intro`} component={KenyaEducatorsIntro} />
              {/* //HACK: The following redirect avoids a weird bug where, if you go to a Classroom, then an Assignment, then press Back, then Back again, you end up in the /educators/classrooms URL. */}
              <Redirect exact from={`${props.match.url}/educators/classrooms`} to={`${props.match.url}/educators`}/>
              <Route path={`${props.match.url}/educators`} component={KenyaEducators} />
              
              <Route exact path={`${props.match.url}/students/intro`} component={KenyaStudentsIntro} />
              <Route path={`${props.match.url}/students`} component={KenyaStudents} />

              <Route path="*" component={Status404} />
            </Switch>
          </Box>
        );
      } else {  //User not logged in: give limited access.
        return (
          <Box>
            {this.renderNavi()}
            <Switch>
              <Route exact path={`${props.match.url}/`} component={KenyaHome} />

              <Route path={`${props.match.url}/(educators|students|explorers)/map`} component={KenyaMap} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/data-guide`} component={KenyaInfoCSV} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/project-overview`} component={KenyaInfoProjectOverview} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/assignments-guide`} component={KenyaInfoAssignmentsGuide} />
              
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
        <Route path={`${props.match.url}/educators`} component={KenyaNaviForEducators} />
        <Route path={`${props.match.url}/students`} component={KenyaNaviForStudents} />
        <Route path={`${props.match.url}/explorers`} component={KenyaNaviForExplorers} />
        <Route path="*" component={null} />
      </Switch>
    );
  }
}

KenyaProgram.propTypes = {
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string }),
  selectedProgram: PropTypes.object,
};

KenyaProgram.defaultProps = {
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

export default connect(mapStateToProps)(KenyaProgram);
