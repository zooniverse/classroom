/*
WildCam Gorongosa Classroom Config
===============================

Configuration file for the WildCam Classroom feature. Each ClassroomConfig is
tailored to a specific project, and this config file is for WildCam Gorongosa.

********************************************************************************
 */

import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
superagentJsonapify(superagent);

import { env } from '../../lib/config';
import mapConfig from './wildcam-gorongosa.map-config.js';

const classroomConfig = {
  forStudents: {
    urlToAssignment: (env === 'production')
      ? 'https://www.zooniverse.org/projects/zooniverse/wildcam-gorongosa/classify?workflow={WORKFLOW_ID}&classroom=1'
      : 'https://www.zooniverse.org/projects/zooniverse/wildcam-gorongosa/classify?workflow={WORKFLOW_ID}&classroom=1',  //TODO: find the staging equivalent for WildCam Gorongosa
    transformClassificationsDownload: transformWildCamAssignments
  },
  forEducators: {
    extraInfoFor: {
      classroomsList: 'A classroom allows you to see how many animal identifications each of your students do and to create assignments for groups of students. If you do not create a classroom, your students can still view and download the trail camera data as Explorers without creating a Zooniverse account. Students must create Zooniverse accounts to join a classroom. Create a new classroom or view and edit an existing classroom below.',
      classroomsHelpPart1: [],
      assignmentsHelp: [
        'If you do not create a classroom, your students can still view and download the trail camera data as Explorers without creating a Zooniverse account.',
        'The value of creating classrooms is the ability to create assignments for your students. An assignment allows you to select a specific subset of photos (e.g. 30 photos from the Dry Season) and assign those photos to a group of students in your classroom to identify. Another group of students can identify a different set of photos (e.g. 30 photos from the Wet Season). Let’s walk through how it works.',
        'After you create a classroom share the link for your students join. After they have all joined, view your classroom and click “Create New Assignment”.',
        'Fill in the Assignment name, instructions, and due date that your students will see. Include as much detail as you like in the instructions. For example, you may ask students to do a task outside the WildCam Lab platform (e.g. record observations while making animal identifications).',
        'Click select photos. On the interactive map, the entire set of trail camera photos will be preselected. The number in this box shows the total number of photos selected. The images you assign to your students when you create your assignment will be randomly selected from this set. For example, if you assign 10 images for each student, 10 random images will be chosen and assigned to each student. If you want all of your students to see the exact same images, enter 10 here and all of your students will see the exact same images. If you want your students to see different images, don\'t change the number of images here and there will be a higher likelihood of your students seeing different images. If you want your students to identify any type of photo, do not select any filters. Click Select.',
        'If you want your students to identify a particular type of photo, click the filters dropdown and select as many filters as you wish to apply. Click Select.',
        'Edit the number of photos you want your students to identify. Next, select the students to send this assignment to. You can send an assignment to the entire class or send different assignments to groups of students. Click Create.',
        'To see a list of your students and the number of classifications they made, navigate to that classroom and click the dropdown arrow next to the assignment. To edit or delete your assignment, click Edit.',
        'Your students can start their assignment by logging in and going to the assignments page in the Student section.',
      ],
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
