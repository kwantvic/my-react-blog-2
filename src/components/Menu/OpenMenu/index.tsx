import React from 'react';
import AppContext, {AppContextValue} from "../../../context";

import styles from "./OpenMenu.module.scss";

const OpenMenu: React.FC = () => {
    const {toggleMenu, isAuth} = React.useContext(AppContext) as AppContextValue;
    return (
        // todo: close openMenu to click without this component
        <div className={styles.wrapper} onClick={toggleMenu}>
            <div className={styles.header}>
                {isAuth && <>
                    <div className={styles.name}>Вася Пупкин</div>
                    <div className={styles.data}>Дата регистрации: 31 февраля 2020 в 02:33</div>
                </>}
            </div>
            <div className={styles.itemsMenu}>
                <div>Главная</div>
                {!isAuth && <div>Войти</div>}
                {isAuth && <>
                    <div>Мой профиль</div>
                    <div>Создать запись</div>
                    <div>Выйти</div>
                </>}
            </div>
            <div className={styles.footer}>
                меню
            </div>
        </div>
    );
};

export default OpenMenu;