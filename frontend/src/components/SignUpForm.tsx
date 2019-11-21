import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from './MyField';

interface Values {
  name: string;
  changes: boolean;
}

interface Props {
  onSubmit: (values: Values) => void;
}

export const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const [showFields, setShowFields] = useState(false);

  return (
    <Formik
      initialValues={{ name: '', changes: true }}
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
              <Field
                name="name"
                type="text"
                placeholder="Username"
                label="Username"
                component={MyField}
                required
              />
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
