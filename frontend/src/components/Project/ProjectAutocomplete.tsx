import React, { ChangeEvent } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { ProjectDto, useProjectsQuery } from '../../generated/graphql';

interface Props {
  userId?: string;
  handleChange: (project: ProjectDto | null) => void;
  defaultProject?: string;
}

export const ProjectAutocomplete: React.FC<Props> = ({ userId, handleChange, defaultProject }) => {
  const { data, loading } = useProjectsQuery();

  if (loading) return <div>Loading...</div>;

  return (
    <Autocomplete
      id="projects-autocomplete"
      defaultValue={(data?.projects as ProjectDto[]).find(project => project.id === defaultProject)}
      options={data?.projects as ProjectDto[]}
      getOptionLabel={(option: ProjectDto) => option.name}
      onChange={(event: ChangeEvent<{}>, value: ProjectDto | null) => handleChange(value)}
      renderInput={(params) => <TextField {...params} style={{ width: 200 }} label="Select project"/>}
    />
  );
};
