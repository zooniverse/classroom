/* eslint quote-props: ["error", 0] */

import { State, Effect, Actions } from 'jumpstate';
import PropTypes from 'prop-types';
import { get, post, put, httpDelete } from '../lib/edu-api';
import { env } from '../lib/config';

// testing mocks and constants
const i2aAssignmentNames = {
  galaxy: "Galaxy Zoo 101",
  hubble: "Hubble's Law"
}

const i2a = {
  staging: {
    id: '1',
    name: 'Astro 101 with Galaxy Zoo',
    custom: false,
    description: 'Materials and tools for engaging introductory astronomy students in real research with Galaxy Zoo.',
    slug: 'astro-101-with-galaxy-zoo',
    metadata: {
      backgroundImage: 'astro-background.jpg',
      cardImage: 'home-card-intro-to-astro.jpg',
      redirectOnJoin: false,
      assignments: {
        // workflow_id: { assignmentMetadata }
        // used to relate the assignment resource that has a workflow id property
        // back to a project without having to request that from Panoptes
        // to then build the URL to the project in the UI.
        // These are just test projects on staging...
        "2218": {
          name: i2aAssignmentNames.hubble,
          classifications_target: "10",
          slug: 'srallen086/intro2astro-hubble-testing'
        },
        "3037": {
          name: i2aAssignmentNames.galaxy,
          classifications_target: "22",
          slug: 'srallen086/galaxy-zoo-in-astronomy-101'
        }
      }
    }
  },
  production: {
    id: '1',
    name: 'Astro 101 with Galaxy Zoo',
    custom: false,
    description: 'Materials and tools for engaging introductory astronomy students in real research with Galaxy Zoo.',
    slug: 'astro-101-with-galaxy-zoo',
    metadata: {
      backgroundImage: 'astro-background.jpg',
      cardImage: 'home-card-intro-to-astro.jpg',
      redirectOnJoin: false,
      assignments: {
        // workflow_id: { assignmentMetadata }
        // used to relate the assignment resource that has a workflow id property
        // back to a project without having to request that from Panoptes
        // to then build the URL to the project in the UI.
        "5522": {
          name: i2aAssignmentNames.hubble,
          classifications_target: "10",
          slug: 'zooniverse/intro2astro-hubbles-law'
        },
        "5521": {
          name: i2aAssignmentNames.galaxy,
          classifications_target: "22",
          slug: 'zooniverse/galaxy-zoo-in-astronomy-101'
        }
      }
    }
  }
};

const darien = {
  staging: {
    id: '2',
    name: 'Wildcam Darien Lab',
    custom: true,
    description: 'A map for exploring camera trap data from the WildCam Darien project.',
    slug: 'wildcam-darien-lab',
    metadata: {
      backgroundImage: '',
      cardImage: 'home-card-wildcam-darien.jpg',
      redirectOnJoin: true,
      sampleSubjects: ['73437', '73438', '73434'],
      workflowId: '3116' // belongs to project 1807
    }
  },
  production: {
    id: '2',
    name: 'Wildcam Darien Lab',
    custom: true,
    description: 'A map for exploring camera trap data from the WildCam Darien project.',
    slug: 'wildcam-darien-lab',
    metadata: {
      backgroundImage: '',
      cardImage: 'home-card-wildcam-darien.jpg',
      redirectOnJoin: true,
      sampleSubjects: [],
      workflowId: '3033' // belongs to project 3525
    }
  }
};

const gorongosa = {
  staging: {
    id: '4',
    name: 'Wildcam Gorongosa Lab',
    custom: true,
    description: 'A map for exploring camera trap data from the WildCam Gorongosa project.',
    slug: 'wildcam-gorongosa-lab',
    metadata: {
      cardImage: 'gorongosa-animals.jpg',
      redirect: 'https://lab.wildcamgorongosa.org/',
      // We used hard coded sample subject ids because the Carto DB is only for production
      // These are used in the assignment creation in development so that the POST works
      sampleSubjects: ['37763', '37755', '37767'],
      workflowId: '1549' // Belongs to project 937
    }
  },
  production: {
    id: '3',
    name: 'Wildcam Gorongosa Lab',
    custom: true,
    description: 'A map for exploring camera trap data from the WildCam Gorongosa project.',
    slug: 'wildcam-gorongosa-lab',
    metadata: {
      cardImage: 'gorongosa-animals.jpg',
      redirect: 'https://lab.wildcamgorongosa.org/',
      sampleSubjects: [],
      workflowId: '338' // belongs to project 593
    }
  }
}

i2a.development = i2a.staging;
darien.development = darien.staging;
gorongosa.development = gorongosa.staging;

const programsArray = [
  i2a[env],
  darien[env],
  gorongosa[env]
];

const programsMocks = {
  i2a: i2a[env],
  darien: darien[env],
  gorongosa: gorongosa[env]
};

// Constants
const PROGRAMS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  CREATING: 'creating',
  UPDATING: 'updating',
  DELETING: 'deleting',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Initial State and PropTypes - usable in React components.
const PROGRAMS_INITIAL_STATE = {
  error: null,
  programs: [],
  selectedProgram: null,
  status: PROGRAMS_STATUS.IDLE
};

const programPropTypes = {
  custom: PropTypes.bool,
  description: PropTypes.string,
  id: PropTypes.string,
  metadata: PropTypes.object,
  name: PropTypes.string,
  slug: PropTypes.string
};

const PROGRAMS_PROPTYPES = {
  selectedProgram: PropTypes.shape(programPropTypes),
  programs: PropTypes.arrayOf(PropTypes.shape(programPropTypes)),
  error: PropTypes.object,
  status: PropTypes.string
};

// Helper Functions
function handleError(error) {
  Actions.programs.setStatus(PROGRAMS_STATUS.ERROR);
  Actions.programs.setError(error);
  Actions.notification.setNotification({ status: 'critical' , message: 'Something went wrong.' });
  console.error(error);
}

function sortPrograms(programs) {
  programs.sort((a,b) => {
    const programNameA = a.name.toUpperCase();
    const programNameB = b.name.toUpperCase();

    if (programNameA > programNameB) {
      return 1;
    }
  });

  return programs;
}

// Synchonous actions
const setStatus = (state, status) => {
  return { ...state, status };
};

const selectProgram = (state, selectedProgram) => {
  return { ...state, selectedProgram };
};

const setPrograms = (state, programs) => {
  return { ...state, programs };
};

const setError = (state, error) => {
  return { ...state, error };
};

// Effects are for async actions and get automatically to the global Actions list
Effect('getPrograms', () => {
  Actions.programs.setStatus(PROGRAMS_STATUS.FETCHING);

  return get('/programs')
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/programs/getPrograms): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        const sortedPrograms = sortPrograms(response.body.data);
        Actions.programs.setStatus(PROGRAMS_STATUS.SUCCESS);
        Actions.programs.setPrograms(sortedPrograms);

        return sortedPrograms;
      }
      throw 'ERROR (ducks/programs/getPrograms): Invalid response';
    }).catch(error => handleError(error));
});

Effect('getProgram', (data) => {
  Actions.programs.setStatus(PROGRAMS_STATUS.FETCHING);

  return Promise.resolve(data.programs.filter(program => program.slug === data.param))
    .then(([program]) => {
      Actions.programs.setStatus(PROGRAMS_STATUS.SUCCESS);
      Actions.programs.selectProgram(program);
      return program;
    }).then((program) => {
      // Actions.getClassroomsAndAssignments(program.id);
    }).catch(error => handleError(error));
});

// For a UI managed by Admins eventually. Untested...
Effect('createProgram', (data) => {
  Actions.programs.setStatus(PROGRAMS_STATUS.CREATING);

  return post('/programs', { data: { attributes: data } })
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/programs/createProgram): No response'; }
      if (response.ok &&
          response.body && response.body.data) {
        return Actions.programs.setStatus(PROGRAMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/programs/createProgram): Invalid response';
    })
    .catch((error) => {
      handleError(error);
    });
});

Effect('updateProgram', (data) => {
  Actions.programs.setStatus(PROGRAMS_STATUS.UPDATING);
  return put(`/programs/${data.id}`, { data: { attributes: data.payload } })
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/programs/updateProgram): No response'; }
      if (response.ok) {
        return Actions.programs.setStatus(PROGRAMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/programs/updateProgram): Invalid response';
    })
    .catch((error) => {
      handleError(error);
    });
});

Effect('deleteProgram', (id) => {
  Actions.programs.setStatus(PROGRAMS_STATUS.DELETING);

  return httpDelete(`/programs/${id}`)
    .then((response) => {
      if (!response) { throw 'ERROR (ducks/programs/deleteProgram): No response'; }
      if (response.ok) {
        return Actions.classrooms.setStatus(PROGRAMS_STATUS.SUCCESS);
      }
      throw 'ERROR (ducks/programs/deleteProgram): Invalid response';
    })
    .catch((error) => {
      handleError(error);
    });
});

const programs = State('programs', {
  // Initial state
  initial: PROGRAMS_INITIAL_STATE,
  // Actions
  setError,
  setPrograms,
  selectProgram,
  setStatus
});

export default programs;
export {
  PROGRAMS_STATUS,
  PROGRAMS_INITIAL_STATE,
  PROGRAMS_PROPTYPES,
  programsArray,
  programsMocks,
  i2aAssignmentNames
};
