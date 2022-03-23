import React from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';

import {AppContext, AppContextValue} from "../../../context";
import styles from "./CloseMenu.module.scss";

const CloseMenu : React.FC = () => {
    const {toggleMenu} = React.useContext(AppContext) as AppContextValue;

    return (
        <div className={styles.wrapper}>
            <div className={styles.menu} onClick={toggleMenu}>
                <div className={styles.icon}>
                    <DehazeIcon/>
                </div>
                <div className={styles.text}>
                    меню
                </div>
            </div>
        </div>
    );
};

export default CloseMenu;