import React from 'react';
import styled from 'styled-components';

const UsersHeaderStyles = styled.div`
  display: grid;
  grid-template-columns: 20rem auto 20rem;

  & .header {
    grid-column-start: 1;
    grid-column-end: 2;
    justify-self: start;

    p {
      font-weight: 300;
    }
  }

  & .new-project {
    grid-column-start: 3;
    grid-column-end: 4;
    justify-self: end;
    align-self: center;
  }
`;

interface Props {}

export const UsersHeader: React.FC<Props> = () => {
  return (
    <UsersHeaderStyles>
      <div className="header">
        <h2>Users</h2>
        <p>Manage users in system</p>
      </div>
    </UsersHeaderStyles>
  );
};
