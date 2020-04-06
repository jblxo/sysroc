import React from 'react';
import styled from 'styled-components';
import { Fab, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useMeQuery } from '../../generated/graphql';
import { hasPermissions } from '../../auth/hasPermissions';

const ClassificationHeaderStyles = styled.div`
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

interface Props {
    handleOpen: () => void;
}

export const ClassificationHeader: React.FC<Props> = ({ handleOpen }) => {
    const classes = useStyles();
    const { data, loading } = useMeQuery();

    return (
        <ClassificationHeaderStyles>
            <div className="header">
                <h2>Classification</h2>
                <p>Review or add new marks!</p>
            </div>
            { !loading && data && data.me && hasPermissions(data.me, 'projects.manage') &&
            <div className="new-project">
                <Fab color="primary" variant="extended" onClick={handleOpen}>
                    <AddCircleIcon className={classes.extendedIcon}/>
                    Add mark
                </Fab>
            </div>
            }
        </ClassificationHeaderStyles>
    );
};
