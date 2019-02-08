/*
WildCam Gorongosa Classroom Config
===============================

Configuration file for the WildCam Classroom feature. Each ClassroomConfig is
tailored to a specific project, and this config file is for WildCam Gorongosa.

********************************************************************************
 */

import { env } from '../../lib/config';

const classroomConfig = {
  forStudents: {
    urlToAssignment: (env === 'production')
      ? 'https://www.zooniverse.org/projects/zooniverse/wildcam-gorongosa/classify?workflow={WORKFLOW_ID}&classroom=1'
      : 'https://www.zooniverse.org/projects/zooniverse/wildcam-gorongosa/classify?workflow={WORKFLOW_ID}&classroom=1',  //TODO: find the staging equivalent for WildCam Gorongosa
  },
  forEducators: {
    extraInfoFor: {
      classroomsList: 'A classroom allows you to see how many animal identifications each of your students do and to create assignments for groups of students. Students must create Zooniverse accounts to join a classroom. Create a new classroom or view and edit an existing classroom below.',
    },
  },
};

export default classroomConfig;
