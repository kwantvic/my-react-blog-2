import React from 'react';
import {useDispatch} from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {changeCurrentPage, getUserPagePostsThunk} from "../../redux/actions/posts";
import {Post} from "./Post";
import styles from "./ItemsPosts.module.scss";
import toBeContinued from "../../assets/img/newdesignillustrations190114260.jpeg";
import {
    useAuthSelector, useAuthUserSelector, useLoadingAuthSelector,
    useLoadingPostsSelector,
    usePostsSelector,
    useUserPagePostsSelector
} from "../../redux/selectors";
import {PreloadPost} from "../UiComponents/PreloadPost";
import Button from "@mui/material/Button";

export const ItemsPosts: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const auth = useAuthSelector();
    const authUser = useAuthUserSelector();
    const posts = usePostsSelector();
    const pagePosts = useUserPagePostsSelector();
    const loadingPostsStatus = useLoadingPostsSelector();
    const loadingAuthStatus = useLoadingAuthSelector();

    const valuePages: number = Math.ceil(posts.userTotalPosts / posts.pageSize);

    React.useEffect(() => {
        auth.isAuth && dispatch(getUserPagePostsThunk(posts.currentPage, posts.pageSize, authUser._id));
    }, [auth.isAuth, posts.currentPage, posts.pageSize, authUser._id, posts.userTotalPosts, dispatch]);

    function prevPage() {
        dispatch(changeCurrentPage(posts.currentPage - 1));
    }
    function nextPage() {
        dispatch(changeCurrentPage(posts.currentPage + 1));
    }

    return (
        <div className={styles.wrapper}>
            {(loadingPostsStatus === 1 && loadingAuthStatus === 1)
                ? posts.userTotalPosts
                    ? pagePosts.map((obj) => {
                        return <Post key={obj._id} postsUserPage={obj}/>
                    })
                    : <div className={styles.info}>
                        <p>Пользователь не создал ни единного поста😏</p>
                        <img src={toBeContinued} alt="to be continued..."/>
                    </div>
                : Array.from({length: posts.pageSize}).map((_, i) => (
                    <PreloadPost key={i}/>
                ))
            }
            {posts.userTotalPosts &&
                <div className={styles.pages}>
                    <div className={styles.btns}>
                        <Button onClick={prevPage} disabled={posts.currentPage === 1} variant="text"><ArrowBackIcon
                            className={styles.icon}/></Button>
                        <Button onClick={nextPage} disabled={posts.currentPage === valuePages}
                                variant="text"><ArrowForwardIcon
                            className={styles.icon}/></Button>
                    </div>
                    <div className={styles.infoPages}>
                        <span>Страница {posts.currentPage} из {valuePages}</span>
                    </div>
                </div>}
        </div>
    );
});