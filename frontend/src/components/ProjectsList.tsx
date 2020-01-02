import React from 'react';
import { useProjectsQuery } from '../generated/graphql';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

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
`;

interface Props {}

export const ProjectsList: React.FC<Props> = props => {
  const { data, loading } = useProjectsQuery();

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
                  <div>...</div>
                </Item>
                <Item>
                  <div>View</div>
                </Item>
              </div>
            ))}
        </List>
      </Paper>
    </div>
  );
};
