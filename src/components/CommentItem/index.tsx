import React from 'react';

import styles from "./CommentItem.module.scss";

export const CommentItem: React.FC = React.memo(() => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.name}>Vasya Pupkin</div>
                <div className={styles.date}>12 августа 2019 в 08:06</div>
            </div>
            <div className={styles.body}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor adipiscing leo id sed neque, diam
                    nibh.</p>
            </div>
        </div>
    );
});