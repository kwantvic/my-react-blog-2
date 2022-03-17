import React from 'react';

import styles from "./ItemsPosts.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {getUserPagePostsThunk} from "../../redux/actions/posts";

const ItemsPosts : React.FC = () => {
    const posts = useSelector((state: RootState) => state.posts);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (auth.user._id) {
            dispatch(getUserPagePostsThunk(posts.currentPage, posts.pageSize, auth.user._id));
        }
    }, [auth.user._id, posts.currentPage, posts.pageSize, dispatch])

    return (
        <div className={styles.wrapper}>
            ItemsPosts
        </div>
    );
};

export default ItemsPosts;