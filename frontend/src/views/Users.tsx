import React from 'react';
import { UsersHeader } from '../components/users/UsersHeader';
import { UsersList } from '../components/users/UsersList';
import { useMeQuery } from '../generated/graphql';
import { NewUserModal } from '../components/users/NewUserModal';

interface Props {}

export const Users: React.FC<Props> = props => {
  const [open, setOpen] = React.useState(false);
  const { loading } = useMeQuery();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <UsersHeader handleOpen={handleOpen} />
      <UsersList />
      <NewUserModal
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
