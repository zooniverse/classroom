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
      ? 'https://www.zooniverse.org/projects/wildcam/wildcam-darien/classify?workflow={WORKFLOW_ID}&classroom=1'
      : 'https://www.zooniverse.org/projects/wildcam/wildcam-darien/classify?workflow={WORKFLOW_ID}&classroom=1',  //TODO: find the staging equivalent for WildCam Darien
    transformClassificationsDownload: transformWildCamAssignments
  },
  forEducators: {
    extraInfoFor: {
      classroomsList: 'A classroom allows you to see how many animal identifications each of your students do and to create assignments for groups of students. Students must create Zooniverse accounts to join a classroom. Create a new classroom or view and edit an existing classroom below.',
    },
  },
};
  
function transformWildCamAssignments (classifications) {
  let data = [];
  
  classifications.forEach((classification) => {
  
    const classification_id = classification.id;
    const subject_id =
      classification.links &&
      classification.links.subjects &&
      classification.links.subjects[0];
    const user_id =
      classification.links &&
      classification.links.user;
    const assignment_id =
      classification.links &&
      classification.links.workflow;

    classification.annotations.forEach(task => {
      task.value.forEach(answer => {

        const species = answer.choice;
        const count = answer.answers && answer.answers.HOWMANY;

        if (user_id && assignment_id && classification_id && subject_id && species) {
          data.push({
            user_id,
            assignment_id,
            classification_id,
            subject_id,
            species,
            count,
          });
        }
      });
    });
  });
  
  return data;
}

export default classroomConfig;
