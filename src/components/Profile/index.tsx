import React from 'react';
import {useDispatch} from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import {changeCurrentPage, getUserPagePostsThunk} from "../../redux/actions/posts";
import {Post} from "../ItemsPosts/Post";
import styles from "./Profile.module.scss";
import toBeContinued from "../../assets/img/newdesignillustrations190114260.jpeg";
import {
    useAuthSelector, useAuthUserSelector, useLoadingAuthSelector,
    useLoadingPostsSelector,
    usePostsSelector,
    useUserPagePostsSelector
} from "../../redux/selectors";
import CircularProgress from '@mui/material/CircularProgress';
import YellowButton from "../UiComponents/YellowButton";
import {PreloadPost} from "../UiComponents/PreloadPost";
import { scrollToTop } from '../../utils/functional';

export const ItemsPosts: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const auth = useAuthSelector();
    const authUser = useAuthUserSelector();
    const posts = usePostsSelector();
    const pagePosts = useUserPagePostsSelector();
    const loadingPostsStatus = useLoadingPostsSelector();
    const loadingAuthStatus = useLoadingAuthSelector();
    const [hasMoreItems, setHasMoreItems] = React.useState(true);

    const residueItems: number = posts.userTotalPosts - posts.pageSize * posts.currentPage + posts.pageSize;

    React.useEffect(() => {
        auth.isAuth && dispatch(getUserPagePostsThunk(posts.currentPage, posts.pageSize, authUser._id));
    }, [auth.isAuth, posts.currentPage, posts.pageSize, authUser._id, posts.userTotalPosts, dispatch]);

    const loadMore = () => {
        pagePosts && (posts.userTotalPosts === pagePosts.length)
            ? setHasMoreItems(false)
            : setTimeout(() => {
                dispatch(changeCurrentPage(posts.currentPage + 1));
            }, 1111);
    };

    return (
        <div className={styles.wrapper}>
            {(loadingPostsStatus === 1 && loadingAuthStatus === 1)
                ? posts.userTotalPosts
                    ? <InfiniteScroll
                        className={styles.infinite}
                        dataLength={residueItems <= posts.pageSize ? posts.pageSize : residueItems}
                        next={loadMore}
                        hasMore={hasMoreItems}
                        loader={<div className={styles.progress} key={0}>
                            {posts.userTotalPosts >= posts.pageSize && <CircularProgress/>}
                        </div>}
                        endMessage={
                            posts.currentPage > 1 && <div className={styles.btnUp}>
                                <YellowButton onClick={scrollToTop} nameButton={<ArrowUpwardIcon/>}/>
                            </div>
                        }>
                        <div>
                            {pagePosts.map((obj) => {
                                return <Post key={obj._id} postsUserPage={obj}/>
                            })}
                        </div>
                    </InfiniteScroll>
                    : <div className={styles.info}>
                        <p>Пользователь не создал ни единного поста😏</p>
                        <img src={toBeContinued} alt="to be continued..."/>
                    </div>
                : Array.from({length: posts.pageSize}).map((_, i) => (
                    <PreloadPost key={i}/>
                ))
            }
        </div>
    );
});