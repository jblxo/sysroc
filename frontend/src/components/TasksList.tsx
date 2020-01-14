import React from 'react';
import { Paper } from '@material-ui/core';
import { ITask, Task } from './Task';
import styled from 'styled-components';

const TaskListStyles = styled.div`
  padding: 1rem 5rem;
`;

interface Props {
  tasks: ITask[];
}

export const TasksList: React.FC<Props> = ({ tasks }) => (
  <TaskListStyles>
    <Paper elevation={3}>
      {tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </Paper>
  </TaskListStyles>
);
