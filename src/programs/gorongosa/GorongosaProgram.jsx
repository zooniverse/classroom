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
import { Switch, Route } from 'react-router-dom';

import GorongosaHome from './pages/GorongosaHome';
import GorongosaEducators from './pages/GorongosaEducators';
import GorongosaMap from './pages/GorongosaMap';

import GorongosaInfoEcology from './pages/info/GorongosaInfoEcology';
import GorongosaEducatorsIntro from './pages/info/GorongosaEducatorsIntro';

import Status401 from '../../components/common/Status401';
import Status404 from '../../components/common/Status404';
import GenericStatusPage from '../../components/common/GenericStatusPage';

class GorongosaProgram extends React.Component {
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
          <Switch>
            <Route exact path={`${props.match.url}/`} component={GorongosaHome} />
            
            <Route exact path={`${props.match.url}/educators/ecology`} component={GorongosaInfoEcology} />
            <Route exact path={`${props.match.url}/educators/intro`} component={GorongosaEducatorsIntro} />
            
            <Route path={`${props.match.url}/educators`} component={GorongosaEducators} />
            <Route path={`${props.match.url}/map`} component={GorongosaMap} />
            <Route path="*" component={Status404} />
          </Switch>
        );
      } else {  //User not logged in: give limited access.
        return (
          <Switch>
            <Route exact path={`${props.match.url}/`} component={GorongosaHome} />
            <Route path={`${props.match.url}/educators`} component={Status401} />
            <Route path={`${props.match.url}/map`} component={GorongosaMap} />
            <Route path="*" component={Status404} />
          </Switch>
        );
      }
    }
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
