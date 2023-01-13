/*
Zooniverse In Schools
---------------------
This container is the "main parent" that oversees/organises the rest of the
components used by Zooniverse In Schools.

 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions } from 'jumpstate'
import { Switch, Route, Redirect } from 'react-router-dom'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Section from 'grommet/components/Section'

import KenyaHome from '../kenya/pages/KenyaHome'

import Status401 from '../../components/common/Status401'
import Status404 from '../../components/common/Status404'
import GenericStatusPage from '../../components/common/GenericStatusPage'

function ZooInSchoolsProgram ({
  match,
  initialised = false,
  user = null,
  selectedProgram = null,
}) {
  if (!initialised) {  //User status unknown: wait.
    return (<GenericStatusPage status="fetching" message="Loading..." />)
  }

  /* TODO: re-enable
  if (!selectedProgram) {  //Anomaly: program status not set.
    //Users should _not_ see this, but might due to weird lifecycle/timing issues.
    return (<GenericStatusPage status="fetching" message="Loading Program..." />)
  }
  */

  return (
    <Box>
      <Switch>
        <Route exact path={`${match.url}/`} component={KenyaHome} />

        <Route path="*" component={Status404} />
      </Switch>
    </Box>
  )
}

function mapStateToProps(state) {
  return {
    initialised: state.auth.initialised,
    user: state.auth.user,
    selectedProgram: state.programs.selectedProgram,
  }
}

export default connect(mapStateToProps)(ZooInSchoolsProgram)
