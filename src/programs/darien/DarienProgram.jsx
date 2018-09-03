/*
Darien Program
--------------
This container is the "main parent" that oversees/organises the rest of the
components used by WildCam Darien Lab.

Currently, it has two concerns:
- Only allow non-logged-in users access to certain parts of the Lab.
- Route Teachers and Students to their correct components.

 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import { Switch, Route } from 'react-router-dom';

import Box from 'grommet/components/Box';

import DarienHome from './pages/DarienHome';
import DarienEducators from './pages/DarienEducators';
import DarienStudents from './pages/DarienStudents';
import DarienMap from './pages/DarienMap';

import DarienNaviForEducators from './common/DarienNaviForEducators';
import DarienNaviForStudents from './common/DarienNaviForStudents';
import DarienNaviForExplorers from './common/DarienNaviForExplorers';

import DarienEducatorsIntro from './pages/info/DarienEducatorsIntro';
import DarienInfoCSV from './pages/info/DarienInfoCSV';
import DarienInfoEcology from './pages/info/DarienInfoEcology';
import DarienInfoResources from './pages/info/DarienInfoResources';

import Status401 from '../../components/common/Status401';
import Status404 from '../../components/common/Status404';
import GenericStatusPage from '../../components/common/GenericStatusPage';

class DarienProgram extends React.Component {
  constructor() {
    super();
  }
  
  componentWillReceiveProps(props = this.props) {
    //Register the connection between the WildCam Classrooms and the WildCam Maps.
    Actions.wildcamMap.setWccWcmMapPath(`${props.match.url}/map`);
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
              <Route exact path={`${props.match.url}/`} component={DarienHome} />

              <Route path={`${props.match.url}/(educators|students|explorers)/map`} component={DarienMap} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/data-guide`} component={DarienInfoCSV} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/ecology`} component={DarienInfoEcology} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/resources`} component={DarienInfoResources} />
              
              <Route exact path={`${props.match.url}/educators/intro`} component={DarienEducatorsIntro} />
              <Route path={`${props.match.url}/educators`} component={DarienEducators} />
              
              <Route path={`${props.match.url}/students`} component={DarienStudents} />

              <Route path="*" component={Status404} />
            </Switch>
          </Box>
        );
      } else {  //User not logged in: give limited access.
        return (
          <Box>
            {this.renderNavi()}
            <Switch>
              <Route exact path={`${props.match.url}/`} component={DarienHome} />

              <Route path={`${props.match.url}/(educators|students|explorers)/map`} component={DarienMap} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/data-guide`} component={DarienInfoCSV} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/ecology`} component={DarienInfoEcology} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/resources`} component={DarienInfoResources} />
              
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
        <Route path={`${props.match.url}/educators`} component={DarienNaviForEducators} />
        <Route path={`${props.match.url}/students`} component={DarienNaviForStudents} />
        <Route path={`${props.match.url}/explorers`} component={DarienNaviForExplorers} />
        <Route path="*" component={null} />
      </Switch>
    );
  }
}

DarienProgram.propTypes = {
  initialised: PropTypes.bool,
  user: PropTypes.shape({ login: PropTypes.string }),
  selectedProgram: PropTypes.object,
};

DarienProgram.defaultProps = {
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

export default connect(mapStateToProps)(DarienProgram);
