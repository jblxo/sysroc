import {Button, makeStyles, TextField} from "@material-ui/core";
import React from "react";
import {Field, Form, Formik} from "formik";
import {MyField} from "../MyField";
import {useUsersQuery} from "../../generated/graphql";
import {Autocomplete} from "@material-ui/lab";

const useStyles = makeStyles({
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    textField: {
        marginRight: '1rem',
    },
    autoComplete: {
        width: '20rem',
        marginRight: '1rem',
    },
    autoCompleteField: {
        width: '100%',
    }
});

export interface ProjectFilters {
    name?: string;
    authors?: number[];
    supervisors?: number[];
}

interface Props {
    defaultValues: ProjectFilters;
    onSubmit: (filter: ProjectFilters) => void;
}

export const ProjectsFilter: React.FC<Props> = ({
    defaultValues,
    onSubmit
}) => {
    const classes = useStyles();

    const { data: authorsData, loading: authorsLoading} = useUsersQuery();
    const { data: supervisorsData, loading: supervisorsLoading} = useUsersQuery({ variables: { roles: [1, 2] } });

    let authors: number[] | undefined = defaultValues.authors;
    let supervisors: number[] | undefined = defaultValues.supervisors;

    const handleAuthorsChange = (event: React.ChangeEvent<{}>, value: any) => {
        if(authorsData && authorsData.users) {
            authors = authorsData.users.filter(user => value.includes(user.name)).map(user => parseInt(user.id));
        }
    };

    const handleSupervisorsChange = (event: React.ChangeEvent<{}>, value: any) => {
        if(supervisorsData && supervisorsData.users) {
            supervisors = supervisorsData.users.filter(user => value.includes(user.name)).map(user => parseInt(user.id));
        }
    };

    let defaultAuthors: string[] = [];
    if(authorsData && authorsData.users) {
        defaultAuthors = authorsData.users.filter(user => authors?.includes(parseInt(user.id))).map(user => user.name);
    }

    let defaultSupervisors: string[] = [];
    if(supervisorsData && supervisorsData.users) {
        defaultSupervisors = supervisorsData.users.filter(user => supervisors?.includes(parseInt(user.id))).map(user => user.name);
    }

    if(authorsLoading || supervisorsLoading) return <span>Loading...</span>;

    return (
        <Formik
            initialValues={defaultValues}
            onSubmit={values => {
                onSubmit({...values, authors, supervisors});
            }}
        >
            <Form className={classes.form}>
                <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    label="Name"
                    component={MyField}
                    className={classes.textField}
                />
                <Autocomplete
                    placeholder="Authors"
                    multiple
                    options={authorsData?.users?.map(user => user.name) as string[]}
                    onChange={handleAuthorsChange}
                    className={classes.autoComplete}
                    defaultValue={defaultAuthors}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Authors"
                            className={classes.autoCompleteField}
                            variant="standard"
                        />
                    )}
                />
                <Autocomplete
                    placeholder="Supervisors"
                    multiple
                    options={supervisorsData?.users?.map(user => user.name) as string[]}
                    onChange={handleSupervisorsChange}
                    className={classes.autoComplete}
                    defaultValue={defaultSupervisors}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Supervisors"
                            className={classes.autoCompleteField}
                            variant="standard"
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Filter
                </Button>
            </Form>
        </Formik>
    );
};
