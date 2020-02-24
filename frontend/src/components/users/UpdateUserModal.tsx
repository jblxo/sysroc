import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { UsersDocument, useUpdateUserMutation } from '../../generated/graphql';
import { useSnackbar } from 'notistack';
import { UpdateUserForm } from './UpdateUserForm';
import { getUserFilters, setDefaultUserFilters } from '../../filters/users';

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
  userId: number;
  data: {
    name: string;
    email: string;
    roles?: string[];
    groups?: number[];
  };
}

export const GET_USERS = UsersDocument;

export const UpdateUserModal: React.FC<Props> = ({
  open,
  handleClose,
  userId,
  data,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [modalStyle] = React.useState(getModalStyle);
  const [updateUser, { error }] = useUpdateUserMutation({
    update(cache, result) {
      try {
        setDefaultUserFilters();

        const { users }: any = cache.readQuery({
          query: GET_USERS,
          variables: getUserFilters(),
        });

        const index = users.findIndex(
          (user: any) => user.id === result.data?.updateUser.id
        );

        users[index] = result.data?.updateUser;

        cache.writeQuery({
          query: GET_USERS,
          variables: getUserFilters(),
          data: {
            users,
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      }
    }
  });

  return (
    <Modal
      aria-labelledby="update user"
      aria-describedby="modal with form to update an existing user"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="update-user-modal-title">Edit User</h2>
        <p id="update-user-modal-description">Edit the user account.</p>
        <UpdateUserForm
          error={error}
          userData={data}
          onSubmit={async ({ name, email, roles, groups }) => {
            const res = await updateUser({
              variables: { name, email, roleSlugs: roles, groups, userId }
            });
            if (res.data) {
              enqueueSnackbar('User updated!', { variant: 'success' });
              handleClose();
            }
          }}
        />
      </div>
    </Modal>
  );
};
