import {useSelector} from "react-redux";

import {RootState} from "./index";

export function useAuthSelector() {
    return useSelector((state: RootState) => state.auth);
}

export function useAuthUserSelector() {
    return useSelector((state: RootState) => state.auth.user);
}

export function useLoadingAuthSelector() {
    return useSelector((state: RootState) => state.auth.loadingStatus);
}

export function usePostsSelector() {
    return useSelector((state: RootState) => state.posts);
}

export function useUserPagePostsSelector() {
    return useSelector((state: RootState) => state.posts.userPagePosts);
}

export function useLoadingPostsSelector() {
    return useSelector((state: RootState) => state.posts.loadingStatus);
}