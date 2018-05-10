/*
WildCam Classrooms - Data Connection and Duck
---------------------------------------------

Part of the WildCam Classrooms feature.

--------------------------------------------------------------------------------
 */

import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import superagent from 'superagent';

/*
--------------------------------------------------------------------------------
 */

// Constants
// ---------

WILDCAMCLASSROOMS_DATA_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
};

/*
--------------------------------------------------------------------------------
 */

// Initial State / Default Values
// ------------------------------


/*  WILDCAMCLASSROOMS_INITIAL_STATE defines the default/starting values of the Redux
    store. To use this in your Redux-connected React components, try...
    Usage:
      MyReactComponent.defaultProps = {
        ...WILDCAMCLASSROOMS_INITIAL_STATE,
        otherProp: 'default value'
      };
 */
const WILDCAMCLASSROOMS_INITIAL_STATE = {
};

/*
--------------------------------------------------------------------------------
 */

// React-Redux Helper Objects/Functions
// ------------------------------------

/*  WILDCAMCLASSROOMS_PROPTYPES is used to define the property types of the data, and
    only matters to Redux-connected React components, and can be used like...
    Usage:
      MyReactComponent.propTypes = {
        ...WILDCAMCLASSROOMS_PROPTYES,
        otherProp: PropTypes.string,
      };
 */
const WILDCAMCLASSROOMS_PROPTYPES = {

};

/*  WILDCAMCLASSROOMS_MAP_STATE is used as a convenience feature in mapStateToProps()
    functions in Redux-connected React components.
    Usage:
      mapStateToProps = (state) => {
        return {
          ...WILDCAMCLASSROOMS_MAP_STATE(state),
          someOtherValue: state.someOtherStore.someOtherValue
        }
      }
 */
const WILDCAMCLASSROOMS_MAP_STATE = (state, prefix = '') => {
};

/*
--------------------------------------------------------------------------------
 */

// Jumpstate Synchronous Actions
// -----------------------------

//const setMarkersStatus = (state, markersStatus) => {
//  return { ...state, markersStatus };
//};

/*
--------------------------------------------------------------------------------
 */

// Jumpstate Effects
// -----------------
// Effects are for async actions and get automatically to the global Actions list

/*
--------------------------------------------------------------------------------
 */

const wildcamClassrooms = State('wildcamClassrooms', {
  // Initial state
  initial: WILDCAMCLASSROOMS_INITIAL_STATE,
  // Actions
});

export default wildcamMap;
export {
  WILDCAMCLASSROOMS_DATA_STATUS,
  WILDCAMCLASSROOMS_INITIAL_STATE,
  WILDCAMCLASSROOMS_PROPTYPES,
  WILDCAMCLASSROOMS_MAP_STATE,
};
