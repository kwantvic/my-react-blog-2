import React from 'react';
import {useDispatch} from "react-redux";

import OpenMenu from "./OpenMenu";
import CloseMenu from "./CloseMenu";
import styles from "./Menu.module.scss";
import {useContainerDimensions} from "../../utils/hooks";
import {changePageSize} from "../../redux/actions/posts";

type MenuProps = {
    isOpenMenu: boolean;
}

const Menu: React.FC<MenuProps> = ({isOpenMenu}) => {
    const dispatch = useDispatch();
    const dimensionsHeightRef = React.useRef<HTMLHeadingElement>(null);
    const {heightDiv} = useContainerDimensions(dimensionsHeightRef);
    // todo: get $height by css variables
    let heightScreenItems = Math.ceil((heightDiv - 67) / 160);

    React.useEffect(() => {
        dispatch(changePageSize(heightScreenItems))
    }, [dispatch, heightScreenItems])

    return (
        <div ref={dimensionsHeightRef}
             className={
            `${styles.wrapper} 
             ${isOpenMenu ? styles.wrapperOpen : styles.wrapperClose}`
        }>
            {isOpenMenu ? <OpenMenu/> : <CloseMenu/>}
        </div>
    );
};

export default Menu;