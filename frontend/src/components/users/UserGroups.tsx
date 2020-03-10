import React from 'react';
import { useGroupsQuery } from '../../generated/graphql';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import styled from 'styled-components';

const UserGroupStyles = styled.div`
  padding: .5rem 0 1rem 0;
`;

interface Props {
  userGroups?: number[];
  onGroupsStateChange: (groups: number[]) => void;
}

export const UserGroups: React.FC<Props> = ({
  userGroups,
  onGroupsStateChange,
}) => {
  const [defaultValue, setDefaultValue] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  const { data: groupsData, loading: loadingGroups } = useGroupsQuery();

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    if (groupsData && groupsData.groups) {
      onGroupsStateChange(groupsData.groups.filter(group => value.includes(group.name)).map(group => parseInt(group.id)));
    }
  };

  if (loadingGroups && !loaded) return <span>Loading...</span>;

  if (!loaded && userGroups && groupsData && groupsData.groups) {
    setDefaultValue(groupsData.groups.filter(group => userGroups.includes(parseInt(group.id))).map(group => group.name));
    setLoaded(true);
  }

  return (
    <UserGroupStyles>
      <Autocomplete
        multiple
        options={groupsData?.groups?.map(group => group.name) as string[]}
        onChange={handleChange}
        defaultValue={defaultValue}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            fullWidth
          />
        )}
      />
    </UserGroupStyles>
  );
};
