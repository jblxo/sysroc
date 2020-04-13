import React from 'react';
import { useUserQuery } from '../generated/graphql';
import { RouteComponentProps } from 'react-router';
import { Profile } from '../components/User/Profile';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    marginBottom: '1rem'
  }
});

interface Props extends RouteComponentProps<{
  userId: string;
}> {}

export const SingleUser: React.FC<Props> = props => {
  const userId = parseInt(props.match.params.userId);

  const classes = useStyles();
  const { data, loading } = useUserQuery({ variables: { id: userId } });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Typography variant="h3" className={classes.title}>{data?.user?.name}</Typography>
      <Profile userId={parseInt(props.match.params.userId)} />
    </>
  );
};
