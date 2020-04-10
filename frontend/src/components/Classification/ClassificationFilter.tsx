import {Button, makeStyles, TextField} from "@material-ui/core";
import React from "react";
import {useProjectsQuery, useUsersQuery} from "../../generated/graphql";
import {Form, Formik} from "formik";
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

export interface ClassificationFilters {
    projects?: number[];
    users?: number[];
}

interface Props {
    defaultValues: ClassificationFilters;
    onSubmit: (filter: ClassificationFilters) => void;
}

export const ClassificationFilter: React.FC<Props> = ({defaultValues, onSubmit}) => {
    const classes = useStyles();

    const { data: projectsData, loading: projectsLoading} = useProjectsQuery();
    const { data: usersData, loading: usersLoading} = useUsersQuery();

    let projects: number[] | undefined = defaultValues.projects;
    let users: number[] | undefined = defaultValues.users;

    const handleProjectsChange = (event: React.ChangeEvent<{}>, value: any) => {
        if(projectsData && projectsData.projects) {
            projects = projectsData.projects.filter(project => value.includes(project.name)).map(project => parseInt(project.id));
        }
    }

    const handleUsersChange = (event: React.ChangeEvent<{}>, value: any) => {
        if(usersData && usersData.users) {
            users = usersData.users.filter(user => value.includes(user.name)).map(user => parseInt(user.id));
        }
    }

    let defaultProjects: string[] = [];
    if (projectsData && projectsData.projects) {
        defaultProjects = projectsData.projects.filter(project => projects?.includes(parseInt(project.id))).map(project => project.name);
    }

    let defaultUsers: string[] = [];
    if (usersData && usersData.users) {
        defaultUsers = usersData.users.filter(user => users?.includes(parseInt(user.id))).map(user => user.name);
    }

    if(projectsLoading || usersLoading) return <span>Loading...</span>;

    return (
        <Formik
            initialValues={defaultValues}
            onSubmit={values => {
                onSubmit({...values, projects, users});
            }}
        >
            <Form className={classes.form}>
                <Autocomplete
                    placeholder="Projects"
                    multiple
                    options={projectsData?.projects?.map(project => project.name) as string[]}
                    onChange={handleProjectsChange}
                    className={classes.autoComplete}
                    defaultValue={defaultProjects}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Projects"
                            className={classes.autoCompleteField}
                            variant="standard"
                        />
                    )}
                />
                <Autocomplete
                    placeholder="Users"
                    multiple
                    options={usersData?.users?.map(user => user.name) as string[]}
                    onChange={handleUsersChange}
                    className={classes.autoComplete}
                    defaultValue={defaultUsers}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Users"
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
    )
};
