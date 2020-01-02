import React from 'react';
import styled from 'styled-components';
import { Fab, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const ProjectsHeader = styled.div`
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

  & .new-project {
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

interface Props {}

export const Projects: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <ProjectsHeader>
      <div className="header">
        <h2>Projects</h2>
        <p>Manage your projects</p>
      </div>
      <div className="new-project">
        <Fab color="primary" variant="extended">
          <AddCircleIcon className={classes.extendedIcon} />
          New Project
        </Fab>
      </div>
    </ProjectsHeader>
  );
};
