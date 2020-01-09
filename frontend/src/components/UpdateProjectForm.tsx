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
  description: string;
}

interface Props {
  onSubmit: (values: Values) => void;
  error: ApolloError | any;
  data: {
    name: string;
    description?: string;
  };
}

export const UpdateProjectForm: React.FC<Props> = ({
  onSubmit,
  error,
  data
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ name: data.name, description: data.description || '' }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form className={classes.form}>
          <Typography className={classes.formTitle} variant="h4">
            Update Project
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
          <div>
            <Field
              name="description"
              type="text"
              placeholder="Project Description"
              label="Project Description"
              component={MyField}
            />
          </div>
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
