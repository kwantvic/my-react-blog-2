import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from "./Header.module.scss";
import AppContext, {AppContextValue} from "../../context";
import AuthModal from "../AuthModal";

const Header: React.FC = () => {
    const {isAuth} = React.useContext(AppContext) as AppContextValue;
    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>
                Victor Victorenko Blog
            </div>
            <div className={styles.icons}>
                <div className="tooltip">
                    <SearchIcon style={{marginRight: 10, cursor: "pointer"}}/>
                    <span className="tooltiptext" style={{marginLeft: "-47px"}}>Поиск</span></div>
                {isAuth ? (
                    <>
                        <div className="tooltip">
                            <DriveFileRenameOutlineIcon style={{marginRight: 13, cursor: "pointer"}}/>
                            <span className="tooltiptext" style={{marginLeft: "-47px"}}>Написать</span></div>
                        <div className="tooltip">
                            <LogoutIcon style={{cursor: "pointer"}}/>
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