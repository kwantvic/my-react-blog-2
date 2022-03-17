import {UserParams} from "./auth";
import {ItemsParams} from "./posts";

export interface AuthInitialStateParams {
    mainId: string;
    user: UserParams;
    isAuth: boolean;
    isLoading: boolean;
    errorDescription: string;
}
interface PostsInitialStateParams {
    pageSize: number;
    currentPage: number;
    total: number;
    userPagePosts: ItemsParams[]
}

export const authInitialState: AuthInitialStateParams = {
    mainId: "62060350fa97f50bae2663eb",
    user: {},
    isAuth: false,
    isLoading: false,
    errorDescription: ""
};

export const postsInitialState: PostsInitialStateParams = {
    total: 0,
    pageSize: 5,
    currentPage: 1,
    userPagePosts: []
};
