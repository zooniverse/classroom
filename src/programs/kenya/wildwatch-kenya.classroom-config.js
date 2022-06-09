/*
Wildwatch Kenya Classroom Config
================================

Configuration file for the WildCam Classroom feature. Each ClassroomConfig is
tailored to a specific project, and this config file is for Wildwatch Kenya.

********************************************************************************
 */

import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
superagentJsonapify(superagent);

import { env } from '../../lib/config';
import mapConfig from './wildwatch-kenya.map-config.js';

const classroomConfig = {
  forStudents: {
    urlToAssignment: (env === 'production')
      ? 'https://www.zooniverse.org/projects/sandiegozooglobal/wildwatch-kenya/classify?workflow=default&classroom=1'
      : 'https://master.pfe-preview.zooniverse.org/projects/camallen/wildwatch-kenya/classify?workflow=default&classroom=1',
    transformClassificationsDownload: transformWildwatchAssignments
  },
  forEducators: {
    extraInfoFor: {
      classroomsList: 'A classroom allows you to see how many animal identifications each of your students has done and to create assignments for groups of students. Students must create Zooniverse accounts to join a classroom. Create a new classroom or view and edit an existing classroom below.',
      classroomsHelpPart1: [
        'The value of creating classrooms is the ability to create assignments for your students.',
        'If you do not create a classroom, your students can still view and download the trail camera data as Explorers without creating a Zooniverse account.',
      ],
      assignmentsHelp: [
        'An assignment allows you to select a specific number of photos (e.g. 30) for each student to process from the live database. Via the assignment you can keep track of how many photos each student has processed. Let\'s walk through how this works.',
        'Click "+Create new assignment".',
        'Fill out the assignment name and instructions for students (ex: Go through the Wildwatch Kenya platform and be a citizen scientist! Process 10 photos, download your data, and make a graph of what different species you found. Write a page about your experience. Was it what you expected? What surprised you most? Was there something you were expecting to see? What questions do you now have? Did you encounter any challenges?)',
        'Fill out the due date, the number of photos you want each student to process, and finally which students in your classroom you want to assign it too. If you only want to send this assignment to a group of students within a classroom, select only those students. You can create a new assignment if you wish to assign a different number of photos to another group. Click Create to send the assignment to those students. If you have not shared the classroom with any of your students yet you can click create without selecting any students and do this last step later.',
        'To view and edit your assignments, navigate to that classroom and click Edit.',
        'You can see a list of your students and the number of classifications they have made by clicking the dropdown arrow to the left of the edit button for that assignment. ',
        'Your students can view their assignment by going to the assignments page in the Explorer section. They must be logged into their Zooniverse account to access their assignment.',
      ],
    },
  },
};

function transformWildwatchAssignments (classifications) {
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

function combineWithSubjectMetadata (classifications = []) {
  if (classifications.length === 0) return []

  const allSubjectIds = classifications.map(c => c.subject_id).join(',')
  const query = mapConfig.database.queries.selectAllSubjects
    .replace('{WHERE}', allSubjectIds ? ` WHERE subject_id IN (${allSubjectIds})` : '')
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
            //subject_id: ''  // No, leave this alone
            location: '',
            month: '',
            year: '',
            'data.choice': '',
            'data.choice_count': '',
            'data.total_vote_count': '',
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
