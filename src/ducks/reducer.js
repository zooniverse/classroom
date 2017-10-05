import { combineReducers } from 'redux';
import auth from './auth';
import programs from './programs';
import classrooms from './classrooms';
import assignments from './assignments';
import mapexplorer from './mapexplorer';
import notification from './notification';
import caesarExports from 'caesar-exports';

export default combineReducers({
  auth,
  classrooms,
  programs,
  assignments,
  mapexplorer,
  notification,
  caesarExports
});
