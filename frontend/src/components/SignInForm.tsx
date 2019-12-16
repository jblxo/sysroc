import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from './MyField';

const useStyles = makeStyles({
  form: {
    padding: '2rem',
    width: '20rem',
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
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

export const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form className={classes.form}>
          <Typography className={classes.formTitle} variant="h4">
            Sign In
          </Typography>
          <div>
            <Field
              name="email"
              type="text"
              placeholder="Email Address"
              label="Email Address"
              component={MyField}
              required
            />
          </div>
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              component={MyField}
            />
          </div>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
};
