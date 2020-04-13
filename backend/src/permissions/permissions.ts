export const PERMISSIONS = {
  // Can create own projects and manage them
  PROJECTS_CREATE: 'projects.create',

  // Can manage projects of other users
  PROJECTS_MANAGE: 'projects.manage',

  // Can view all other projects
  PROJECTS_VIEW: 'projects.view',

  // Can claim a project as its supervisor
  PROJECTS_CLAIM: 'projects.claim',

  // Can manage the supervisor of a project
  PROJECTS_CLAIM_MANAGE: 'projects.claim.manage',

  // Can create and manage student accounts
  MANAGE_STUDENT_USERS: 'users.students.manage',

  // Can create and manage teacher accounts
  MANAGE_TEACHER_USERS: 'users.teachers.manage',

  // Can delete accounts which are manageable by the user
  DELETE_USERS: 'users.delete',

  // Can create classification
  CLASSIFICATION_CREATE: 'classification.create',

  // Can edit and delete classification
  CLASSIFICATION_MANAGE: 'classification.manage',

  // Can view classification
  CLASSIFICATION_VIEW: 'classification.view',
};
