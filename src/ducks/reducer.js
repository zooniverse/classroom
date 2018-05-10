import { combineReducers } from 'redux';
import auth from './auth';
import programs from './programs';
import classrooms from './classrooms';
import assignments from './assignments';
import wildcamMap from '../modules/wildcam-map/ducks/index';
import notification from './notification';
import caesarExports from './caesar-exports';

export default combineReducers({
  auth,
  classrooms,
  programs,
  assignments,
  wildcamMap,
  notification,
  caesarExports
});
