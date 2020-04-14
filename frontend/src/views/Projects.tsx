import React from 'react';
import { ProjectsHeader } from '../components/Project/ProjectsHeader';
import { NewProjectModal } from '../components/Project/NewProjectModal';
import { ProjectsList } from '../components/Project/ProjectsList';

interface Props {}

export const Projects: React.FC<Props> = props => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ProjectsHeader handleOpen={handleOpen} />
      <ProjectsList />
      <NewProjectModal
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};
