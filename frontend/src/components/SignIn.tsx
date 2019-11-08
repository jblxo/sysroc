import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useSingInMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../auth/accessToke';

export const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signin] = useSingInMutation();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const res = await signin({
          variables: {
            email,
            password
          },
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
    >
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};
