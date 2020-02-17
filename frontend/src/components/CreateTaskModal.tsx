import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { CreateTaskForm } from './CreateTaskForm';
import { useCreateTaskMutation } from '../generated/graphql';
import { useSnackbar } from 'notistack';
import { GET_PROJECT } from './UpdateProjectModal';

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
  project: number;
}

export const CreateTaskModal: React.FC<Props> = ({
  open,
  handleClose,
  project
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [createTask, { error }] = useCreateTaskMutation({
    update(cache, result) {
      try {
        cache.writeQuery({
          query: GET_PROJECT,
          variables: { _id: project },
          data: {
            project: result.data?.createTask.project
          }
        });
      } catch (error) {
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
        <h2 id="new-project-modal-title">New Task</h2>
        <p id="new-project-modal-description">Get the work done.</p>
        <CreateTaskForm
          error={error}
          onSubmit={async ({ name, description, dueDate }) => {
            const res = await createTask({
              variables: { name, dueDate, description, project }
            });
            if (res.data) {
              enqueueSnackbar('Task successfully created!', {
                variant: 'success'
              });
              handleClose();
            }
          }}
        />
      </div>
    </Modal>
  );
};
