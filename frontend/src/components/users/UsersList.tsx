import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Item } from '../layout/Item';
import { List } from '../layout/List';
import { useUsersQuery } from '../../generated/graphql';

interface Props {}

export const UsersList: React.FC<Props> = props => {
  const { data, loading } = useUsersQuery();

  if (loading) return <span>Loading...</span>;

  return (
    <div>
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
          </div>
          {data &&
          data.users &&
          data.users.map(user => (
            <div key={user._id} className="flex">
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
            </div>
          ))}
        </List>
      </Paper>
    </div>
  );
};
