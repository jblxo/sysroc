import React from 'react';
import { Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { MyField } from './MyField';

interface Values {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

export const MyForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form>
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
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
};
