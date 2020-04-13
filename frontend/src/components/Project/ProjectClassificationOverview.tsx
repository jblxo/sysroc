import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ClassificationDto} from "../../generated/graphql";
import React, {useState} from "react";
import {Modal, Paper} from "@material-ui/core";
import moment from 'moment';
import {List} from "../Layout/List";
import {Item} from "../Layout/Item";

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
            width: 850,
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
    classification: ClassificationDto[];
}

export const ProjectClassificationOverview: React.FC<Props> = ({open, handleClose, classification}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal
            aria-labelledby="project classification overview"
            aria-describedby="modal with project classification overview"
            open={open}
            onClose={handleClose}
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="new-project-modal-title">Classification Overview</h2>
                <p id="new-project-modal-description">Great job</p>
                <Paper>
                    <List>
                        <div className="flex">
                            <Item>
                                <div>Mark</div>
                            </Item>
                            <Item>
                                <div>User</div>
                            </Item>
                            <Item>
                                <div>Created</div>
                            </Item>
                        </div>
                        {classification.map(({id, user, createdAt, mark}) => (
                            <div key={id} className="flex">
                                <Item>
                                    <div>{mark}</div>
                                </Item>
                                <Item>
                                    <div>{user.name}</div>
                                </Item>
                                <Item>
                                    <div>{moment(createdAt).format('DD. MM. YYYY')}</div>
                                </Item>
                            </div>
                        ))}
                    </List>
                </Paper>
            </div>
        </Modal>
    );
};
