import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ApolloError} from "apollo-client";
import {Field, Form, Formik} from "formik";
import {Button, Typography} from "@material-ui/core";
import {Error} from "../Error";
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
}

export const NewClassificationForm: React.FC<Props> = ({ onSubmit, error, userId }) => {
    const classes = useStyles();
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [projectError, setProjectError] = useState("");

    const handleAutocompleteChange = (project: ProjectDto | null) => {
        if(project) {
            setSelectedProjectId(project.id);
        }
    };

    return (
        <Formik
            initialValues={{ mark: 1, note: '', project: "" }}
            onSubmit={values => {
                if(selectedProjectId === "" || !selectedProjectId) {
                    setProjectError("Please select project!");
                    return;
                }

                setProjectError("");
                onSubmit({...values, project: selectedProjectId});
            }}
        >
            {() => (
                <Form className={classes.form}>
                    <Typography className={classes.formTitle} variant="h4">
                        New classification
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
                                    <ProjectAutocomplete userId={userId} handleChange={handleAutocompleteChange}/>
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
    )
}
