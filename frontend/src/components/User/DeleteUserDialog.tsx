import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  userId: number;
  open: boolean;
  onClose: () => void;
  onSubmit: (userId: number) => Promise<void>;
}

export const DeleteUserDialog: React.FC<Props> = ({
  userId,
  open,
  onClose,
  onSubmit,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>Delete Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this user?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        color="primary"
        autoFocus
      >
        Cancel
      </Button>
      <Button
        onClick={async () => {
          await onSubmit(userId);
          onClose();
        }}
        color="secondary"
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
