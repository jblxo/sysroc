import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from '../MyField';
import { ApolloError } from 'apollo-client';
import { Error } from '../Error';
import { UserRoles } from './UserRoles';

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
  adEmail?: string;
  password?: string;
  roles?: string[];
}

interface Props {
  onSubmit: (values: Values) => void;
  error: ApolloError | any;
}

export const NewUserForm: React.FC<Props> = ({ onSubmit, error }) => {
  const classes = useStyles({});
  let roles: string[] = ['guest'];

  const handleRoleChange = (roleSlugs: string[]) => {
    roles = roleSlugs;
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', adEmail: '', password: '' }}
      onSubmit={values => {
        onSubmit({ ...values, roles });
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
            userRoles={roles}
            onRolesStateChange={handleRoleChange}
          />
          <Typography className={classes.formTitle} variant="h5">
            Active Directory Credentials
          </Typography>
          <p className={classes.formNote}>
            Fill details below to connect the user account with Active Directory.
          </p>
          <div>
            <Field
              name="adEmail"
              type="text"
              placeholder="Active Directory Email"
              label="Active Directory Email"
              component={MyField}
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              placeholder="Active Directory Password"
              label="Active Directory Password"
              component={MyField}
            />
          </div>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};
