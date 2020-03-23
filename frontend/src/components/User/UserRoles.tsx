import React from 'react';
import { useMeExtendedQuery, useRolesQuery } from '../../generated/graphql';
import { hasPermissions } from '../../auth/hasPermissions';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

interface Props {
  admin: boolean;
  userRoles?: string[];
  onRolesStateChange: (roles: string[]) => void;
}

export const UserRoles: React.FC<Props> = ({
  admin,
  userRoles,
  onRolesStateChange,
}) => {
  const [roles, setRoles] = React.useState(userRoles ? userRoles : ['guest']);

  const { data: rolesData, loading: rolesLoading } = useRolesQuery({ variables: { admin } });
  const { data: me, loading: meLoading } = useMeExtendedQuery();

  const canManageTeachers = me && me.me && hasPermissions(me.me, 'User.teachers.manage');
  const canManageStudents = me && me.me && hasPermissions(me.me, 'User.students.manage');

  const handleRoleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let newRoles: string[];

    if (!event.target.checked) {
      newRoles = roles.filter(role => role !== name);
    } else {
      newRoles = [ ...roles, name ];
    }

    setRoles(newRoles);
    onRolesStateChange(newRoles);
  };

  if (rolesLoading || meLoading) return <span>Loading...</span>;

  return (
    <FormGroup>
      { rolesData &&
        rolesData.roles &&
        rolesData.roles.filter(role => (role.slug !== 'teacher' || canManageTeachers) && (role.slug !== 'student' || canManageStudents)).map(role => (
        <FormControlLabel
          key={role.id}
          control={
            <Checkbox
              checked={roles.includes(role.slug)}
              onChange={handleRoleChange(role.slug)}
              value={role.slug}
              color="primary"
            />
          }
          label={role.name}
        />
      ))}
    </FormGroup>
  );
};
