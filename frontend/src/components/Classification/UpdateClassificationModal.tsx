import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import React from "react";
import {Modal} from "@material-ui/core";
import {UpdateClassificationForm} from "./UpdateClassificationForm";

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
            padding: theme.spacing(2, 4, 3)
        }
    })
);

interface Props {
    open: boolean;
    handleClose: () => void;
    classificationId: number;
    userId?: string;
    data: {
        mark: number;
        note?: string;
        project: string;
    };
}

export const UpdateClassificationModal: React.FC<Props> = ({
    open,
    handleClose,
    classificationId,
    userId,
    data
}) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [ modalStyle ] = React.useState(getModalStyle);

    return (
        <Modal
            aria-labelledby="update classification"
            aria-describedby="modal with form to update classification"
            open={open}
            onClose={handleClose}
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="new-project-modal-title">Update classification</h2>
                <p id="new-project-modal-description">Be gentle</p>
                <UpdateClassificationForm
                    data={data}
                    error={''}
                    onSubmit={async ({ mark, note, project }) => {
                        console.log(mark, note, project);
                    }}
                    userId={userId}
                />
            </div>
        </Modal>
    )
};
