import React from "react";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import {ProjectDto, useProjectsQuery} from "../../generated/graphql";

interface Props {
    userId?: string;
}

export const ProjectAutocomplete: React.FC<Props> = ({userId}) => {
    const { data, loading } = useProjectsQuery({ variables: { userId } });

    if(loading) return <div>Loading...</div>;

    return (
        <Autocomplete
            id="projects-autocomplete"
            options={data?.projects as ProjectDto[]}
            getOptionLabel={(option: ProjectDto) => option.name}
            style={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Select project" variant="outlined" />}
        />
    );
};
