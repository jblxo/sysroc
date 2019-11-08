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
};

export type AdUser = {
   __typename?: 'ADUser',
  dn: Scalars['String'],
  userPrincipalName: Scalars['String'],
  cn: Scalars['String'],
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
  signup: UserDto,
  signin: UserAuthDto,
};


export type MutationSignupArgs = {
  input: CreateUserDto
};


export type MutationSigninArgs = {
  auth: UserAuthInputDto
};

export type Query = {
   __typename?: 'Query',
  authUser: AdUser,
  user: UserDto,
  users: Array<UserDto>,
  me?: Maybe<UserDto>,
};


export type QueryAuthUserArgs = {
  auth: CreateUserDto
};


export type QueryUserArgs = {
  _id?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>
};

export type User = {
   __typename?: 'User',
  name: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String'],
  groups?: Maybe<Array<Group>>,
};

export type UserAuthDto = {
   __typename?: 'UserAuthDto',
  accessToken: Scalars['String'],
  user: UserDto,
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
  password: Scalars['String'],
  groups?: Maybe<Array<Group>>,
};

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'UserDto' }
    & Pick<UserDto, '_id' | 'email'>
  )> }
);

export type SingInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SingInMutation = (
  { __typename?: 'Mutation' }
  & { signin: (
    { __typename?: 'UserAuthDto' }
    & Pick<UserAuthDto, 'accessToken'>
    & { user: (
      { __typename?: 'UserDto' }
      & Pick<UserDto, '_id' | 'email'>
    ) }
  ) }
);


export const MeDocument = gql`
    query Me {
  me {
    _id
    email
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
export const SingInDocument = gql`
    mutation singIn($email: String!, $password: String!) {
  signin(auth: {email: $email, password: $password}) {
    accessToken
    user {
      _id
      email
    }
  }
}
    `;
export type SingInMutationFn = ApolloReactCommon.MutationFunction<SingInMutation, SingInMutationVariables>;

/**
 * __useSingInMutation__
 *
 * To run a mutation, you first call `useSingInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singInMutation, { data, loading, error }] = useSingInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSingInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SingInMutation, SingInMutationVariables>) {
        return ApolloReactHooks.useMutation<SingInMutation, SingInMutationVariables>(SingInDocument, baseOptions);
      }
export type SingInMutationHookResult = ReturnType<typeof useSingInMutation>;
export type SingInMutationResult = ApolloReactCommon.MutationResult<SingInMutation>;
export type SingInMutationOptions = ApolloReactCommon.BaseMutationOptions<SingInMutation, SingInMutationVariables>;