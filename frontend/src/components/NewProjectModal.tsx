import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { NewProjectForm } from './NewProjectForm';
import { useCreateProjectMutation } from '../generated/graphql';
import { useSnackbar } from 'notistack';
import gql from 'graphql-tag';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const GET_PROJECTS = gql`
  query Projects {
    projects {
      _id
      name
      user {
        name
      }
    }
  }
`;

export const NewProjectModal: React.FC<Props> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [createProject, { error }] = useCreateProjectMutation({
    update(cache, result) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.concat([result.data && result.data.createProject])
        }
      });
    }
  });
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Modal
      aria-labelledby="new project"
      aria-describedby="modal with form to create new project"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="new-project-modal-title">New Project</h2>
        <p id="new-project-modal-description">Create something great</p>
        <NewProjectForm
          error={error}
          onSubmit={async ({ name }) => {
            const res = await createProject({
              variables: { name }
            });
            if (res.data) {
              enqueueSnackbar('Project created!', { variant: 'success' });
              handleClose();
            }
          }}
        />
      </div>
    </Modal>
  );
};
