import React, { useEffect } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import grey from '@material-ui/core/colors/grey';
import { useDeleteTaskMutation } from '../generated/graphql';
import { useSnackbar } from 'notistack';
import { GET_PROJECT } from './UpdateProjectModal';

const TaskStyles = styled.div`
  padding: 1rem 1.4rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(3.5rem, 1fr) 1fr;
  grid-template-rows: 2.3rem 2rem 1fr;

  &:hover {
    .task-actions {
      opacity: 1;
    }
  }

  &:nth-child(odd) {
    background-color: ${grey[100]};
  }

  .task-title {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    text-transform: uppercase;
  }

  .task-description {
    grid-column: 1 / 1;
    grid-row: 2 / 4;
    padding: 5px 0;
    font-size: 0.8rem;
  }

  .task-completed {
    grid-column: 3 / 4;
    grid-row: 1 / 1;
    text-align: right;
  }

  .tast-due-date {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    text-align: right;
  }

  .task-actions {
    opacity: 0;
    transition: opacity 0.3s ease;
    grid-column: 3 / 4;
    grid-row: 3 / 4;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: stretch;

    button:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

export interface ITask {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  dueDate: Date;
  completed: Boolean;
}

interface Props {
  task: ITask;
  project: string;
  handleUpdateModalOpen: () => void;
  selectTask: (id: string) => void;
}

export const Task: React.FC<Props> = ({
  task,
  project,
  handleUpdateModalOpen,
  selectTask
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteTask, { error }] = useDeleteTaskMutation({
    update(cache, result) {
      try {
        const cacheRes: any = cache.readQuery({
          query: GET_PROJECT,
          variables: { _id: project }
        });

        cache.writeQuery({
          query: GET_PROJECT,
          variables: { _id: project },
          data: {
            project: {
              ...cacheRes.project,
              tasks: cacheRes.project.tasks.filter(
                (task: any) => task._id !== result.data?.deleteTask._id
              )
            }
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      }
    }
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error deleting task', { variant: 'error' });
    }
  }, [enqueueSnackbar, error]);

  return (
    <TaskStyles>
      <Typography className="task-title" variant="h6">
        {task.name}
      </Typography>
      <div className="task-description">{task.description}</div>
      <div className="task-completed">
        {task.completed ? 'Completed' : 'To Do'}
      </div>
      <div className="tast-due-date">
        {moment(task.dueDate).format('DD. MM. YYYY, dddd')}
      </div>
      <div className="task-actions">
        <IconButton
          onClick={() => {
            selectTask(task._id);
            handleUpdateModalOpen();
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={async () => {
            const res = await deleteTask({ variables: { _id: task._id } });

            if (res.data) {
              enqueueSnackbar('Task deleted.', { variant: 'success' });
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </TaskStyles>
  );
};
