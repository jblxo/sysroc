import React, { useState } from 'react';
import { useDeleteProjectMutation, useProjectsQuery } from '../../generated/graphql';
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { DeleteProjectAlert } from './DeleteProjectAlert';
import { GET_PROJECTS } from './NewProjectModal';
import { useHistory } from 'react-router';
import { Item } from '../Layout/Item';
import { List } from '../Layout/List';

interface Props {
  userId?: string;
}

export const ProjectsList: React.FC<Props> = ({ userId }) => {
  const { data, loading } = useProjectsQuery({ variables: { userId } });
  const [deleteProject, { error }] = useDeleteProjectMutation({
    update(cache, result) {
      const { projects }: any = cache.readQuery({
        query: GET_PROJECTS,
        variables: { userId }
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        variables: { userId },
        data: {
          projects: projects.filter((project: { id: string }) => {
            if (result.data) {
              return project.id !== result.data.deleteProject.id;
            }
            return false;
          })
        }
      });
    }
  });
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);
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

  const handleDeleteProject = async (id: number) => {
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
              <div key={project.id} className="flex">
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
                      history.push(`/projects/${project.id}`);
                    }}
                  >
                    View
                  </Fab>
                  <Fab
                    color="secondary"
                    variant="extended"
                    onClick={() => {
                      setProjectId(parseInt(project.id));
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
