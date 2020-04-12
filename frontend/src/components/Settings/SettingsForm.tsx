import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from '../MyField';
import { ApolloError } from 'apollo-client';
import { Error } from '../Error';
import styled from 'styled-components';
import { useMeExtendedQuery } from '../../generated/graphql';
import { ProfileValues } from '../../views/Settings';

const FormBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
  & > div {
    max-width: 20rem;
    width: 100%;
  }
`;

const useStyles = makeStyles({
  form: {
    padding: '2rem',
    margin: '0 auto',
    marginTop: '1.3rem'
  },
  button: {
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  boxTitle: {
    marginBottom: '.7rem'
  },
  description: {
    fontWeight: 300,
    marginBottom: '1rem',
    fontSize: '.9rem'
  },
  field: {
    width: '100%',
    marginBottom: '.7rem'
  }
});

interface Props {
  onSubmit: (values: ProfileValues) => Promise<void>;
  error: ApolloError | any;
}

export const SettingsForm: React.FC<Props> = ({ onSubmit, error }) => {
  const classes = useStyles();
  const { data, loading, refetch } = useMeExtendedQuery();

  if (loading) return <span>Loading...</span>;

  return (
    <Formik
      initialValues={{
        name: data?.me?.user ? data.me.user.name : '',
        oldEmail: data?.me?.user ? data.me.user.email : '',
        email: '',
        oldPassword: '',
        password: '',
        passwordAgain: '',
      }}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        await onSubmit(values);

        resetForm();

        const refetchData = await refetch();
        const userData = refetchData?.data?.me?.user;
        if (userData) {
          setFieldValue('name', userData.name);
          setFieldValue('oldEmail', userData.email);
        }
      }}
    >
      {() => (
        <Form className={classes.form}>
          {error && <Error error={error} />}

          <FormBox>
            <div>
              <Typography className={classes.boxTitle} variant="h6">
                Account
              </Typography>
              <Typography className={classes.description}>
                Change your personal information
              </Typography>
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  label="Name"
                  component={MyField}
                  className={classes.field}
                  required
                />
              </div>
              <div>
                <Field
                  name="oldEmail"
                  type="email"
                  placeholder="Current Email Address"
                  label="Current Email Address"
                  component={MyField}
                  className={classes.field}
                  disabled
                />
              </div>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="New Email Address"
                  label="New Email Address"
                  component={MyField}
                  className={classes.field}
                />
              </div>
            </div>
            <div>
              <Typography className={classes.boxTitle} variant="h6">
                Password
              </Typography>
              <Typography className={classes.description}>
                Change your password
              </Typography>
              <div>
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Current Password"
                  label="Current Password"
                  component={MyField}
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="New Password"
                  label="New Password"
                  component={MyField}
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="passwordAgain"
                  placeholder="New Password Again"
                  label="New Password Again"
                  component={MyField}
                  className={classes.field}
                />
              </div>
            </div>
          </FormBox>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};
