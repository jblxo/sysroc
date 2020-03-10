import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from '../MyField';
import { ApolloError } from 'apollo-client';
import { Error } from '../Error';
import { UserRoles } from './UserRoles';
import { UserGroups } from './UserGroups';

const useStyles = makeStyles({
  form: {
    margin: '0 auto'
  },
  formControl: {
    marginTop: '0.5rem'
  },
  button: {
    marginTop: '1rem'
  },
  formTitle: {
    marginTop: '1.5rem'
  },
  formNote: {
    marginBottom: '0.5rem'
  }
});

interface Values {
  name: string;
  email: string;
  roles?: string[];
  groups?: number[];
}

interface Props {
  onSubmit: (values: Values) => void;
  userData: Values;
  error: ApolloError | any;
}

export const UpdateUserForm: React.FC<Props> = ({ onSubmit, userData, error }) => {
  const classes = useStyles({});
  let roles: string[] | undefined = userData.roles;
  let groups: number[] | undefined = userData.groups;

  const handleRoleChange = (roleSlugs: string[]) => {
    roles = roleSlugs;
  };

  const handleGroupChange = (groupIds: number[]) => {
    groups = groupIds;
  };

  return (
    <Formik
      initialValues={{ name: userData.name, email: userData.email }}
      onSubmit={values => {
        onSubmit({ ...values, roles, groups });
      }}
    >
      {() => (
        <Form className={classes.form}>
          {error && <Error error={error} />}
          <div>
            <Field
              name="name"
              type="text"
              placeholder="Username"
              label="Username"
              component={MyField}
              required
            />
          </div>
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
              component={MyField}
              required
            />
          </div>
          <Typography className={classes.formTitle} variant="h6">
            Roles
          </Typography>
          <UserRoles
            admin={false}
            userRoles={userData.roles}
            onRolesStateChange={handleRoleChange}
          />
          <Typography className={classes.formTitle} variant="h6">
            Groups
          </Typography>
          <UserGroups
            userGroups={userData.groups}
            onGroupsStateChange={handleGroupChange}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
};
