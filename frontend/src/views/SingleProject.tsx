import React, { useState } from 'react';
import { useProjectQuery } from '../generated/graphql';
import { RouteComponentProps, useHistory } from 'react-router';
import { Fab, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { UpdateProjectModal } from '../components/UpdateProjectModal';

const ProjectControls = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 15rem 1fr 1fr;

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
  }
`;

interface Props
  extends RouteComponentProps<{
    projectId: string;
  }> {}

export const SingleProject: React.FC<Props> = props => {
  const [modalOpen, setModalOpen] = useState(false);
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

  if (loading) return <div>Loading...</div>;

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
        />
      )}
    </>
  );
};
