import React, { useState } from 'react';
import {
  useProjectsQuery,
  useDeleteProjectMutation
} from '../generated/graphql';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { Fab } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { DeleteProjectAlert } from './DeleteProjectAlert';
import { GET_PROJECTS } from './NewProjectModal';
import { useHistory } from 'react-router';

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: space-between;
    height: 5rem;
    padding: 5px 2rem;
    transition: all 0.3s ease;

    &:nth-child(odd) {
      background-color: ${grey[100]};
    }

    &:hover:not(:first-child) {
      background-color: ${blue[300]};
    }

    &:first-child {
      font-weight: 300;
      color: ${grey[700]};
    }
  }
`;

const Item = styled.div`
  flex: 1 1 0;
  display: flex;
  margin: auto;

  div {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  &.actions {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: space-between;
  }
`;

interface Props {
  userId?: string;
}

export const ProjectsList: React.FC<Props> = ({ userId }) => {
  const { data, loading } = useProjectsQuery();
  const [deleteProject, { error }] = useDeleteProjectMutation({
    update(cache, result) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        variables: { userId },
        data: {
          projects: projects.filter((project: { _id: string }) => {
            if (result.data) {
              return project._id !== result.data.deleteProject._id;
            }
            return false;
          })
        }
      });
    }
  });
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const history = useHistory();

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  if (error) {
    enqueueSnackbar(error.message, { variant: 'error' });
  }

  const handleDeleteProject = async (id: string) => {
    await deleteProject({
      variables: { projectId: id }
    });
    enqueueSnackbar('Project successfully deleted', { variant: 'success' });
  };

  if (loading) return <span>Loading...</span>;

  return (
    <div>
      <h2>Projects List</h2>
      <Paper>
        <List>
          <div className="flex">
            <Item>
              <div>Basic info</div>
            </Item>
            <Item>
              <div>Admins</div>
            </Item>
            <Item>
              <div>Url</div>
            </Item>
            <Item>
              <div>Database</div>
            </Item>
            <Item>
              <div>Description</div>
            </Item>
            <Item>
              <div>Action</div>
            </Item>
          </div>
          {data &&
            data.projects &&
            data.projects.map(project => (
              <div key={project._id} className="flex">
                <Item>
                  <div>{project.name}</div>
                </Item>
                <Item>
                  <div>{project.user && project.user.name}</div>
                </Item>
                <Item>
                  <div>/{project.name}</div>
                </Item>
                <Item>
                  <div>{project.name}_db</div>
                </Item>
                <Item>
                  <div>{project.description.slice(0, 10)}...</div>
                </Item>
                <Item className="actions">
                  <Fab
                    color="primary"
                    variant="extended"
                    onClick={() => {
                      history.push(`/projects/${project._id}`);
                    }}
                  >
                    View
                  </Fab>
                  <Fab
                    color="secondary"
                    variant="extended"
                    onClick={() => {
                      setProjectId(project._id);
                      handleAlertOpen();
                    }}
                  >
                    X
                  </Fab>
                </Item>
              </div>
            ))}
        </List>
      </Paper>
      <DeleteProjectAlert
        open={open}
        handleClose={handleAlertClose}
        handleDeleteProject={handleDeleteProject}
        projectId={projectId}
      />
    </div>
  );
};
