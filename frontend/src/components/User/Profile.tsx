import React from 'react';
import { useMeQuery, useUserQuery } from '../../generated/graphql';
import { hasPermissions } from '../../auth/hasPermissions';
import { Typography } from '@material-ui/core';
import { ProjectsList } from '../Project/ProjectsList';
import styled from 'styled-components';

const UserInformation = styled.div`
  & p {
    font-size: .9rem;
  }
`;

const PersonalInformation = styled.div`
  margin-top: 1rem;
`;

interface Props {
  userId: number;
  forceEmail?: boolean;
}

export const Profile: React.FC<Props> = ({
  userId,
  forceEmail,
}) => {
  const { data, loading } = useUserQuery({ variables: { id: userId } });
  const { data: meData } = useMeQuery();

  const canViewEmail = meData?.me && hasPermissions(meData.me, 'users.students.manage', 'users.teachers.manage');
  const canViewProjects = meData?.me && hasPermissions(meData.me, 'projects.view');

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <UserInformation>
        {data?.user?.roles && data.user.roles.length > 0 &&
          <Typography><strong>Roles:</strong> {data.user.roles.map(role => role.name).join(', ')}</Typography>
        }
        {data?.user?.groups && data.user.groups.length > 0 &&
          <Typography><strong>Active Directory Groups:</strong> {data.user.groups.map(group => group.name).join(', ')}</Typography>
        }
        {(forceEmail || canViewEmail) &&
          <PersonalInformation>
            <Typography><strong>Active Directory email:</strong> {data?.user?.adEmail}</Typography>
            <Typography><strong>Custom email:</strong> {data?.user?.email}</Typography>
          </PersonalInformation>
        }
      </UserInformation>
      {canViewProjects && <ProjectsList userId={data?.user?.id} displayAuthor={false} />}
    </>
  );
};
