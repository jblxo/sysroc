import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { Profile } from './User/Profile';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    marginBottom: '1rem'
  }
});

interface Props {}

export const Home: React.FC<Props> = () => {
  const classes = useStyles();
  const { data, loading } = useMeQuery();

  if (loading || !data?.me?.user) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h3" className={classes.title}>My Profile</Typography>
      <Profile userId={parseInt(data.me.user.id)} forceEmail={true} />
    </div>
  );
};
