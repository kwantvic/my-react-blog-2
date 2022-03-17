import React from 'react';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Dialog from '@mui/material/Dialog';
import { useStateIfMounted } from "use-state-if-mounted";

import LogIn from "./LogIn";
import Registration from "./Registration";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref) {
    // todo: Element Slide doesn't have required attribute children
    return <Slide direction="up" ref={ref} {...props} />;
});

const AuthModal: React.FC = () => {
    const [isLogin, setIsLogin] = useStateIfMounted(true);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputValue({...inputValue, [name]: value});
    };
    const handleClickOpen = () => {
        setOpen(true);
        setIsLogin(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsLogin(true);
        setInputValue({name: "", email: "", password: ""});
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
                {isLogin ? <LogIn onClose={handleClose} onRegistration={onRegistration} onChange={handleChangeInput}
                                  inputValue={inputValue}/> :
                    <Registration onClose={handleClose}/>}
            </Dialog>
        </>
    );
};

export default AuthModal;