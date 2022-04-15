import {UserParams} from "./auth";
import {ItemsParams} from "./posts";
import {LoadingStatus} from "../../modules/loadingStatus";

export interface PostParams {
    _id: string;
    title: string,
    description: string,
    photoUrl: string,
    text: string
}

export interface AuthInitialStateParams {
    mainId: string;
    user: UserParams;
    isAuth: boolean;
    loadingStatus: LoadingStatus;
    errorDescription: string;
}
interface PostsInitialStateParams {
    loadingStatus: LoadingStatus;
    pageSize: number;
    currentPage: number;
    userTotalPosts: number;
    userPagePosts: ItemsParams[];
    fullPost: {};
    currentPostId: number | null;
    urlImgEditPost: string;
}

export const authInitialState: AuthInitialStateParams = {
    loadingStatus: 0,
    mainId: "62060350fa97f50bae2663eb",
    user: {},
    isAuth: false,
    errorDescription: ""
};

export const postsInitialState: PostsInitialStateParams = {
    loadingStatus: 0,
    userTotalPosts: 0,
    pageSize: 5,
    currentPage: 1,
    userPagePosts: [],
    fullPost: {},
    currentPostId: null,
    urlImgEditPost: ""
};
