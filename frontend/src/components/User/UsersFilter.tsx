import React from 'react';
import { useGroupsQuery, useRolesQuery } from '../../generated/graphql';
import { Field, Form, Formik } from 'formik';
import { MyField } from '../MyField';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginRight: '1rem',
  },
  autoComplete: {
    width: '20rem',
    marginRight: '1rem',
  },
  autoCompleteField: {
    width: '100%',
  }
});

export interface UserFilters {
  name?: string;
  email?: string;
  adEmail?: string;
  roles?: number[];
  groups?: number[];
}

interface Props {
  defaultValues: UserFilters;
  onSubmit: (filter: UserFilters) => void;
}

export const UsersFilter: React.FC<Props> = ({
  defaultValues,
  onSubmit,
}) => {
  const classes = useStyles();

  const { data: rolesData, loading: rolesLoading } = useRolesQuery();
  const { data: groupsData, loading: groupsLoading } = useGroupsQuery();

  let roles: number[] | undefined = defaultValues.roles;
  let groups: number[] | undefined = defaultValues.groups;

  const handleRolesChange = (event: React.ChangeEvent<{}>, value: any) => {
    if (rolesData && rolesData.roles) {
      roles = rolesData.roles.filter(role => value.includes(role.name)).map(role => parseInt(role.id));
    }
  };

  const handleGroupsChange = (event: React.ChangeEvent<{}>, value: any) => {
    if (groupsData && groupsData.groups) {
      groups = groupsData.groups.filter(group => value.includes(group.name)).map(group => parseInt(group.id));
    }
  };

  let defaultRoles: string[] = [];
  if (rolesData && rolesData.roles) {
    defaultRoles = rolesData.roles.filter(role => roles?.includes(parseInt(role.id))).map(role => role.name);
  }
  let defaultGroups: string[] = [];
  if (groupsData && groupsData.groups) {
    defaultGroups = groupsData.groups.filter(group => groups?.includes(parseInt(group.id))).map(group => group.name);
  }

  if (rolesLoading || groupsLoading) return <span>Loading...</span>;

  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={values => {
        onSubmit({ ...values, roles, groups });
      }}
    >
      <Form className={classes.form}>
        <Field
          name="name"
          type="text"
          placeholder="Username"
          label="Username"
          component={MyField}
          className={classes.textField}
        />
        <Field
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          component={MyField}
          className={classes.textField}
        />
        <Field
          name="adEmail"
          type="email"
          placeholder="AD Email"
          label="AD Email"
          component={MyField}
          className={classes.textField}
        />
        <Autocomplete
          placeholder="AD Groups"
          multiple
          options={groupsData?.groups?.map(group => group.name) as string[]}
          onChange={handleGroupsChange}
          className={classes.autoComplete}
          defaultValue={defaultGroups}
          renderInput={params => (
            <TextField
              {...params}
              label="AD Groups"
              className={classes.autoCompleteField}
              variant="standard"
            />
          )}
        />
        <Autocomplete
          placeholder="Roles"
          multiple
          options={rolesData?.roles?.map(role => role.name) as string[]}
          onChange={handleRolesChange}
          className={classes.autoComplete}
          defaultValue={defaultRoles}
          renderInput={params => (
            <TextField
              {...params}
              label="Roles"
              className={classes.autoCompleteField}
              variant="standard"
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Filter
        </Button>
      </Form>
    </Formik>
  );
};
