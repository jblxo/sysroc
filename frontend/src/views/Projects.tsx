import React from 'react';
import { ProjectsHeader } from '../components/Project/ProjectsHeader';
import { NewProjectModal } from '../components/Project/NewProjectModal';
import { ProjectsList } from '../components/Project/ProjectsList';
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
      <ProjectsList userId={data?.me?.user?.id} />
      <NewProjectModal
        handleClose={handleClose}
        open={open}
        userId={data?.me?.user?.id}
      />
    </>
  );
};
