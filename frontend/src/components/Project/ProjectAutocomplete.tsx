import React, {ChangeEvent} from "react";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import {ProjectDto, useProjectsQuery} from "../../generated/graphql";

interface Props {
    userId?: string;
    handleChange: (project: ProjectDto | null) => void;
}

export const ProjectAutocomplete: React.FC<Props> = ({userId, handleChange}) => {
    const { data, loading } = useProjectsQuery({ variables: { userId } });

    if(loading) return <div>Loading...</div>;

    // @ts-ignore
    return (
        <Autocomplete
            id="projects-autocomplete"
            options={data?.projects as ProjectDto[]}
            getOptionLabel={(option: ProjectDto) => option.name}
            onChange={(event: ChangeEvent<{}>, value: ProjectDto | null) => handleChange(value)}
            renderInput={(params) => <TextField {...params} style={{width: 200}} label="Select project" />}
        />
    );
};
