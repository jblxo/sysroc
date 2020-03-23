import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { NewUserForm } from './NewUserForm';
import { useCreateUserMutation, UsersDocument } from '../../generated/graphql';
import { useSnackbar } from 'notistack';
import { getUserFilters, setDefaultUserFilters, triggerUserFiltersChange } from '../../filters/users';
import { useApolloClient } from '@apollo/react-hooks';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: '95%',
      overflowY: 'auto'
    }
  })
);

interface Props {
  open: boolean;
  handleClose: () => void;
}

const GET_USERS = UsersDocument;

export const NewUserModal: React.FC<Props> = ({
  open,
  handleClose
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { cache: apolloClient } = useApolloClient();

  const [modalStyle] = React.useState(getModalStyle);

  const [createUser, { error }] = useCreateUserMutation({
    async update(cache, result) {
      try {
        setDefaultUserFilters();

        const { users }: any = cache.readQuery({
          query: GET_USERS,
          variables: getUserFilters(),
        });

        await apolloClient.reset();

        cache.writeQuery({
          query: GET_USERS,
          variables: getUserFilters(),
          data: {
            users: users.concat([result.data?.createUser])
          }
        });

        triggerUserFiltersChange();
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      }
    }
  });

  return (
    <Modal
      aria-labelledby="new user"
      aria-describedby="modal with form to create new user"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="new-user-modal-title">New User</h2>
        <p id="new-user-modal-description">Create new user account.</p>
        <NewUserForm
          error={error}
          onSubmit={async ({ name, email, adEmail, password, roles }) => {
            const res = await createUser({
              variables: { name, email, adEmail, password, roleSlugs: roles }
            });
            if (res.data) {
              enqueueSnackbar('User created!', { variant: 'success' });
              handleClose();
            }
          }}
        />
      </div>
    </Modal>
  );
};
