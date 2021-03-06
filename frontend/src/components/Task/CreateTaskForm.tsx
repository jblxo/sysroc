import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { MyField } from '../MyField';
import { ApolloError } from 'apollo-client';
import { Error } from '../Error';
import moment, { Moment } from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

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
  dueDate: Moment;
}

interface Props {
  onSubmit: (values: Values) => void;
  error: ApolloError | any;
}

export const CreateTaskForm: React.FC<Props> = ({ onSubmit, error }) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          dueDate: moment()
        }}
        onSubmit={values => {
          onSubmit(values);
        }}
      >
        {() => (
          <Form className={classes.form}>
            <Typography className={classes.formTitle} variant="h4">
              New Task
            </Typography>
            {error && <Error error={error} />}
            <div>
              <Field
                name="name"
                type="text"
                placeholder="Task Name"
                label="Task Name"
                component={MyField}
                required
              />
            </div>
            <div>
              <Field
                name="description"
                type="text"
                placeholder="Task Description"
                label="Task Description"
                multiline={true}
                component={MyField}
                rows={4}
                rowsMax={8}
              />
            </div>
            <div>
              <Field name="dueDate">
                {({ field, form }: { field: any; form: any }) => (
                  <DatePicker
                    format="D.M.YYYY"
                    label="Due To"
                    name={field.name}
                    value={field.value}
                    onChange={value =>
                      form.setFieldValue('dueDate', value, true)
                    }
                  />
                )}
              </Field>
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
    </MuiPickersUtilsProvider>
  );
};
