import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { NewProjectForm } from './NewProjectForm';
import { useCreateProjectMutation } from '../../generated/graphql';
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
  query Projects($name: String) {
    projects(filter: { name: $name }) {
      id
      name
      description
      user {
        id
        name
      }
      supervisor {
        id
        name
      }
    }
  }
`;

export const NewProjectModal: React.FC<Props> = ({
  open,
  handleClose,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [modalStyle] = React.useState(getModalStyle);
  const [createProject, { error }] = useCreateProjectMutation({
    update(cache, result) {
      try {
        const { projects }: any = cache.readQuery({
          query: GET_PROJECTS,
          variables: { name: '' },
        });

        cache.writeQuery({
          query: GET_PROJECTS,
          variables: { name: '' },
          data: {
            projects: projects.concat([result.data?.createProject])
          }
        });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      }
    }
  });

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
          onSubmit={async ({ name, description }) => {
            const res = await createProject({
              variables: { name, description }
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
