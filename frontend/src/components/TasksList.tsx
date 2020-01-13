import React from 'react';
import { Paper } from '@material-ui/core';

interface Props {
  tasks: {
    _id: string;
    name: string;
    description?: string;
    createdAt: Date;
    dueDate: Date;
    completed: Boolean;
  }[];
}

export const TasksList: React.FC<Props> = ({ tasks }) => (
  <Paper elevation={3}>
    {tasks.map(task => (
      <div key={task._id}>
        <p>{task.name}</p>
        <p>{task.description}</p>
      </div>
    ))}
  </Paper>
);
