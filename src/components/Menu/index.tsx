import React from 'react';

import OpenMenu from "./OpenMenu";
import CloseMenu from "./CloseMenu";
import styles from "./Menu.module.scss";

type MenuProps = {
    isOpenMenu: boolean;
}

const Menu: React.FC<MenuProps> = ({isOpenMenu}) => {
    return (
        <div className={
            `${styles.wrapper} 
             ${isOpenMenu ? styles.wrapperOpen : styles.wrapperClose}`
        }>
            {isOpenMenu ? <OpenMenu/> : <CloseMenu/>}
        </div>
    );
};

export default Menu;