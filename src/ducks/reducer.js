import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import classrooms from './classrooms';

export default combineReducers({
  auth,
  classrooms,
  projects
});
