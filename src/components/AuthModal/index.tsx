import React from 'react';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Dialog from '@mui/material/Dialog';

import LogIn from "./LogIn";
import Authorization from "./Authorization";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AuthModal: React.FC = () => {
    const [isLogin, setIsLogin] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setIsLogin(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsLogin(true);
    };
    const onRegistration = () => {
        setIsLogin(false);
    };

    return (
        <>
            <PersonOutlineIcon onClick={handleClickOpen} style={{cursor: "pointer"}}/>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {isLogin ? <LogIn onClose={handleClose} onRegistration={onRegistration}/> :
                    <Authorization onClose={handleClose}/>}
            </Dialog>
        </>
    );
};

export default AuthModal;