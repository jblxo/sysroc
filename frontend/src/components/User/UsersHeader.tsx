import React from 'react';
import styled from 'styled-components';
import { Fab, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const UsersHeaderStyles = styled.div`
  display: grid;
  grid-template-columns: 20rem auto 20rem;

  & .header {
    grid-column-start: 1;
    grid-column-end: 2;
    justify-self: start;

    p {
      font-weight: 300;
    }
  }

  & .new-user {
    grid-column-start: 3;
    grid-column-end: 4;
    justify-self: end;
    align-self: center;
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

interface Props {
  handleOpen: () => void;
}

export const UsersHeader: React.FC<Props> = ({ handleOpen }) => {
  const classes = useStyles();

  return (
    <UsersHeaderStyles>
      <div className="header">
        <h2>Users</h2>
        <p>Manage users in system</p>
      </div>
      <div className="new-user">
        <Fab color="primary" variant="extended" onClick={handleOpen}>
          <AddCircleIcon className={classes.extendedIcon}/>
          New User
        </Fab>
      </div>
    </UsersHeaderStyles>
  );
};
