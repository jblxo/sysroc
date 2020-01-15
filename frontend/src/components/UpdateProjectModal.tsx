import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { UpdateProjectForm } from './UpdateProjectForm';
import { useUpdateProjectMutation } from '../generated/graphql';
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

export const GET_PROJECT = gql`
  query Project($_id: String) {
    project(filter: { _id: $_id }) {
      _id
      name
      description
      tasks {
        _id
        name
        description
        createdAt
        dueDate
        completed
      }
    }
  }
`;

interface Props {
  open: boolean;
  handleClose: () => void;
  projectId: string;
  data: {
    name: string;
    description?: string;
  };
  userId?: string;
}

export const UpdateProjectModal: React.FC<Props> = ({
  open,
  handleClose,
  projectId,
  data,
  userId
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [modalStyle] = React.useState(getModalStyle);
  const [updateProject, { error }] = useUpdateProjectMutation({
    update(cache, result) {
      try {
        cache.writeQuery({
          query: GET_PROJECT,
          variables: { _id: projectId },
          data: {
            project: result.data?.updateProject
          }
        });
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          enqueueSnackbar(e.message, { variant: 'error' });
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
        <UpdateProjectForm
          data={data}
          error={error}
          onSubmit={async ({ name, description }) => {
            const res = await updateProject({
              variables: { name, description, projectId }
            });
            if (res.data) {
              enqueueSnackbar('Project updated!', { variant: 'success' });
              handleClose();
            }
          }}
        />
      </div>
    </Modal>
  );
};
