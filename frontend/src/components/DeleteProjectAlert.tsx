import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface Props {
  open: boolean;
  handleClose: () => void;
  handleDeleteProject: (projectId: number) => Promise<void>;
  projectId: number | null;
}

export const DeleteProjectAlert: React.FC<Props> = ({
  open,
  handleClose,
  handleDeleteProject,
  projectId
}) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">Delete Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Are you sure you want to delete this project?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button
        onClick={async () => {
          if (projectId !== null) {
            await handleDeleteProject(projectId);
            handleClose();
          }
        }}
        color="secondary"
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
