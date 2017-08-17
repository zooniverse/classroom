import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import classrooms from './classrooms';
import assignments from './assignments';
import wildcamDarienMap from './wildcam-darien-map';

export default combineReducers({
  auth,
  classrooms,
  projects,
  assignments,
  wildcamDarienMap
});
