import React from 'react';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router';

interface Props {
  id: number | string;
  name: string;
}

export const UserLink: React.FC<Props> = ({
  id,
  name,
}) => {
  const history = useHistory();

  return (
    <Link
      href="#"
      onClick={(event: any) => {
        event.preventDefault();
        history.push(`/users/${id}`);
      }}
    >
      {name}
    </Link>
  );
};
