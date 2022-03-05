import React from 'react';

import userLogo from "../../assets/img/user-background-2.png";
import styles from "./About.module.scss"

const About: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Victor Victorenko</h1>
                <h4>Блог фронтенд-разработчика</h4>
            </div>
            <div className={styles.avatar}>
                <img src={userLogo} alt="user-avatar"/>
            </div>
            <div className={styles.about}>
                <h4>Обо мне</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque diam arcu risus.
                    Imperdiet dolor, porttitor pellentesque fringilla aliquet sit. Turpis arcu vitae quis nunc suscipit.
                    Mattis scelerisque leo curabitur faucibus. Nec, sed porta ac enim. Mattis quam accumsan ipsum
                    commodo sed purus mi. Platea sit lectus neque, nulla sapien vitae nulla. Nisl viverra viverra quis
                    mattis tincidunt laoreet amet, laoreet proin. Duis mi, aliquam tincidunt amet phasellus malesuada
                    non nisi.
                </p>
            </div>
        </div>
    );
}

export default About;