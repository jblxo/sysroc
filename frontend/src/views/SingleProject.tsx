import React, { useState } from 'react';
import { useProjectQuery, useMeQuery } from '../generated/graphql';
import { RouteComponentProps, useHistory } from 'react-router';
import { Fab, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { UpdateProjectModal } from '../components/UpdateProjectModal';
import { TasksList } from '../components/TasksList';
import { CreateTaskModal } from '../components/CreateTaskModal';

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

interface Props
  extends RouteComponentProps<{
    projectId: string;
  }> {}

export const SingleProject: React.FC<Props> = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const { data: meData, loading: meLoading } = useMeQuery();
  const { data, loading } = useProjectQuery({
    variables: { _id: props.match.params.projectId }
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
            <TasksList tasks={data.project.tasks} />
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
          projectId={props.match.params.projectId}
          data={data?.project}
          userId={meData?.me?.user?._id}
        />
      )}
      <CreateTaskModal
        open={createTaskOpen}
        handleClose={handleCreateTaskClose}
      />
    </>
  );
};
