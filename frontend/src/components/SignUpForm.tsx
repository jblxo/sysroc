import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from './MyField';
import { getUserTemp } from '../auth/userTemp';

interface Values {
  name: string;
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

export const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const [showFields, setShowFields] = useState(false);
  const userTemp = getUserTemp();

  let name: string = '';
  let email: string = '';
  if (userTemp !== undefined) {
    name = userTemp!.name;
    email = userTemp!.email;
  }

  return (
    <Formik
      initialValues={{ name, email, password: '' }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form>
          <Box mt="1.5rem" mb="0.7rem">
            <Typography>
              Your account will be created based on the data from ActiveDirectory.<br />
              However, you can customize them here before creating the account.
            </Typography>
          </Box>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  name="changes"
                  onChange={() => setShowFields(!showFields)}
                />
              }
              label="I want to make changes to my data"
            />
          </div>
          { showFields &&
            <Box mb="0.7rem">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Username"
                  label="Username"
                  component={MyField}
                />
              </div>
              <div>
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  label="Email"
                  component={MyField}
                />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                  component={MyField}
                />
              </div>
            </Box>
          }
          <Button type="submit" variant="contained" color="primary">
            Create account
          </Button>
        </Form>
      )}
    </Formik>
  );
};
