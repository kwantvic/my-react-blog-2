import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";

import styles from "./Header.module.scss";
import AuthModal from "../AuthModal";
import {logOutThunk} from "../../redux/actions/auth";
import DraggableDialog from "../UiComponents/DraggableDialog";

const Header: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    function onLogOut() {
        dispatch(logOutThunk())
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>
                {auth.isAuth ? auth.user.fullName : "Victor Victorenko"} Blog
            </div>
            <div className={styles.icons}>
                <div className="tooltip">
                    <SearchIcon style={{marginRight: 10, cursor: "pointer"}}/>
                    <span className="tooltiptext" style={{marginLeft: "-47px"}}>Поиск</span></div>
                {auth.isAuth ? (
                    <>
                        <div className="tooltip">
                            <DriveFileRenameOutlineIcon style={{marginRight: 13, cursor: "pointer"}}/>
                            <span className="tooltiptext" style={{marginLeft: "-47px"}}>Написать</span></div>
                        <div className="tooltip">
                            <DraggableDialog onLogOut={onLogOut} title={"Вы действительно хотите выйти?"}/>
                            <span className="tooltiptext" style={{marginLeft: "-44px"}}>Выйти</span></div>
                    </>
                ) : (
                    <div className="tooltip">
                        <AuthModal/>
                        <span className="tooltiptext" style={{marginLeft: "-40px"}}>Войти</span></div>
                )}
            </div>
        </div>
    );
};

export default Header;