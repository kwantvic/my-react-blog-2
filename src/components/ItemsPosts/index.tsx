import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../redux";
import {getUserPagePostsThunk} from "../../redux/actions/posts";
import Post from "./Post";
import styles from "./ItemsPosts.module.scss";
import toBeContinued from "../../assets/img/newdesignillustrations190114260.jpeg";

const ItemsPosts: React.FC = () => {
    const posts = useSelector((state: RootState) => state.posts);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (auth.user._id) {
            dispatch(getUserPagePostsThunk(posts.currentPage, posts.pageSize, auth.user._id));
        }
    }, [auth.user._id, posts.currentPage, posts.pageSize, dispatch])

    return (
        <div>
            {posts.userTotalPosts ? posts.userPagePosts.map((obj) => {
                return <Post key={obj._id} postsUserPage={obj}/>
            }) :
            <div className={styles.info}>
                <p>Пользователь не создал ни единного поста😏</p>
                <img src={toBeContinued} alt="to be continued..."/>
            </div>}
        </div>
    );
};

export default ItemsPosts;