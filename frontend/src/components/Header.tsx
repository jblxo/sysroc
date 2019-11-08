import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { Link } from 'react-router-dom';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();

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
      <div>{!loading && data && data.me ? <button>logout</button> : null}</div>
      {body}
    </header>
  );
};
