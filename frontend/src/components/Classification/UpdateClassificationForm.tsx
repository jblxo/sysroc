import {Button, makeStyles, Typography} from "@material-ui/core";
import {ApolloError} from "apollo-client";
import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import { Error } from '../Error';
import {MyField} from "../MyField";
import {ProjectAutocomplete} from "../Project/ProjectAutocomplete";
import {ProjectDto} from "../../generated/graphql";

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
    mark: number;
    note: string;
    project: string;
}

interface Props {
    onSubmit: (values: Values) => void;
    error: ApolloError | any;
    userId?: string;
    data: {
        mark: number;
        note?: string;
        project: string;
    };
}

export const UpdateClassificationForm: React.FC<Props> = ({onSubmit, error, data, userId}) => {
  const classes = useStyles();
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(data.project);
  const [projectError, setProjectError] = useState("");

  const handleAutocompleteChange = (project: ProjectDto | null) => {
      setSelectedProjectId(project?.id);
      setProjectError("");
  };

  return (
      <Formik
        initialValues={{mark: data.mark, note: data.note ?? '', project: data.project}}
        onSubmit={(values => {
            if(selectedProjectId === "" || !selectedProjectId) {
                setProjectError("Please select project!");
                return;
            }

            setProjectError("");
            onSubmit({...values, project: selectedProjectId});
        })}
      >
          {() => (
              <Form className={classes.form}>
                  <Typography className={classes.formTitle} variant="h4">
                      Update Classification
                  </Typography>
                  {error && <Error error={error} />}
                  <div>
                      <Field
                        name="mark"
                        type="number"
                        placeholder="1"
                        label="Mark"
                        component={MyField}
                        min={1}
                        max={5}
                        required
                        value={data.mark}
                      />
                  </div>
                  <div>
                      <Field
                          name="project"
                          type="number"
                          placeholder="Select Project"
                          label="Project"
                      >
                          {() => (
                              <div style={{marginTop: 10}}>
                                  {projectError && <div style={{color: "red"}}>{projectError}</div>}
                                  <ProjectAutocomplete userId={userId} handleChange={handleAutocompleteChange} defaultProject={data.project}/>
                              </div>
                          )}
                      </Field>
                  </div>
                  <div>
                      <Field
                          name="note"
                          type="text"
                          placeholder="Note"
                          label="Note"
                          multiline={true}
                          component={MyField}
                          rows={4}
                          rowsMax={8}
                          value={data.note}
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
  )
};
