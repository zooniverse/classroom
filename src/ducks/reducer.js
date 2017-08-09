import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import classrooms from './classrooms';
import assignments from './assignments';

export default combineReducers({
  auth,
  classrooms,
  projects,
  assignments
});
