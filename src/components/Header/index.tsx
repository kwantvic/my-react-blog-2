import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";

import styles from "./Header.module.scss";
import AuthModal from "../AuthModal";
import {logOutThunk} from "../../redux/actions/auth";
import DraggableDialog from "../UiComponents/DraggableDialog";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    function onLogOut() {
        dispatch(logOutThunk());
    }

    return (
        <div className={styles.wrapper}>
            <Link to="">
                <div className={styles.name}>
                    {auth.isAuth ? auth.user.fullName : "Victor Victorenko"} Blog
                </div>
            </Link>
            <div className={styles.icons}>
                <div className="tooltip">
                    <SearchIcon style={{marginRight: 10, cursor: "pointer"}}/>
                    <span className="tooltiptext" style={{marginLeft: "-47px"}}>Поиск</span></div>
                {auth.isAuth ? (
                    <>
                        <Link to='/createPost' className={styles.link}>
                            <div className="tooltip">
                                <DriveFileRenameOutlineIcon
                                    style={{marginRight: 13, cursor: "pointer", textDecoration: 'none'}}/>
                                <span className="tooltiptext" style={{marginLeft: "-47px"}}>Написать</span></div>
                        </Link>
                        <div className="tooltip">
                            <DraggableDialog onLogOut={onLogOut} title={"Вы действительно хотите выйти?"}/>
                            <span className="tooltiptext tooltiptext-logOut" style={{marginLeft: "-55px"}}>Выйти</span>
                        </div>
                    </>
                ) : (
                    <div className="tooltip">
                        <AuthModal/>
                        <span className="tooltiptext tooltiptext-logIn" style={{marginLeft: "-55px"}}>Войти</span></div>
                )}
            </div>
        </div>
    );
};

export default Header;