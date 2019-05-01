const TEXT_ES = {
  TITLES: {
    CLASSROOM: 'Aula',
    CREATE_NEW_CLASSROOM: 'Crear un salón de clases nuevo',
    EDIT_CLASSROOM: 'Editar el aula',
    ASSIGNMENTS: 'Asignaciones',
    CREATE_NEW_ASSIGNMENT: 'Crear una nueva asignaciones',
    EDIT_ASSIGNMENT: 'Editar el asignaciones',
    YOUR_ASSIGNMENTS: 'Tus asignaciones',
    STUDENTS: 'Estudiantes',
    SUBJECTS: 'Fotos',
    LIST_OF_CLASSROOMS: 'Lista de aulas',
    TEACHER_REGISTRATION_FORM: 'Formulario de registro de educador',
  },
  ACTIONS: {
    BACK: 'Regreso',  //Go back to the previous page.
    CREATE: 'Crear',  //Generic "create item" action.
    CREATE_NEW_CLASSROOM: 'Crear un salón de clases nuevo',
    CREATE_NEW_ASSIGNMENT: 'Crear una nueva asignaciones',
    DELETE: 'Borrar',  //Generic "delete item" action.
    DOWNLOAD_MY_DATA: 'Mis datos',
    EDIT: 'Editar',  //Generic "edit item" action.
    HELP: 'Ayuda',  //Generic "help" action, for How Tos, Guides, Instructions, etc.
    NEXT: 'Siguiente',  //Generic "next" action, e.g. to go to the next step in a tutorial.
    PREVIOUS: 'Anterior',  //Generic "previous" action, e.g. to go to the previous step in a tutorial.
    REGISTER_TEACHER: 'Registrar educador',
    SELECT_ALL: 'Seleccionar todo',  //Generic "select all" action, e.g. for a list of students.
    SELECT_SUBJECTS: 'Seleccionar fotos',
    SELECT_SUBJECTS_AGAIN: 'Cambiar la selección de fotos',
    START_ASSIGNMENT: 'Comenzar la asignación',
    SIGN_IN: 'Registrarse',
    SUBMIT: 'Enviar',  //Generic "submit form" action.
    UNSELECT_ALL: 'Deseleccionar todo',  //Generic "unselect all" action, e.g. for a list of students.
    UPDATE: 'Actualizar',  //Generic "update item" action.
    UPDATE_STUDENTS: 'Actualizar estudiantes',
    VIEW: 'Ver',  //Generic "view item" action.
  },
  STATUS: {
    SUCCESSES: {
      CLASSROOM_CREATED: 'Aula creada',
      CLASSROOM_EDITED: 'Cambios guardados',
      CLASSROOM_DELETED: 'Aula eliminada',
      STUDENT_DELETED_FROM_CLASSROOM: 'Estudiante eliminado del aula',
      ASSIGNMENT_CREATED: 'Asignación creada',
      ASSIGNMENT_EDITED: 'Cambios guardados',
      ASSIGNMENT_DELETED: 'Asignación eliminada',
      COPIED_TO_CLIPBOARD: 'Copiado al portapapeles',
    },
    ERRORS: {
      GENERAL: 'Algo salió mal',
      NOT_FOUND: 'No encontrada',
    },
    WORKING: 'Trabajando...',
  },
  HELPERS: {
    EDUCATORS_ASSIGNMENT_LIST: 'Haga clic en la flecha al lado del nombre de la tarea para ver la lista de estudiantes y su estado de finalización.',
    STUDENTS_ASSIGNMENT_LIST: 'Haga clic en la flecha al lado del nombre de la asignación para ver la fecha de vencimiento y las instrucciones.',
    EDUCATORS_JOIN_URL: 'Envíe esta URL a todos los estudiantes a los que desea unirse a este aula. ¡Pero primero, asegúrese de que sus estudiantes tengan una cuenta de Zooniverse y que hayan iniciado sesión antes de hacer clic en el enlace para unirse!',
    SUBJECTS_LIST: 'Elija el tipo y la cantidad de fotos de la cámara de fotos que desea que los estudiantes identifiquen.',
  },
  LABELS: {
    JOIN_URL: 'Únete a la URL',
    EDUCATOR: 'Educador',
    EDUCATORS: 'Educadores',
    STUDENT: 'Estudiante',
    STUDENTS: 'Estudiantes',
    EXPLORER: 'Explorador',
    EXPLORERS: 'Exploradores',
    SIGN_IN_REQUIRED: 'Inicio de sesión requerido',
    PHOTOS_SELECTED: 'foto(s) seleccionadas',
    FILTERS_SELECTED: 'filtros selected',
    PROGRESS: 'Progreso',
  },
  CLASSROOM_FORM: {
    NAME: 'Nombre del aula',
    SUBJECT: 'Materia del aula',
    SCHOOL: 'Colegio',
    DESCRIPTION: 'Descripción',
  },
  ASSIGNMENT_FORM: {
    NAME: 'Nombre de la asignación',
    DESCRIPTION: 'Instrucciones para estudiantes',
    CLASSIFICATIONS_TARGET: 'Número de materias que cada estudiante necesita clasificar',
    DUEDATE: 'Fecha de vencimiento',
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

export { TEXT_ES };