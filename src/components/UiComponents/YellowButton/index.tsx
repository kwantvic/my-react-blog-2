import React from 'react';
import Button from '@mui/material/Button';

import styles from "./YellowButton.module.scss";

type YellowButtonProps = {
    widthButton: string;
    heightButton: string;
    nameButton: string;
    onClick?: () => void;
}

const YellowButton: React.FC<YellowButtonProps> = ({widthButton, heightButton, nameButton, onClick}) => {
    const buttonStyles = {
        width: widthButton,
        height: heightButton,
    };
    return (
        <Button onClick={onClick} style={buttonStyles} className={styles.button} variant="outlined"><span>{nameButton}</span></Button>
    );
};

export default YellowButton;