import React from 'react';
import {useSelector} from "react-redux";

import userLogo from "../../assets/img/user-background-2.png";
import userLogo2 from "../../assets/img/user-background.png";
import styles from "./About.module.scss"
import {RootState} from "../../redux";
import {getDate} from "../../utils/functional";

const About: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const createdAt = auth.user.createdAt;
    function isMainId() {
        return (auth.user._id === auth.mainId || !auth.isAuth)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>{auth.isAuth ? auth.user.fullName : "Victor Victorenko"}</h1>
                <h4>{isMainId() ? "Блог фронтенд-разработчика" : `Блог пользователя ${auth.user.fullName}`}</h4>
            </div>
            <div className={styles.avatar}>
                <img src={isMainId() ? userLogo : userLogo2} alt="user-avatar"/>
            </div>
            <div className={styles.about}>
                <h4>Обо мне</h4>
                <p>{isMainId()
                    ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque diam arcu risus.
                    Imperdiet dolor, porttitor pellentesque fringilla aliquet sit. Turpis arcu vitae quis nunc suscipit.
                    Mattis scelerisque leo curabitur faucibus. Nec, sed porta ac enim. Mattis quam accumsan ipsum
                    commodo sed purus mi. Platea sit lectus neque, nulla sapien vitae nulla. Nisl viverra viverra quis
                    mattis tincidunt laoreet amet, laoreet proin. Duis mi, aliquam tincidunt amet phasellus malesuada
                    non nisi.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque diam arcu risus.
                    Imperdiet dolor, porttitor pellentesque fringilla aliquet sit.`
                    : `Привет 👋 Это блог пользователя ${auth.user.fullName} который был создан ${getDate(createdAt!)}.`}
                </p>
            </div>
        </div>
    );
}

export default About;