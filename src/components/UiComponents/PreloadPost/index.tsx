import React from 'react';

import styles from "./PreloadPost.module.scss";
import {Skeleton} from "@mui/material";

export const PreloadPost: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <Skeleton className={styles.titleSkeleton} variant="text"/>
                </div>
                <div className={styles.description}>
                    <Skeleton className={styles.descrSkeleton} variant="text"/>
                </div>
                <div className={styles.footer}>
                    <Skeleton className={styles.footerSkeleton} variant="text"/>
                </div>
            </div>
            <div className={styles.img}>
                <Skeleton className={styles.imgSkeleton} variant="rectangular"/>
            </div>
        </div>
    );
};