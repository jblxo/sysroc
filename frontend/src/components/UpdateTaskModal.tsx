import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { UpdateTaskForm } from './UpdateTaskForm';
import { useTaskQuery, useUpdateTaskMutation } from '../generated/graphql';
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
  task: string;
  projectId: string;
}

export const UpdateTaskModal: React.FC<Props> = ({
  open,
  handleClose,
  task,
  projectId
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [modalStyle] = React.useState(getModalStyle);
  const { data, loading } = useTaskQuery({ variables: { _id: task } });
  const [updateTask, { error }] = useUpdateTaskMutation({
    update(cache, result) {
      try {
        const { project }: any = cache.readQuery({
          query: GET_PROJECT,
          variables: { _id: projectId }
        });

        const index = project.tasks.findIndex(
          (task: any) => task._id === result.data?.updateTask._id
        );

        console.log(updateTask);

        project.tasks[index] = result.data?.updateTask;

        console.log(project.tasks);

        cache.writeQuery({
          query: GET_PROJECT,
          variables: { _id: projectId },
          data: {
            project: project
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

  if (loading) return <div>Loading...</div>;

  return (
    <Modal
      aria-labelledby="update task"
      aria-describedby="modal with form to update task"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="new-project-modal-title">Update Task</h2>
        {data?.task && (
          <UpdateTaskForm
            error={error}
            task={data.task}
            onSubmit={async ({ name, description, dueDate }) => {
              const res = await updateTask({
                variables: { name, description, dueDate, _id: task }
              });

              if (res.data) {
                enqueueSnackbar('Task updated!', { variant: 'success' });
                handleClose();
              }
            }}
          />
        )}
      </div>
    </Modal>
  );
};