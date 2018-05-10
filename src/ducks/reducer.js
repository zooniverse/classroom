import { combineReducers } from 'redux';
import auth from './auth';
import programs from './programs';
import classrooms from './classrooms';
import assignments from './assignments';
import notification from './notification';
import caesarExports from './caesar-exports';
import wildcamClassrooms from '../modules/wildcam-classrooms/ducks/index.js';
import wildcamMap from '../modules/wildcam-map/ducks/index.js';

export default combineReducers({
  auth,
  classrooms,
  programs,
  assignments,
  notification,
  caesarExports,
  wildcamClassrooms,
  wildcamMap,
});
