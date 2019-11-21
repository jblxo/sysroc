import React from 'react';
import { RouteComponentProps } from 'react-router';
import { MeDocument, MeQuery, useSignInMutation } from '../generated/graphql';
import { setAccessToken } from '../auth/accessToke';
import { SignInForm } from './SignInForm';
import { setRegisterToken } from "../auth/registerToken";

export const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
  const [signin] = useSignInMutation();

  return (
    <div style={{ textAlign: 'center' }}>
      <SignInForm
        onSubmit={async ({ email, password }) => {
          const res = await signin({
            variables: { email, password },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.signin.user
                }
              });
            }
          });

          if (res && res.data) {
            const data = res.data.signin;
            console.log(data);

            if (data.accessToken) {
              setAccessToken(data.accessToken);

              history.push('/');
            } else if (data.registerToken) {
              setRegisterToken(data.registerToken);

              history.push('/signup');
            }
          }
        }}
      />
    </div>
  );
};
