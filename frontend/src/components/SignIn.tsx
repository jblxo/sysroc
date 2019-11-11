import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useSignInMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../auth/accessToke';
import { MyForm } from './MyForm';

export const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
  const [signin] = useSignInMutation();

  return (
    <div style={{ textAlign: 'center' }}>
      <MyForm
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

          console.log(res);

          if (res && res.data) {
            setAccessToken(res.data.signin.accessToken);
          }

          history.push('/');
        }}
      />
    </div>
  );
};
