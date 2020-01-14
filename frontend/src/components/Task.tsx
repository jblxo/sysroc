import React from 'react';
import { Typography, Fab } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskStyles = styled.div`
  padding: 1rem 1.4rem;
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: 2.3rem 2rem 1fr;
  &:not(:last-child) {
    border-bottom: 1px solid black;
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
      <Fab
        color="primary"
        variant="extended"
        onClick={() => {
          // TODO
        }}
      >
        <EditIcon />
      </Fab>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => {
          // TODO
        }}
      >
        <DeleteIcon />
      </Fab>
    </div>
  </TaskStyles>
);
