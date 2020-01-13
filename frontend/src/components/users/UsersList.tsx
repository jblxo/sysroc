import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Item } from '../layout/Item';
import { List } from '../layout/List';

interface Props {}

export const UsersList: React.FC<Props> = props => {
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
              <div>AD Email</div>
            </Item>
            <Item>
              <div>Email</div>
            </Item>
            <Item>
              <div>AD groups</div>
            </Item>
            <Item>
              <div>Roles</div>
            </Item>
            <Item>
              <div>Action</div>
            </Item>
          </div>
        </List>
      </Paper>
    </div>
  );
};
