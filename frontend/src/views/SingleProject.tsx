import React, { useState } from 'react';
import { useProjectQuery, useMeQuery } from '../generated/graphql';
import { RouteComponentProps, useHistory } from 'react-router';
import { Fab, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { UpdateProjectModal } from '../components/UpdateProjectModal';
import { TasksList } from '../components/TasksList';
import { CreateTaskModal } from '../components/CreateTaskModal';
import moment from 'moment';
import { ITask } from '../components/Task';
import { UpdateTaskModal } from '../components/UpdateTaskModal';

const ProjectControls = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 15rem 1fr 1fr;

  margin-bottom: 2rem;

  button {
    width: 5.5rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  grid-column: 1 / 1;
  grid-row: 1 / 1;
`;

const Project = styled.div`
  h4,
  h5 {
    text-align: center;
    margin-bottom: 2rem;
  }

  h5 {
    font-size: 1.2rem;
  }

  .add-task-btn {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: stretch;
    margin: 1rem 0;
    padding-right: 5rem;
  }
`;

const TaskLists = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: minmax(25rem, 1fr) minmax(25rem, 1fr);
  grid-gap: 4rem;
  margin: 3rem auto;
`;

interface Props
  extends RouteComponentProps<{
    projectId: string;
  }> {}

export const SingleProject: React.FC<Props> = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [upTaskModalOpen, setUpTaskModalOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const { data: meData, loading: meLoading } = useMeQuery();
  const { data, loading } = useProjectQuery({
    variables: { id: parseInt(props.match.params.projectId) }
  });
  const history = useHistory();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleCreateTaskOpen = () => {
    setCreateTaskOpen(true);
  };

  const handleCreateTaskClose = () => {
    setCreateTaskOpen(false);
  };

  const handleUpTaskModalOpen = () => {
    setUpTaskModalOpen(true);
  };

  const handleUpTaskModalClose = () => {
    setUpTaskModalOpen(false);
  };

  const tasksByMonth: { [key: string]: ITask[] } = {};
  for (const task of data?.project.tasks ?? []) {
    const key: string = moment(task.dueDate).format('MM. YYYY');
    if (tasksByMonth[key] === undefined) {
      tasksByMonth[key] = [];
    }

    tasksByMonth[key].push(task);
  }

  if (loading || meLoading) return <div>Loading...</div>;

  return (
    <>
      <ProjectControls>
        <Actions>
          <Fab
            color="primary"
            variant="extended"
            onClick={() => {
              history.push(`/projects`);
            }}
          >
            Back
          </Fab>
          <Fab
            color="secondary"
            variant="extended"
            onClick={() => {
              handleModalOpen();
            }}
          >
            Edit
          </Fab>
        </Actions>
      </ProjectControls>
      {data ? (
        <Project>
          <Typography variant="h4">{data.project.name}</Typography>
          <Typography variant="h5">{data.project.description}</Typography>
          <div className="add-task-btn">
            <Fab
              color="secondary"
              variant="extended"
              onClick={handleCreateTaskOpen}
            >
              Add Task
            </Fab>
          </div>
          {data.project.tasks ? (
            <TaskLists>
              {Object.keys(tasksByMonth).map(key => (
                <TasksList
                  key={key}
                  tasks={tasksByMonth[key]}
                  date={key}
                  project={data.project.id}
                  handleUpdateModalOpen={handleUpTaskModalOpen}
                  selectTask={setSelectedTaskId}
                />
              ))}
            </TaskLists>
          ) : (
            <div>You have no tasks</div>
          )}
        </Project>
      ) : (
        <div>There is no project with ID {props.match.params.projectId}</div>
      )}
      {data && (
        <UpdateProjectModal
          open={modalOpen}
          handleClose={handleModalClose}
          projectId={parseInt(props.match.params.projectId)}
          data={data?.project}
        />
      )}
      <CreateTaskModal
        open={createTaskOpen}
        handleClose={handleCreateTaskClose}
        project={parseInt(data?.project.id ?? '0')}
      />
      <UpdateTaskModal
        open={upTaskModalOpen}
        handleClose={handleUpTaskModalClose}
        task={selectedTaskId ?? 0}
        projectId={parseInt(data?.project.id ?? '0')}
      />
    </>
  );
};
