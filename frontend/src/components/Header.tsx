import React from 'react';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { setAccessToken } from '../auth/accessToke';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>You are logged in as: {data.me.email}</div>;
  } else {
    body = <div>You are not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/home"></Link>
      </div>
      <div>
        <Link to="/singin"></Link>
      </div>
      <div>
        {!loading && data && data.me ? (
          <Button
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client!.resetStore();
            }}
          >
            Logout
          </Button>
        ) : null}
      </div>
      {body}
    </header>
  );
};
