import React from 'react';

import AppContext, {AppContextValue} from "../../../context";
import styles from "./OpenMenu.module.scss";
import Item from "../Item";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux";

const OpenMenu: React.FC = () => {
    const {toggleMenu} = React.useContext(AppContext) as AppContextValue;
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    return (
        // todo: close openMenu to click without this component
        <div className={styles.wrapper}>
            <div className={styles.upBlock}>
                <div className={styles.header}>
                    {isAuth && <>
                        <div className={styles.name}>Вася Пупкин</div>
                        <div className={styles.data}>Дата регистрации: 31 февраля 2020 в 02:33</div>
                    </>}
                </div>
                <div className={styles.itemsMenu}>
                    <Item name={"Главная"}/>
                    {!isAuth && <Item name={"Войти"}/>}
                    {isAuth && <>
                        <Item name={"Мой профиль"}/>
                        <Item name={"Создать запись"}/>
                        <Item name={"Выйти"}/>
                    </>}
                </div>
            </div>
            <div className={styles.footer}>
                <Item name={"меню"} closeMenu onClick={toggleMenu}/>
            </div>
        </div>
    );
};

export default OpenMenu;