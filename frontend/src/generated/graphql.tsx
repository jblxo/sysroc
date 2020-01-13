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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AdUser = {
   __typename?: 'ADUser',
  dn: Scalars['String'],
  userPrincipalName: Scalars['String'],
  cn: Scalars['String'],
};

export type CreateProjectDto = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
};

export type CreateTaskDto = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  dueDate: Scalars['DateTime'],
  completed: Scalars['Boolean'],
  project: Scalars['String'],
};

export type CreateUserDto = {
  email: Scalars['String'],
  password: Scalars['String'],
};


export type Group = {
   __typename?: 'Group',
  name: Scalars['String'],
  users?: Maybe<Array<User>>,
};

export type Mutation = {
   __typename?: 'Mutation',
  create: UserDto,
  signup: UserAuthDto,
  signin: UserAuthDto,
  logout: Scalars['Boolean'],
  deleteUser: Scalars['Boolean'],
  createProject: ProjectDto,
  deleteProject: ProjectDto,
  updateProject: ProjectDto,
  createTask: TaskDto,
};


export type MutationCreateArgs = {
  input: CreateUserDto
};


export type MutationSignupArgs = {
  input: SignUpUserDto
};


export type MutationSigninArgs = {
  auth: UserAuthInputDto
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']
};


export type MutationCreateProjectArgs = {
  input: CreateProjectDto
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String']
};


export type MutationUpdateProjectArgs = {
  updates: UpdateProjectDto,
  filter: ProjectsFilter
};


export type MutationCreateTaskArgs = {
  input: CreateTaskDto
};

export type Permission = {
   __typename?: 'Permission',
  _id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
  roles?: Maybe<Array<Role>>,
};

export type PermissionStateDto = {
   __typename?: 'PermissionStateDto',
  slug: Scalars['String'],
  permitted: Scalars['Boolean'],
};

export type Project = {
   __typename?: 'Project',
  _id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  user: User,
  tasks: Array<Task>,
};

export type ProjectDto = {
   __typename?: 'ProjectDto',
  _id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  user?: Maybe<User>,
  tasks?: Maybe<Array<TaskDto>>,
};

export type ProjectsFilter = {
  _id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  user?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  authUser: AdUser,
  user: UserDto,
  users: Array<UserDto>,
  me?: Maybe<UserAuthDto>,
  projects: Array<ProjectDto>,
  project: ProjectDto,
};


export type QueryAuthUserArgs = {
  auth: CreateUserDto
};


export type QueryUserArgs = {
  _id?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  adEmail?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>
};


export type QueryProjectsArgs = {
  filter: ProjectsFilter
};


export type QueryProjectArgs = {
  filter: ProjectsFilter
};

export type Role = {
   __typename?: 'Role',
  _id: Scalars['ID'],
  name: Scalars['String'],
  slug: Scalars['String'],
  admin: Scalars['Boolean'],
  permissions?: Maybe<Array<Permission>>,
  users?: Maybe<Array<User>>,
};

export type SignUpUserDto = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type Task = {
   __typename?: 'Task',
  _id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  dueDate: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  completed: Scalars['Boolean'],
  project: Project,
};

export type TaskDto = {
   __typename?: 'TaskDto',
  _id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  dueDate: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
  completed: Scalars['Boolean'],
  project: Project,
};

export type UpdateProjectDto = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  _id: Scalars['ID'],
  name: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String'],
  adEmail: Scalars['String'],
  groups?: Maybe<Array<Group>>,
  projects?: Maybe<Array<Project>>,
  roles?: Maybe<Array<Role>>,
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
  _id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  adEmail: Scalars['String'],
  password: Scalars['String'],
  groups?: Maybe<Array<Group>>,
  roles?: Maybe<Array<Role>>,
};

export type UserTempDto = {
   __typename?: 'UserTempDto',
  name: Scalars['String'],
  email: Scalars['String'],
};

export type CreateProjectMutationVariables = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>
};


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, '_id' | 'name' | 'description'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )> }
  ) }
);

export type DeleteProjectMutationVariables = {
  projectId: Scalars['String']
};


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteProject: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, '_id' | 'name'>
  ) }
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
      & Pick<UserDto, '_id' | 'email'>
    )>, permissions: Maybe<Array<(
      { __typename?: 'PermissionStateDto' }
      & Pick<PermissionStateDto, 'slug' | 'permitted'>
    )>> }
  )> }
);

export type ProjectQueryVariables = {
  _id?: Maybe<Scalars['String']>
};


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, '_id' | 'name' | 'description'>
    & { tasks: Maybe<Array<(
      { __typename?: 'TaskDto' }
      & Pick<TaskDto, '_id' | 'name' | 'description' | 'createdAt' | 'dueDate' | 'completed'>
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
    & Pick<ProjectDto, '_id' | 'name' | 'description'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
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
      & Pick<UserDto, '_id' | 'email'>
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
      & Pick<UserDto, '_id' | 'email'>
    )>, permissions: Maybe<Array<(
      { __typename?: 'PermissionStateDto' }
      & Pick<PermissionStateDto, 'slug' | 'permitted'>
    )>> }
  ) }
);

export type UpdateProjectMutationVariables = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  projectId: Scalars['String']
};


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'ProjectDto' }
    & Pick<ProjectDto, '_id' | 'name' | 'description'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id'>
    )> }
  ) }
);


export const CreateProjectDocument = gql`
    mutation CreateProject($name: String!, $description: String) {
  createProject(input: {name: $name, description: $description}) {
    _id
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
export const DeleteProjectDocument = gql`
    mutation deleteProject($projectId: String!) {
  deleteProject(projectId: $projectId) {
    _id
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
      _id
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
export const ProjectDocument = gql`
    query Project($_id: String) {
  project(filter: {_id: $_id}) {
    _id
    name
    description
    tasks {
      _id
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
 *      _id: // value for '_id'
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
    _id
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
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signin(auth: {email: $email, password: $password}) {
    accessToken
    user {
      _id
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
      _id
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
export const UpdateProjectDocument = gql`
    mutation UpdateProject($name: String!, $description: String, $projectId: String!) {
  updateProject(updates: {name: $name, description: $description}, filter: {_id: $projectId}) {
    _id
    name
    description
    user {
      _id
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