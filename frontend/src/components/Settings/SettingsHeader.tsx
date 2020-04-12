import React from 'react';
import styled from 'styled-components';

const UsersHeaderStyles = styled.div`
  & .header {
    p {
      font-weight: 300;
    }
  }
`;

interface Props {}

export const SettingsHeader: React.FC<Props> = () => (
  <UsersHeaderStyles>
    <div className="header">
      <h2>Settings</h2>
      <p>Edit your account</p>
    </div>
  </UsersHeaderStyles>
);
