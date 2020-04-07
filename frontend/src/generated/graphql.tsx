import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type AdUser = {
   __typename?: 'ADUser',
  dn: Scalars['String'],
  userPrincipalName: Scalars['String'],
  cn: Scalars['String'],
};

export type AllUsersFilter = {
  email?: Maybe<Scalars['String']>,
  adEmail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  roles?: Maybe<Array<Scalars['Float']>>,
  groups?: Maybe<Array<Scalars['Float']>>,
};

export type Classification = {
   __typename?: 'Classification',
  id: Scalars['ID'],
  mark: Scalars['Float'],
  note: Scalars['String'],
  createdAt: Scalars['DateTime'],
  project: Project,
  user: User,
};

export type ClassificationDto = {
   __typename?: 'ClassificationDto',
  id: Scalars['Float'],
  mark: Scalars['Float'],
  note: Scalars['String'],
  createdAt: Scalars['DateTime'],
  project: ProjectDto,
  user: UserDto,
};

export type ClassificationsFilter = {
  id?: Maybe<Scalars['Float']>,
  project?: Maybe<Scalars['Float']>,
  user?: Maybe<Scalars['Float']>,
};

export type CreateClassificationDto = {
  mark: Scalars['Float'],
  note?: Maybe<Scalars['String']>,
  project: Scalars['Float'],
  user: Scalars['Float'],
};

export type CreateProjectDto = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
};

export type CreateTaskDto = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  dueDate: Scalars['DateTime'],
  completed?: Maybe<Scalars['Boolean']>,
  project: Scalars['Float'],
};

export type CreateUserDto = {
  name: Scalars['String'],
  adEmail?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  roleSlugs?: Maybe<Array<Scalars['String']>>,
};


export type Group = {
   __typename?: 'Group',
  id: Scalars['ID'],
  name: Scalars['String'],
  users: Array<User>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser: UserDto,
  signup: UserAuthDto,
  signin: UserAuthDto,
  updateUser: UserDto,
  logout: Scalars['Boolean'],
  deleteUser: UserDto,
  createProject: ProjectDto,
  deleteProject: ProjectDto,
  updateProject: ProjectDto,
  createTask: TaskDto,
  deleteTask: TaskDto,
  updateTask: TaskDto,
  createClassification: ClassificationDto,
};


export type MutationCreateUserArgs = {
  input: CreateUserDto
};


export type MutationSignupArgs = {
  input: SignUpUserDto
};


export type MutationSigninArgs = {
  auth: UserAuthInputDto
};


export type MutationUpdateUserArgs = {
  input: UpdateUserDto,
  filter: UsersFilter
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float']
};


export type MutationCreateProjectArgs = {
  input: CreateProjectDto
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['Float']
};


export type MutationUpdateProjectArgs = {
  updates: UpdateProjectDto,
  filter: ProjectsFilter
};


export type MutationCreateTaskArgs = {
  input: CreateTaskDto
};


export type MutationDeleteTaskArgs = {
  filter: TasksFilter
};


export type MutationUpdateTaskArgs = {
  updates: UpdateTaskDto,
  filter: TasksFilter
};


export type MutationCreateClassificationArgs = {
  input: CreateClassificationDto
};

export type Permission = {
   __typename?: 'Permission',
  id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
  roles: Array<Role>,
};

export type PermissionDto = {
   __typename?: 'PermissionDto',
  id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
};

export type PermissionStateDto = {
   __typename?: 'PermissionStateDto',
  slug: Scalars['String'],
  permitted: Scalars['Boolean'],
};

export type Project = {
   __typename?: 'Project',
  id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  user: User,
  tasks: Array<Task>,
  classifications: Array<Classification>,
};

export type ProjectDto = {
   __typename?: 'ProjectDto',
  id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  user: UserDto,
  tasks?: Maybe<Array<TaskDto>>,
};

export type ProjectsFilter = {
  id?: Maybe<Scalars['Float']>,
  name?: Maybe<Scalars['String']>,
  user?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  groups: Array<Group>,
  authUser: AdUser,
  user: UserDto,
  users: Array<UserDto>,
  me?: Maybe<UserAuthDto>,
  meExtended?: Maybe<UserAuthDto>,
  roles: Array<RoleDto>,
  projects: Array<ProjectDto>,
  project: ProjectDto,
  task: TaskDto,
  classifications: Array<ClassificationDto>,
};


export type QueryAuthUserArgs = {
  auth: UserAuthInputDto
};


export type QueryUserArgs = {
  filter: UsersFilter
};


export type QueryUsersArgs = {
  filter: AllUsersFilter
};


export type QueryRolesArgs = {
  filter: RolesFilter
};


export type QueryProjectsArgs = {
  filter: ProjectsFilter
};


export type QueryProjectArgs = {
  filter: ProjectsFilter
};


export type QueryTaskArgs = {
  filter: TasksFilter
};


export type QueryClassificationsArgs = {
  filter: ClassificationsFilter
};

export type Role = {
   __typename?: 'Role',
  id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
  admin: Scalars['Boolean'],
  permissions: Array<Permission>,
  users: Array<User>,
};

export type RoleDto = {
   __typename?: 'RoleDto',
  id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
  admin: Scalars['Boolean'],
  permissions: Array<PermissionDto>,
};

export type RolesFilter = {
  id?: Maybe<Scalars['Float']>,
  name?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  admin?: Maybe<Scalars['Boolean']>,
  permission?: Maybe<Scalars['String']>,
  user?: Maybe<Scalars['String']>,
};

export type SignUpUserDto = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type Task = {
   __typename?: 'Task',
  id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  dueDate: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  completed: Scalars['Boolean'],
  project: Project,
};

export type TaskDto = {
   __typename?: 'TaskDto',
  id: Scalars['Float'],
  name: Scalars['String'],
  description: Scalars['String'],
  dueDate: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  completed: Scalars['Boolean'],
  project: ProjectDto,
};

export type TasksFilter = {
  id?: Maybe<Scalars['Float']>,
  name?: Maybe<Scalars['String']>,
};

export type UpdateProjectDto = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateTaskDto = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  dueDate?: Maybe<Scalars['DateTime']>,
};

export type UpdateUserDto = {
  name: Scalars['String'],
  email: Scalars['String'],
  roleSlugs?: Maybe<Array<Scalars['String']>>,
  groups?: Maybe<Array<Scalars['Float']>>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String'],
  adEmail: Scalars['String'],
  roles: Array<Role>,
  groups: Array<Group>,
  projects: Array<Project>,
  classifications: Array<Classification>,
};

export type UserAuthDto = {
   __typename?: 'UserAuthDto',
  accessToken?: Maybe<Scalars['String']>,
  user?: Maybe<UserDto>,
  permissions?: Maybe<Array<PermissionStateDto>>,
  userTemp?: Maybe<UserTempDto>,
  registerToken?: Maybe<Scalars['String']>,
};

export type UserAuthInputDto = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type UserDto = {
   __typename?: 'UserDto',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  adEmail: Scalars['String'],
  password: Scalars['String'],
  groups: Array<Group>,
  roles: Array<RoleDto>,
};

export type UsersFilter = {
  id?: Maybe<Scalars['Float']>,
  email?: Maybe<Scalars['String']>,
  adEmail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type UserTempDto = {
   __typename?: 'UserTempDto',
  name: Scalars['String'],
  email: Scalars['String'],
};

export type ClassificationsQueryVariables = {
  user: Scalars['Float']
};


export type ClassificationsQuery = (
  { __typename?: 'Query' }
  & { classifications: Array<(
    { __typename?: 'ClassificationDto' }
    & Pick<ClassificationDto, 'id' | 'mark' | 'note' | 'createdAt'>
    & { project: (
      { __typename?: 'ProjectDto' }
      & Pick<ProjectDto, 'id' | 'name'>
      & { user: (
        { __typename?: 'UserDto' }
        & Pick<UserDto, 'name'>
      ) }
    ), user: (
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'id' | 'name'>
    ) }
  )> }
);

export type CreateClassificationMutationVariables = {
  mark: Scalars['Float'],
  note?: Maybe<Scalars['String']>,
  project: Scalars['Float'],
  user: Scalars['Float']
};


export type CreateClassificationMutation = (
  { __typename?: 'Mutation' }
  & { createClassification: (
    { __typename?: 'ClassificationDto' }
    & Pick<ClassificationDto, 'id' | 'mark'>
  ) }
);

export type CreateProjectMutationVariables = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>
};


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, 'id' | 'name' | 'description'>
    & { user: (
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'name'>
    ) }
  ) }
);

export type CreateTaskMutationVariables = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  dueDate: Scalars['DateTime'],
  project: Scalars['Float']
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'TaskDto' }
    & Pick<TaskDto, 'id' | 'name' | 'description' | 'completed' | 'createdAt' | 'dueDate'>
    & { project: (
      { __typename?: 'ProjectDto' }
      & Pick<ProjectDto, 'id' | 'name' | 'description'>
      & { tasks: Maybe<Array<(
        { __typename?: 'TaskDto' }
        & Pick<TaskDto, 'id' | 'name' | 'description' | 'createdAt' | 'dueDate' | 'completed'>
      )>> }
    ) }
  ) }
);

export type CreateUserMutationVariables = {
  name: Scalars['String'],
  adEmail?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  roleSlugs?: Maybe<Array<Scalars['String']>>
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserDto' }
    & Pick<UserDto, 'id' | 'name' | 'adEmail' | 'email'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, roles: Array<(
      { __typename?: 'RoleDto' }
      & Pick<RoleDto, 'id' | 'name' | 'slug' | 'admin'>
    )> }
  ) }
);

export type DeleteProjectMutationVariables = {
  projectId: Scalars['Float']
};


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteProject: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, 'id' | 'name'>
  ) }
);

export type DeleteTaskMutationVariables = {
  id: Scalars['Float']
};


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteTask: (
    { __typename?: 'TaskDto' }
    & Pick<TaskDto, 'id' | 'name'>
  ) }
);

export type DeleteUserMutationVariables = {
  id: Scalars['Float']
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'UserDto' }
    & Pick<UserDto, 'id'>
  ) }
);

export type GroupsQueryVariables = {};


export type GroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'UserAuthDto' }
    & { user: Maybe<(
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'id' | 'email'>
    )>, permissions: Maybe<Array<(
      { __typename?: 'PermissionStateDto' }
      & Pick<PermissionStateDto, 'slug' | 'permitted'>
    )>> }
  )> }
);

export type MeExtendedQueryVariables = {};


export type MeExtendedQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'UserAuthDto' }
    & { user: Maybe<(
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'id' | 'name' | 'email' | 'adEmail'>
      & { roles: Array<(
        { __typename?: 'RoleDto' }
        & Pick<RoleDto, 'id' | 'name' | 'slug' | 'admin'>
      )> }
    )>, permissions: Maybe<Array<(
      { __typename?: 'PermissionStateDto' }
      & Pick<PermissionStateDto, 'slug' | 'permitted'>
    )>> }
  )> }
);

export type ProjectQueryVariables = {
  id?: Maybe<Scalars['Float']>
};


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, 'id' | 'name' | 'description'>
    & { tasks: Maybe<Array<(
      { __typename?: 'TaskDto' }
      & Pick<TaskDto, 'id' | 'name' | 'description' | 'createdAt' | 'dueDate' | 'completed'>
    )>> }
  ) }
);

export type ProjectsQueryVariables = {
  userId?: Maybe<Scalars['String']>
};


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, 'id' | 'name' | 'description'>
    & { user: (
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'name'>
    ) }
  )> }
);

export type RolesQueryVariables = {
  admin?: Maybe<Scalars['Boolean']>
};


export type RolesQuery = (
  { __typename?: 'Query' }
  & { roles: Array<(
    { __typename?: 'RoleDto' }
    & Pick<RoleDto, 'id' | 'name' | 'slug' | 'admin'>
    & { permissions: Array<(
      { __typename?: 'PermissionDto' }
      & Pick<PermissionDto, 'name' | 'slug'>
    )> }
  )> }
);

export type SignInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signin: (
    { __typename?: 'UserAuthDto' }
    & Pick<UserAuthDto, 'accessToken' | 'registerToken'>
    & { user: Maybe<(
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'id' | 'email'>
    )>, permissions: Maybe<Array<(
      { __typename?: 'PermissionStateDto' }
      & Pick<PermissionStateDto, 'slug' | 'permitted'>
    )>>, userTemp: Maybe<(
      { __typename?: 'UserTempDto' }
      & Pick<UserTempDto, 'name' | 'email'>
    )> }
  ) }
);

export type SignUpMutationVariables = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'UserAuthDto' }
    & Pick<UserAuthDto, 'accessToken'>
    & { user: Maybe<(
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'id' | 'email'>
    )>, permissions: Maybe<Array<(
      { __typename?: 'PermissionStateDto' }
      & Pick<PermissionStateDto, 'slug' | 'permitted'>
    )>> }
  ) }
);

export type TaskQueryVariables = {
  id: Scalars['Float']
};


export type TaskQuery = (
  { __typename?: 'Query' }
  & { task: (
    { __typename?: 'TaskDto' }
    & Pick<TaskDto, 'id' | 'name' | 'description' | 'dueDate' | 'createdAt' | 'completed'>
  ) }
);

export type UpdateProjectMutationVariables = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  projectId: Scalars['Float']
};


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, 'id' | 'name' | 'description'>
    & { user: (
      { __typename?: 'UserDto' }
      & Pick<UserDto, 'id'>
    ) }
  ) }
);

export type UpdateTaskMutationVariables = {
  id: Scalars['Float'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  dueDate: Scalars['DateTime']
};


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'TaskDto' }
    & Pick<TaskDto, 'id' | 'name' | 'description' | 'dueDate' | 'createdAt' | 'completed'>
  ) }
);

export type UpdateUserMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String'],
  roleSlugs?: Maybe<Array<Scalars['String']>>,
  groups?: Maybe<Array<Scalars['Float']>>,
  userId: Scalars['Float']
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserDto' }
    & Pick<UserDto, 'id' | 'name' | 'adEmail' | 'email'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, roles: Array<(
      { __typename?: 'RoleDto' }
      & Pick<RoleDto, 'id' | 'name' | 'slug' | 'admin'>
    )> }
  ) }
);

export type UsersQueryVariables = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  adEmail?: Maybe<Scalars['String']>,
  roles?: Maybe<Array<Scalars['Float']>>,
  groups?: Maybe<Array<Scalars['Float']>>
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserDto' }
    & Pick<UserDto, 'id' | 'name' | 'email' | 'adEmail'>
    & { groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, roles: Array<(
      { __typename?: 'RoleDto' }
      & Pick<RoleDto, 'id' | 'name' | 'slug' | 'admin'>
    )> }
  )> }
);


export const ClassificationsDocument = gql`
    query Classifications($user: Float!) {
  classifications(filter: {user: $user}) {
    id
    mark
    note
    project {
      id
      name
      user {
        name
      }
    }
    createdAt
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useClassificationsQuery__
 *
 * To run a query within a React component, call `useClassificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassificationsQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useClassificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClassificationsQuery, ClassificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ClassificationsQuery, ClassificationsQueryVariables>(ClassificationsDocument, baseOptions);
      }
export function useClassificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClassificationsQuery, ClassificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClassificationsQuery, ClassificationsQueryVariables>(ClassificationsDocument, baseOptions);
        }
export type ClassificationsQueryHookResult = ReturnType<typeof useClassificationsQuery>;
export type ClassificationsLazyQueryHookResult = ReturnType<typeof useClassificationsLazyQuery>;
export type ClassificationsQueryResult = ApolloReactCommon.QueryResult<ClassificationsQuery, ClassificationsQueryVariables>;
export const CreateClassificationDocument = gql`
    mutation CreateClassification($mark: Float!, $note: String, $project: Float!, $user: Float!) {
  createClassification(input: {mark: $mark, note: $note, project: $project, user: $user}) {
    id
    mark
  }
}
    `;
export type CreateClassificationMutationFn = ApolloReactCommon.MutationFunction<CreateClassificationMutation, CreateClassificationMutationVariables>;

/**
 * __useCreateClassificationMutation__
 *
 * To run a mutation, you first call `useCreateClassificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClassificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClassificationMutation, { data, loading, error }] = useCreateClassificationMutation({
 *   variables: {
 *      mark: // value for 'mark'
 *      note: // value for 'note'
 *      project: // value for 'project'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateClassificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateClassificationMutation, CreateClassificationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateClassificationMutation, CreateClassificationMutationVariables>(CreateClassificationDocument, baseOptions);
      }
export type CreateClassificationMutationHookResult = ReturnType<typeof useCreateClassificationMutation>;
export type CreateClassificationMutationResult = ApolloReactCommon.MutationResult<CreateClassificationMutation>;
export type CreateClassificationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateClassificationMutation, CreateClassificationMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($name: String!, $description: String) {
  createProject(input: {name: $name, description: $description}) {
    id
    name
    description
    user {
      name
    }
  }
}
    `;
export type CreateProjectMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = ApolloReactCommon.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($name: String!, $description: String, $dueDate: DateTime!, $project: Float!) {
  createTask(input: {name: $name, description: $description, dueDate: $dueDate, project: $project}) {
    id
    name
    description
    completed
    createdAt
    dueDate
    project {
      id
      name
      description
      tasks {
        id
        name
        description
        createdAt
        dueDate
        completed
      }
    }
  }
}
    `;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      dueDate: // value for 'dueDate'
 *      project: // value for 'project'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $adEmail: String, $email: String!, $password: String, $roleSlugs: [String!]) {
  createUser(input: {name: $name, adEmail: $adEmail, email: $email, password: $password, roleSlugs: $roleSlugs}) {
    id
    name
    adEmail
    email
    groups {
      id
      name
    }
    roles {
      id
      name
      slug
      admin
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      adEmail: // value for 'adEmail'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      roleSlugs: // value for 'roleSlugs'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($projectId: Float!) {
  deleteProject(projectId: $projectId) {
    id
    name
  }
}
    `;
export type DeleteProjectMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = ApolloReactCommon.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: Float!) {
  deleteTask(filter: {id: $id}) {
    id
    name
  }
}
    `;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Float!) {
  deleteUser(userId: $id) {
    id
  }
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GroupsDocument = gql`
    query Groups {
  groups {
    id
    name
  }
}
    `;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
      }
export function useGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = ApolloReactCommon.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      email
    }
    permissions {
      slug
      permitted
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MeExtendedDocument = gql`
    query MeExtended {
  me {
    user {
      id
      name
      email
      adEmail
      roles {
        id
        name
        slug
        admin
      }
    }
    permissions {
      slug
      permitted
    }
  }
}
    `;

/**
 * __useMeExtendedQuery__
 *
 * To run a query within a React component, call `useMeExtendedQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeExtendedQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeExtendedQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeExtendedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeExtendedQuery, MeExtendedQueryVariables>) {
        return ApolloReactHooks.useQuery<MeExtendedQuery, MeExtendedQueryVariables>(MeExtendedDocument, baseOptions);
      }
export function useMeExtendedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeExtendedQuery, MeExtendedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeExtendedQuery, MeExtendedQueryVariables>(MeExtendedDocument, baseOptions);
        }
export type MeExtendedQueryHookResult = ReturnType<typeof useMeExtendedQuery>;
export type MeExtendedLazyQueryHookResult = ReturnType<typeof useMeExtendedLazyQuery>;
export type MeExtendedQueryResult = ApolloReactCommon.QueryResult<MeExtendedQuery, MeExtendedQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: Float) {
  project(filter: {id: $id}) {
    id
    name
    description
    tasks {
      id
      name
      description
      createdAt
      dueDate
      completed
    }
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
export function useProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = ApolloReactCommon.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($userId: String) {
  projects(filter: {user: $userId}) {
    id
    name
    description
    user {
      name
    }
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
export function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const RolesDocument = gql`
    query Roles($admin: Boolean) {
  roles(filter: {admin: $admin}) {
    id
    name
    slug
    admin
    permissions {
      name
      slug
    }
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *      admin: // value for 'admin'
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        return ApolloReactHooks.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
      }
export function useRolesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = ApolloReactCommon.QueryResult<RolesQuery, RolesQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signin(auth: {email: $email, password: $password}) {
    accessToken
    user {
      id
      email
    }
    permissions {
      slug
      permitted
    }
    userTemp {
      name
      email
    }
    registerToken
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($name: String, $email: String, $password: String) {
  signup(input: {name: $name, email: $email, password: $password}) {
    accessToken
    user {
      id
      email
    }
    permissions {
      slug
      permitted
    }
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const TaskDocument = gql`
    query Task($id: Float!) {
  task(filter: {id: $id}) {
    id
    name
    description
    dueDate
    createdAt
    completed
  }
}
    `;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TaskQuery, TaskQueryVariables>) {
        return ApolloReactHooks.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
      }
export function useTaskLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
        }
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskQueryResult = ApolloReactCommon.QueryResult<TaskQuery, TaskQueryVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($name: String!, $description: String, $projectId: Float!) {
  updateProject(updates: {name: $name, description: $description}, filter: {id: $projectId}) {
    id
    name
    description
    user {
      id
    }
  }
}
    `;
export type UpdateProjectMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, baseOptions);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = ApolloReactCommon.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: Float!, $name: String!, $description: String, $dueDate: DateTime!) {
  updateTask(filter: {id: $id}, updates: {name: $name, description: $description, dueDate: $dueDate}) {
    id
    name
    description
    dueDate
    createdAt
    completed
  }
}
    `;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      dueDate: // value for 'dueDate'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($name: String!, $email: String!, $roleSlugs: [String!], $groups: [Float!], $userId: Float!) {
  updateUser(input: {name: $name, email: $email, roleSlugs: $roleSlugs, groups: $groups}, filter: {id: $userId}) {
    id
    name
    adEmail
    email
    groups {
      id
      name
    }
    roles {
      id
      name
      slug
      admin
    }
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      roleSlugs: // value for 'roleSlugs'
 *      groups: // value for 'groups'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UsersDocument = gql`
    query Users($name: String, $email: String, $adEmail: String, $roles: [Float!], $groups: [Float!]) {
  users(filter: {name: $name, email: $email, adEmail: $adEmail, roles: $roles, groups: $groups}) {
    id
    name
    email
    adEmail
    groups {
      id
      name
    }
    roles {
      id
      name
      slug
      admin
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      adEmail: // value for 'adEmail'
 *      roles: // value for 'roles'
 *      groups: // value for 'groups'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;