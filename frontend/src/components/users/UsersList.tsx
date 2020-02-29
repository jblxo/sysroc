import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Item } from '../layout/Item';
import { List } from '../layout/List';
import { useDeleteUserMutation, useMeExtendedQuery, UsersDocument, useUsersQuery } from '../../generated/graphql';
import { Fab } from '@material-ui/core';
import { UpdateUserModal } from './UpdateUserModal';
import { hasPermissions } from '../../auth/hasPermissions';
import { UserFilters, UsersFilter } from './UsersFilter';
import {
  getUserFilters,
  registerUserFiltersListener,
  setDefaultUserFilters,
  setUserFilters,
  triggerUserFiltersChange
} from '../../filters/users';
import { DeleteUserDialog } from './DeleteUserDialog';
import { useApolloClient } from '@apollo/react-hooks';
import { useSnackbar } from 'notistack';

const GET_USERS = UsersDocument;

interface Props {}

export const UsersList: React.FC<Props> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { cache: apolloClient } = useApolloClient();

  const [loaded, setLoaded] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [filters, setFilters] = useState<UserFilters>(getUserFilters());
  const [revision, setRevision] = useState(0);

  const { data: me, loading: meLoading } = useMeExtendedQuery();
  const { data, loading } = useUsersQuery({ variables: filters });

  const [deleteUser] = useDeleteUserMutation({
    async update(cache, result) {
      if (!result.data?.deleteUser) {
        enqueueSnackbar('An error occurred while deleting the user.', { variant: 'error' });
        return;
      }

      setDefaultUserFilters();

      const { users }: any = cache.readQuery({
        query: GET_USERS,
        variables: getUserFilters(),
      });

      await apolloClient.reset();

      cache.writeQuery({
        query: GET_USERS,
        variables: getUserFilters(),
        data: {
          users: users.filter((user: { id: string }) => user.id !== result.data?.deleteUser.id)
        }
      });

      triggerUserFiltersChange();
    }
  });

  const canManageTeachers = me && me.me && hasPermissions(me.me, 'users.teachers.manage');
  const canManageStudents = me && me.me && hasPermissions(me.me, 'users.students.manage');
  const canDeleteUsers = me && me.me && hasPermissions(me.me, 'users.delete');
  const isAdmin = me && me.me && me.me.user && me.me.user.roles && me.me.user.roles.some(role => role.admin);

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
  };

  const handleOpenUserModal = () => {
    setUserModalOpen(true);
  };

  const handleCloseDeleteUserDialog = () => {
    setDeleteUserModalOpen(false);
  };

  const handleOpenDeleteUserDialog = () => {
    setDeleteUserModalOpen(true);
  };

  const handleSubmitDeleteUserDialog = async (userId: number) => {
    await deleteUser({ variables: { id: userId } });
  };

  if (loading || meLoading) return <span>Loading...</span>;

  if (!loaded) {
    registerUserFiltersListener((data: UserFilters) => {
      setFilters(data);
      setRevision(revision + 1);
    });
    setLoaded(true);
  }

  return (
    <div>
      <UsersFilter
        defaultValues={filters}
        onSubmit={(filter: UserFilters) => {
          setUserFilters(filter);
          setFilters(filter);
        }}
      />
      <h2>Users List</h2>
      <Paper>
        <List>
          <div className="flex">
            <Item>
              <div>Username</div>
            </Item>
            <Item>
              <div>Email</div>
            </Item>
            <Item>
              <div>AD Email</div>
            </Item>
            <Item>
              <div>AD Groups</div>
            </Item>
            <Item>
              <div>Roles</div>
            </Item>
            <Item>
              <div>Action</div>
            </Item>
          </div>
          {data &&
          data.users &&
          data.users.map(user => (
            <div key={user.id} className="flex">
              <Item>
                <div>{user.name}</div>
              </Item>
              <Item>
                <div>{user.email}</div>
              </Item>
              <Item>
                <div>{user.adEmail}</div>
              </Item>
              <Item>
                <div>{user.groups && user.groups.map(group => group.name).join(', ')}</div>
              </Item>
              <Item>
                <div>{user.roles && user.roles.map(role => role.name).join(', ')}</div>
              </Item>
              <Item className="actions">
                { !user.roles.some(role => role.admin) && !user.roles.some(role => (role.slug === 'teacher' && !canManageTeachers) || (role.slug === 'student' && !canManageStudents)) &&
                  <Fab
                    color="primary"
                    variant="extended"
                    onClick={() => {
                      setSelectedUserId(parseInt(user.id));
                      setUserData({
                        name: user.name,
                        email: user.email,
                        roles: user.roles.map(role => role.slug),
                        groups: user.groups.map(group => parseInt(group.id)),
                      });
                      handleOpenUserModal();
                    }}
                  >
                    Edit
                  </Fab>
                }
                { canDeleteUsers
                  && user.id !== me?.me?.user?.id
                  && (!user.roles.some(role => role.admin) || isAdmin)
                  && !user.roles.some(role => (role.slug === 'teacher' && !canManageTeachers) || (role.slug === 'student' && !canManageStudents)) &&
                  <Fab
                    color="secondary"
                    variant="extended"
                    onClick={() => {
                      setSelectedUserId(parseInt(user.id));
                      handleOpenDeleteUserDialog();
                    }}
                  >
                    Delete
                  </Fab>
                }
              </Item>
            </div>
          ))}
        </List>
      </Paper>
      <UpdateUserModal
        open={userModalOpen}
        handleClose={handleCloseUserModal}
        userId={selectedUserId ?? 0}
        data={userData}
      />
      { canDeleteUsers &&
        <DeleteUserDialog
          userId={selectedUserId ?? 0}
          open={deleteUserModalOpen}
          onClose={handleCloseDeleteUserDialog}
          onSubmit={handleSubmitDeleteUserDialog}
        />
      }
    </div>
  );
};
