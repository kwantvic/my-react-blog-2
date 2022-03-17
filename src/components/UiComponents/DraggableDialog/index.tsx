import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from "@mui/icons-material/Logout";
import YellowButton from "../YellowButton";

import styles from "./DraggableDialog.module.scss";

type DraggableDialogProps = {
    title: string;
    onLogOut: () => void;
}

const DraggableDialog: React.FC<DraggableDialogProps> = ({title, onLogOut}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <LogoutIcon onClick={handleClickOpen} style={{cursor: "pointer"}}/>
            <Dialog
                className={styles.wrapper}
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle className={styles.title} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogActions>
                    <YellowButton onClick={handleClose} widthButton={"50px"} heightButton={"45px"} nameButton={"Нет"}/>
                    <YellowButton onClick={onLogOut} widthButton={"50px"} heightButton={"45px"} nameButton={"Да"}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DraggableDialog;
