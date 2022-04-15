import React from 'react';
import Button from '@mui/material/Button';

import styles from "./YellowButton.module.scss";

type YellowButtonProps = {
    nameButton: string | JSX.Element;
    onClick?: () => void;
}

const YellowButton: React.FC<YellowButtonProps> = ({nameButton, onClick}) => {
    return (
        <Button onClick={onClick} className={styles.button} variant="outlined"><span>{nameButton}</span></Button>
    );
};

export default YellowButton;