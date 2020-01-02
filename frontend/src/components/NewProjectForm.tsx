import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from './MyField';
import { ApolloError } from 'apollo-client';
import { Error } from './Error';

const useStyles = makeStyles({
  form: {
    padding: '2rem',
    margin: '0 auto',
    marginTop: '1.3rem'
  },
  button: {
    marginTop: '1rem'
  },
  formTitle: {
    marginBottom: '0.8rem'
  }
});

interface Values {
  name: string;
}

interface Props {
  onSubmit: (values: Values) => void;
  error: ApolloError | any;
}

export const NewProjectForm: React.FC<Props> = ({ onSubmit, error }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form className={classes.form}>
          <Typography className={classes.formTitle} variant="h4">
            New Project
          </Typography>
          {error && <Error error={error} />}
          <div>
            <Field
              name="name"
              type="text"
              placeholder="Project Name"
              label="Project Name"
              component={MyField}
              required
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
