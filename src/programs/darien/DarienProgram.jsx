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
import { Switch, Route, Redirect } from 'react-router-dom';
import { ZooTranSetLanguage, ZooTranCheckForValidLanguage } from '../../lib/zooniversal-translator';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';

import DarienHome from './pages/DarienHome';
import DarienEducators from './pages/DarienEducators';
import DarienStudents from './pages/DarienStudents';
import DarienMap from './pages/DarienMap';

import DarienNaviForEducators from './common/DarienNaviForEducators';
import DarienNaviForStudents from './common/DarienNaviForStudents';
import DarienNaviForExplorers from './common/DarienNaviForExplorers';

import DarienEducatorsIntro from './pages/info/DarienEducatorsIntro';
import DarienStudentsIntro from './pages/info/DarienStudentsIntro';
import DarienInfoCSV from './pages/info/DarienInfoCSV';
import DarienInfoEcology from './pages/info/DarienInfoEcology';
import DarienInfoResources from './pages/info/DarienInfoResources';
import DarienInfoAssignmentsGuide from './pages/info/DarienInfoAssignmentsGuide';

import Status401 from '../../components/common/Status401';
import Status404 from '../../components/common/Status404';
import GenericStatusPage from '../../components/common/GenericStatusPage';

class DarienProgram extends React.Component {
  constructor() {
    super();

    // Set acceptable languages/locales for this program
    ZooTranCheckForValidLanguage(['en', 'es']);
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
              <Route exact path={`${props.match.url}/`} component={DarienHome} />

              <Route path={`${props.match.url}/(educators|students|explorers)/map`} component={DarienMap} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/data-guide`} component={DarienInfoCSV} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/ecology`} component={DarienInfoEcology} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/resources`} component={DarienInfoResources} />
              <Route exact path={`${props.match.url}/(educators|students|explorers)/assignments-guide`} component={DarienInfoAssignmentsGuide} />

              <Route exact path={`${props.match.url}/educators/intro`} component={DarienEducatorsIntro} />
              {/* //HACK: The following redirect avoids a weird bug where, if you go to a Classroom, then an Assignment, then press Back, then Back again, you end up in the /educators/classrooms URL. */}
              <Redirect exact from={`${props.match.url}/educators/classrooms`} to={`${props.match.url}/educators`}/>
              <Route path={`${props.match.url}/educators`} component={DarienEducators} />

              <Route exact path={`${props.match.url}/students/intro`} component={DarienStudentsIntro} />
              <Route path={`${props.match.url}/students`} component={DarienStudents} />

              <Route path="*" component={Status404} />
            </Switch>
            {this.renderLanguage()}
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
              <Route exact path={`${props.match.url}/(educators|students|explorers)/assignments-guide`} component={DarienInfoAssignmentsGuide} />

              <Route path={`${props.match.url}/educators`} component={Status401} />
              <Route path={`${props.match.url}/students`} component={Status401} />

              <Route path="*" component={Status404} />
            </Switch>
            {this.renderLanguage()}
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

  renderLanguage() {
    const props = this.props;

    return (
      <Section
        className="program-language-selection"
        align="center"
        justify="center"
        colorIndex="accent-4"
        direction="row"
      >
        <Button
          className="button"
          label="English"
          onClick={() => { ZooTranSetLanguage(''); location.reload(); }}
        />
        &nbsp;
        <Button
          className="button"
          label="Español"
          onClick={() => { ZooTranSetLanguage('es'); location.reload(); }}
        />
      </Section>
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
