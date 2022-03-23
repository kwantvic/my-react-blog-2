import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

import styles from "./Post.module.scss";
import img from "../../../assets/img/jscodeimg.jpeg";
import {ItemsParams} from "../../../redux/reducers/posts";
import {getDate} from '../../../utils/functional';

const eyeStyle = {height: 20, color: "#E2E2E2", paddingBottom: 1};

type PostProps = {
    postsUserPage: ItemsParams
}

const Post: React.FC<PostProps> = ({postsUserPage}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.header}>
                    {postsUserPage.title}
                </div>
                <div className={styles.description}>
                    {postsUserPage.description}
                </div>
                <div className={styles.footer}>
                    <div className={styles.footer__date}>{getDate(postsUserPage.createdAt)}</div>
                    <div className={styles.footer__views}><VisibilityIcon
                        style={eyeStyle}/><span>{postsUserPage.views}</span></div>
                </div>
            </div>
            {!postsUserPage.imgUrl && <div className={styles.img}>
                <div className={styles.img__inner}>
                    <img src={img} alt="post img"/>
                </div>
            </div>}
        </div>
    );
};

export default Post;