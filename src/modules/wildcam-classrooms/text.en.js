const TEXT_EN = {
  TITLES: {
    CLASSROOM: 'Classroom',
    CREATE_NEW_CLASSROOM: 'Create new classroom',
    EDIT_CLASSROOM: 'Edit classroom',
    ASSIGNMENTS: 'Assignments',
    CREATE_NEW_ASSIGNMENT: 'Create new assignment',
    EDIT_ASSIGNMENT: 'Edit assignment',
    YOUR_ASSIGNMENTS: 'Your Assignments',
    STUDENTS: 'Students',
    SUBJECTS: 'Photos',
    LIST_OF_CLASSROOMS: 'List of Classrooms',
    TEACHER_REGISTRATION_FORM: 'Teacher Registration Form',
  },
  ACTIONS: {
    BACK: 'Back',  //Go back to the previous page.
    CREATE: 'Create',  //Generic "create item" action.
    CREATE_NEW_CLASSROOM: 'Create new classroom',
    CREATE_NEW_ASSIGNMENT: 'Create new assignment',
    DELETE: 'Delete',  //Generic "delete item" action.
    DOWNLOAD_MY_DATA: 'My Data',
    EDIT: 'Edit',  //Generic "edit item" action.
    HELP: 'Help',  //Generic "help" action, for How Tos, Guides, Instructions, etc.
    NEXT: 'Next',  //Generic "next" action, e.g. to go to the next step in a tutorial.
    PREVIOUS: 'Previous',  //Generic "previous" action, e.g. to go to the previous step in a tutorial.
    REGISTER_TEACHER: 'Register Teacher',
    SELECT_ALL: 'Select all',  //Generic "select all" action, e.g. for a list of students.
    SELECT_SUBJECTS: 'Select photos',
    SELECT_SUBJECTS_AGAIN: 'Change photo selection',
    START_ASSIGNMENT: 'Start assignment',
    SIGN_IN: 'Sign in',
    SUBMIT: 'Submit',  //Generic "submit form" action.
    UNSELECT_ALL: 'Unselect all',  //Generic "unselect all" action, e.g. for a list of students.
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
      COPIED_TO_CLIPBOARD: 'Copied to clipboard',
    },
    ERRORS: {
      GENERAL: 'Something went wrong',
      NOT_FOUND: 'Not found',
    },
    WORKING: 'Working...',
  },
  HELPERS: {
    EDUCATORS_ASSIGNMENT_LIST: 'Click the arrow next to the assignment name to view the list of students and their completion status.',
    STUDENTS_ASSIGNMENT_LIST: 'Click on the arrow next to the assignment name to view the due date and instructions.',
    EDUCATORS_JOIN_URL: 'Send this URL to all the students you want to join this classroom. But first, make sure your students have a Zooniverse account and are logged in before they click the link to join!',
    SUBJECTS_LIST: 'Choose the type and quantity of trail camera photos you want your students to identify.',
    REMEMBER_TO_LOGIN: 'Please remember to login at zooniverse.org before starting your assignment. Click on "Start Assignment" again once you\'re ready.',
  },
  LABELS: {
    JOIN_URL: 'Join URL',
    EDUCATOR: 'Educator',
    EDUCATORS: 'Educators',
    STUDENT: 'Student',
    STUDENTS: 'Students',
    EXPLORER: 'Explorer',
    EXPLORERS: 'Explorers',
    SIGN_IN_REQUIRED: 'Sign in required',
    PHOTOS_SELECTED: 'photo(s) selected',
    FILTERS_SELECTED: 'filter(s) selected',
    PROGRESS: 'Progress',
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
    CLASSIFICATIONS_TARGET: 'Number of photos each student needs to classify',
    DUEDATE: 'Due date',
  },
  ASSIGNMENT_FORM_PLACEHOLDERS: {
    DUEDATE: 'MM-DD-YYYY',
  },
  TEACHER_REGISTRATION_FORM: {
    STATUS: {
      DATA_FETCHED: 'You have already registered.',
      DATA_SENT: 'Success: registration data submitted.',
      ERROR: 'Error: could not communicate registration data.',
    },
    FIELDS: {
      COUNTRY: 'Where do you teach?',
      SETTING: 'In what educational setting do you plan to use this resource?',
      AGE: 'I plan to use this resource with my students.',
      COURSE: 'In what course(s) do you plan to use this resource?',
      FOUNDON: 'How did you find out about this resource?',
      RESOURCE: 'Have you used HHMI BioInteractive resources in your teaching before?',
      FEEDBACK: 'Feedback from educators like you helps us improve our free educational resources. May we contact you at a later time?',
    },
    ANSWERS: {
      SETTING: [
        'Formal education (e.g., classroom, lab)',
        'Informal education (e.g., zoo, museum, nature center)',
        'Home school',
        'Other',
      ],
      AGE: [
        'Elementary School',
        'Middle School/Junior High',
        'High School',
        '2-yr College',
        '4-yr College/University',
        'Other',
      ],
      COURSE: [
        'Ecology',
        'Biology',
        'Environmental Science',
        'Geology/Earth Science',
        'Geography',
        'Other',
      ],
      FOUNDON: [
        'Zooniverse',
        'BioInteractive News e-newsletter',
        'Workshop/conference',
        'Social Media',
        'News story/blog',
        'Internet search',
        'Educator Forum or ListServ',
        'Friend/Colleague',
        'Other',
      ],
      RESOURCE: [
        'Yes',
        'No',
      ],
      FEEDBACK: [
        'Yes',
        'No',
      ],
    },
  },
};

export { TEXT_EN };