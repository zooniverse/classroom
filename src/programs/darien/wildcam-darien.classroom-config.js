/*
WildCam Darien Classroom Config
===============================

Configuration file for the WildCam Classroom feature. Each ClassroomConfig is
tailored to a specific project, and this config file is for WildCam Darien.

********************************************************************************
 */

import { env } from '../../lib/config';

const classroomConfig = {
  forStudents: {
    urlToAssignment: (env === 'production')
      ? 'https://www.zooniverse.org/projects/wildcam/wildcam-darien/classify?workflow={WORKFLOW_ID}'
      : 'https://www.zooniverse.org/projects/wildcam/wildcam-darien/classify?workflow={WORKFLOW_ID}',  //TODO: find the staging equivalent for WildCam Darien
  }
};

export default classroomConfig;
