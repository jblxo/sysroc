import React from 'react';
import { Typography, Fab, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import grey from '@material-ui/core/colors/grey';

const TaskStyles = styled.div`
  padding: 1rem 1.4rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(10rem, 1fr) 1fr;
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
}

export const Task: React.FC<Props> = ({ task }) => (
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
          // TODO
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          // TODO
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  </TaskStyles>
);
