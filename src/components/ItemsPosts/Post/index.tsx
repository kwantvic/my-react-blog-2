import React from 'react';
import {Link, useLocation} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useDispatch} from "react-redux";

import styles from "./Post.module.scss";
import {ItemsParams} from "../../../redux/reducers/posts";
import {getDate, scrollToTop} from '../../../utils/functional';
import {updateViewsPostThunk} from "../../../redux/actions/posts";
import {useUserPagePostsSelector} from "../../../redux/selectors";

type PostProps = {
    postsUserPage: ItemsParams;
}

export const Post: React.FC<PostProps> = React.memo(({postsUserPage}) => {
    const dispatch = useDispatch();
    const activeId = useLocation().pathname.replace('/post/', '');
    function onClickPost() {
        dispatch(updateViewsPostThunk(postsUserPage._id));
        scrollToTop();
    }

    return (
        <div
            className={activeId === postsUserPage._id ? `${styles.wrapper} ${styles.wrapper__active}` : styles.wrapper}>
            <div
                className={postsUserPage.photoUrl ? `${styles.body} ${styles.withImg}` : `${styles.body} ${styles.withoutImg}`}>
                <div className={styles.header}>
                    <Link to={`/post/${postsUserPage._id}`}><p onClick={onClickPost}>{postsUserPage.title}</p></Link>
                </div>
                <div className={styles.description}>
                    {postsUserPage.description}
                </div>
                <div className={styles.footer}>
                    <div className={styles.footer__date}>{getDate(postsUserPage.createdAt)}</div>
                    <div className={styles.footer__views}>
                        <VisibilityIcon className={styles.eye}/><span>{postsUserPage.views}</span>
                    </div>
                </div>
            </div>
            {postsUserPage.photoUrl && <div className={styles.img}>
                <div className={styles.img__inner}>
                    <img src={postsUserPage.photoUrl} alt="post img"/>
                </div>
            </div>}
        </div>
    );
});