import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import styles from "./Item.module.scss";

type ItemProps = {
    name: string;
    closeMenu?: any;
    onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({name, closeMenu, onClick}) => {
    return (
        <div className={`${styles.wrapper} ${closeMenu && styles.closeMenu}`} onClick={onClick}>
            {closeMenu && <CloseIcon className="mr-5"/>}
            {name}
        </div>
    );
};

export default Item;