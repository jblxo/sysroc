import React from 'react';
import { useProjectQuery } from '../generated/graphql';
import { RouteComponentProps, useHistory } from 'react-router';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';

const ProjectControls = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;

  button {
    width: 5.5rem;
  }
`;

interface Props
  extends RouteComponentProps<{
    projectId: string;
  }> {}

export const SingleProject: React.FC<Props> = props => {
  const { data, loading } = useProjectQuery({
    variables: { _id: props.match.params.projectId }
  });
  const history = useHistory();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ProjectControls>
        <Fab
          color="primary"
          variant="extended"
          onClick={() => {
            history.push(`/projects`);
          }}
        >
          Back
        </Fab>
      </ProjectControls>
      {data ? (
        <>
          <h2>{data.project.name}</h2>
          <h3>{data.project.description}</h3>
        </>
      ) : (
        <div>There is no project with ID {props.match.params.projectId}</div>
      )}
    </>
  );
};
