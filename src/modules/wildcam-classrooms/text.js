/*
//TODO: HELPER
import { TEXT } from '../text.js';
*/

export const TEXT = {
  TITLES: {
    CLASSROOM: 'Classroom',
    CREATE_NEW_CLASSROOM: 'Create new classroom',
    EDIT_CLASSROOM: 'Edit classroom',
    ASSIGNMENTS: 'Assignments',
    CREATE_NEW_ASSIGNMENT: 'Create new assignment',
    EDIT_ASSIGNMENT: 'Edit assignment',
    YOUR_ASSIGNMENTS: 'Your Assignments',
    STUDENTS: 'Students',
    SUBJECTS: 'Subjects',
  },
  ACTIONS: {
    BACK: 'Back',  //Go back to the previous page.
    CREATE: 'Create',  //Generic "create item" action.
    CREATE_NEW_CLASSROOM: 'Create new classroom',
    CREATE_NEW_ASSIGNMENT: 'Create new assignment',
    DELETE: 'Delete',  //Generic "delete item" action.
    EDIT: 'Edit',  //Generic "edit item" action.
    HELP: 'Help',  //Generic "help" action, for How Tos, Guides, Instructions, etc.
    NEXT: 'Next',  //Generic "next" action, e.g. to go to the next step in a tutorial.
    PREVIOUS: 'Previous',  //Generic "previous" action, e.g. to go to the previous step in a tutorial.
    SELECT_SUBJECTS: 'Select subjects',
    START_ASSIGNMENT: 'Start assignment',
    SUBMIT: 'Submit',  //Generic "submit form" action.
    UPDATE: 'Update',  //Generic "update item" action.
    UPDATE_STUDENTS: 'Update students',
    VIEW: 'View',  //Generic "view item" action.
  },
  STATUS: {
    SUCCESSES: {
      CLASSROOM_CREATED: 'Classroom created',
      CLASSROOM_EDITED: 'Changes saved',
      CLASSROOM_DELETED: 'Classroom deleted',
      STUDENT_DELETED_FROM_CLASSROOM: 'Student removed from classroom',
      ASSIGNMENT_CREATED: 'Assignment created',
      ASSIGNMENT_EDITED: 'Changes saved',
      ASSIGNMENT_DELETED: 'Assignment deleted',
    },
    ERRORS: {
      GENERAL: 'Something went wrong',
      NOT_FOUND: 'Not found',  //Usu
    },
    WORKING: 'Working...',
  },
  LABELS: {
    JOIN_URL: 'Join URL',
  },
  CLASSROOM_FORM: {
    NAME: 'Classroom name',
    SUBJECT: 'Classroom subject',
    SCHOOL: 'School',
    DESCRIPTION: 'Description',
  },
  ASSIGNMENT_FORM: {
    NAME: 'Assignment name',
    DESCRIPTION: 'Instructions for students',
    CLASSIFICATIONS_TARGET: 'Number of subjects each student needs to classify',
    DUEDATE: 'Due date',
  },
  ASSIGNMENT_FORM_PLACEHOLDERS: {
    DUEDATE: 'e.g. 2020-12-31',
  },
};