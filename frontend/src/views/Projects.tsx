import React from 'react';
import { ProjectsHeader } from '../components/ProjectsHeader';
import { NewProjectModal } from '../components/NewProjectModal';
import { ProjectsList } from '../components/ProjectsList';
import { useMeQuery } from '../generated/graphql';

interface Props {}

export const Projects: React.FC<Props> = props => {
  const [open, setOpen] = React.useState(false);
  const { data, loading } = useMeQuery();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ProjectsHeader handleOpen={handleOpen} />
      <ProjectsList />
      <NewProjectModal
        handleClose={handleClose}
        open={open}
        userId={data?.me?._id}
      />
    </>
  );
};
