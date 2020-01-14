import React from 'react';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from '../MyField';
import { ApolloError } from 'apollo-client';
import { Error } from '../Error';
import { useRolesQuery } from '../../generated/graphql';

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
  select: {
    width: '12.5rem'
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
  role?: string;
}

interface Props {
  onSubmit: (values: Values) => void;
  error: ApolloError | any;
}

export const NewUserForm: React.FC<Props> = ({ onSubmit, error }) => {
  const classes = useStyles();
  const [role, setRole] = React.useState('guest');
  const { data, loading } = useRolesQuery({ variables: { admin: false } });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  if (loading) return <span>Loading...</span>;

  return (
    <Formik
      initialValues={{ name: '', email: '', adEmail: '', password: '' }}
      onSubmit={values => {
        onSubmit({ ...values, role });
      }}
    >
      {() => (
        <Form className={classes.form}>
          {error && <Error error={error} />}
          <div>
            <Field
              name="name"
              type="text"
              placeholder="User Name"
              label="User Name"
              component={MyField}
              required
            />
          </div>
          <div>
            <Field
              name="email"
              type="text"
              placeholder="Email"
              label="Email"
              component={MyField}
              required
            />
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="new-user-select-role-label">Role</InputLabel>
              <Select
                labelId="new-user-select-role-label"
                id="new-user-select-role"
                placeholder="Role"
                className={classes.select}
                name="role"
                value={role}
                onChange={handleChange}
                onBlur={handleChange}
              >
                {data &&
                  data.roles &&
                  data.roles.map(role => (
                    <MenuItem value={role.slug}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
              type="text"
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
