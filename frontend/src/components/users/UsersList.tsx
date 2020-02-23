import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Item } from '../layout/Item';
import { List } from '../layout/List';
import { useMeExtendedQuery, useUsersQuery } from '../../generated/graphql';
import { Fab } from '@material-ui/core';
import { UpdateUserModal } from './UpdateUserModal';
import { hasPermissions } from '../../auth/hasPermissions';
import { UserFilters, UsersFilter } from './UsersFilter';

interface Props {}

export const UsersList: React.FC<Props> = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [filters, setFilters] = useState<UserFilters>({ name: '', email: '', adEmail: '' });

  const { data: me, loading: meLoading } = useMeExtendedQuery();
  const { data, loading } = useUsersQuery({
    variables: filters,
  });

  const canManageTeachers = (me && me.me && hasPermissions(me.me, 'users.teachers.manage'));
  const canManageStudents = (me && me.me && hasPermissions(me.me, 'users.students.manage'));

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
  };

  const handleOpenUserModal = () => {
    setUserModalOpen(true);
  };

  if (loading || meLoading) return <span>Loading...</span>;

  return (
    <div>
      <UsersFilter
        defaultValues={filters}
        onSubmit={(filter: UserFilters) => {
          console.log(filter);
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
                    color="secondary"
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
    </div>
  );
};
