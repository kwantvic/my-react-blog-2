import React from 'react';
import Button from '@mui/material/Button';

import styles from "./GreenButton.module.scss";

type GreenButtonProps = {
    widthButton: string;
    heightButton: string;
    nameButton: string;
    icon: JSX.Element;
}

const GreenButton: React.FC<GreenButtonProps> = ({widthButton, heightButton, nameButton, icon}) => {
    const buttonStyles = {
        width: widthButton,
        height: heightButton
    };
    return (
        <Button component="span" style={buttonStyles} className={styles.button} variant="outlined">
            <div className={styles.icon}>{icon && icon}</div>
            <span>{nameButton}</span>
        </Button>
    );
};

export default GreenButton;