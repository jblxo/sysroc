import React from 'react';
import { RouteComponentProps } from 'react-router';
import { SignUpForm } from './SignUpForm';
import { getRegisterToken } from '../auth/registerToken';
import { MeDocument, MeQuery, useSignUpMutation } from '../generated/graphql';
import { setAccessToken } from '../auth/accessToke';

export const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  if (!getRegisterToken()) {
    history.push('/signin');
  }

  const [signUp] = useSignUpMutation();

  return (
    <div style={{ textAlign: 'center' }}>
      <SignUpForm
        onSubmit={async ({ name, email, password }) => {
          const res = await signUp({
            variables: { name, email, password },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: {
                    user: data.signup.user,
                    permissions: data.signup.permissions,
                    __typename: data.signup.__typename
                  }
                }
              });
            }
          });

          if (
            res &&
            res.data &&
            res.data.signup &&
            res.data.signup.accessToken
          ) {
            setAccessToken(res.data.signup.accessToken);

            history.push('/');
          }
        }}
      />
    </div>
  );
};
