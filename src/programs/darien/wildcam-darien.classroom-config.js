/*
WildCam Darien Classroom Config
===============================

Configuration file for the WildCam Classroom feature. Each ClassroomConfig is
tailored to a specific project, and this config file is for WildCam Darien.

********************************************************************************
 */

import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
superagentJsonapify(superagent);

import { env } from '../../lib/config';
import mapConfig from './wildcam-darien.map-config.js';

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
  return Promise.resolve(classificationResourceToJson(classifications))
    .then(combineWithSubjectMetadata);
}
  
function classificationResourceToJson (classifications) {
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

function combineWithSubjectMetadata (classifications) {
  
  const query = mapConfig.database.queries.selectAllSubjects
    .replace('{WHERE}', '')
    .replace('{ORDER}', '')
    .replace('{LIMIT}', '');
  const url = mapConfig.database.urls.json.replace('{SQLQUERY}', query);
  
  return superagent.get(url)
    .then(res => {
      if (res.ok && res.body && res.body.rows) return res.body.rows;
      throw 'ERROR';
    })
    .then(subjects => {
      return classifications.map(classification => {
        let subject = subjects.find(s => s.subject_id == classification.subject_id);  // Use ==, not ===, due to different data types.
        
        if (!subject) {
          subject = {  // Default Subject data; the data structure consistency is required to keep JSON-to-CSV automation working
            camera: '',
            date: '',
            dist_humans_m: '',
            dist_water_m: '',
            image_url: '',
            land_use: '',
            latitude: '',
            longitude: '',
            month: '',
            national_park: '',
            season: '',
            //subject_id: ''  // No, leave this alone
            time_period: '',
            veg_type: '',
            water_type: '',
            year: '',
          };
        }
        
        return { ...classification, ...subject };
      });
    
    
      return classifications;
    })
    .catch(err => {
      return classifications;
    });
}

export default classroomConfig;
