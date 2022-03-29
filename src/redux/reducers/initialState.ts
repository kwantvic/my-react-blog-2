import {UserParams} from "./auth";
import {ItemsParams} from "./posts";

export interface CreatePostParams {
    title: string,
    description: string,
    imgUrl: string,
    text: string
}

export interface AuthInitialStateParams {
    mainId: string;
    user: UserParams;
    isAuth: boolean;
    isReady: boolean;
    isLoading: boolean;
    errorDescription: string;
}
interface PostsInitialStateParams {
    pageSize: number;
    currentPage: number;
    userTotalPosts: number;
    userPagePosts: ItemsParams[];
    fullPost: {};
    currentPostId: number | null;
    urlImgEditPost: string;
}

export const authInitialState: AuthInitialStateParams = {
    isReady: false,
    mainId: "62060350fa97f50bae2663eb",
    user: {},
    isAuth: false,
    isLoading: false,
    errorDescription: ""
};

export const postsInitialState: PostsInitialStateParams = {
    userTotalPosts: 0,
    pageSize: 5,
    currentPage: 1,
    userPagePosts: [],
    fullPost: {},
    currentPostId: null,
    urlImgEditPost: ""
};
