import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import classrooms from './classrooms';
import assignments from './assignments';
import mapexplorer from './mapexplorer';
import notification from './notification';

export default combineReducers({
  auth,
  classrooms,
  projects,
  assignments,
  mapexplorer,
  notification
});
