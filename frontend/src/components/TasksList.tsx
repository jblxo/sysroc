import React from 'react';
import { Paper } from '@material-ui/core';
import { ITask, Task } from './Task';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';

const TaskListStyles = styled.div``;

const TaskListHeader = styled.div`
  padding: 1rem 0;
  text-align: center;
  background-color: ${grey[100]};
  color: ${grey[700]};
`;

interface Props {
  tasks: ITask[];
  date: string;
  project: string;
  handleUpdateModalOpen: () => void;
  selectTask: (id: number) => void;
}

export const TasksList: React.FC<Props> = ({
  tasks,
  date,
  project,
  handleUpdateModalOpen,
  selectTask
}) => (
  <TaskListStyles>
    <Paper elevation={2}>
      <TaskListHeader>Task for month: {date}</TaskListHeader>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          project={project}
          handleUpdateModalOpen={handleUpdateModalOpen}
          selectTask={selectTask}
        />
      ))}
    </Paper>
  </TaskListStyles>
);
