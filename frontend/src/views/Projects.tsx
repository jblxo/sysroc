import React from 'react';
import { ProjectsHeader } from '../components/ProjectsHeader';
import { NewProjectModal } from '../components/NewProjectModal';

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
      <NewProjectModal handleClose={handleClose} open={open} />
    </>
  );
};
