import React from 'react';
import { UsersHeader } from '../components/users/UsersHeader';
import { UsersList } from '../components/users/UsersList';
import { useMeQuery } from '../generated/graphql';

interface Props {}

export const Users: React.FC<Props> = props => {
  const { data, loading } = useMeQuery();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <UsersHeader />
      <UsersList />
    </>
  );
};
