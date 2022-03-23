import {Dispatch} from "redux";

import {ItemsParams} from "../reducers/posts";
import {postsApi} from "../../api/api";
import {setErrorDescription} from "./auth";

export const getUserTotalPosts = (userTotalPosts: number) => ({
    type: "GET_USER_TOTAL_POSTS",
    payload: {
        userTotalPosts
    }
});
export const getUserPagePosts = (items: ItemsParams[]) => ({
    type: "GET_USER_PAGE_POSTS",
    payload: {
        items
    }
});

export const getUserPagePostsThunk = (currentPage: number, pageSize: number, id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        await postsApi.getUserPagePosts(currentPage, pageSize, id)
            .then((resp) => {
                dispatch(getUserTotalPosts(resp.total));
                dispatch(getUserPagePosts(resp.items));
            })
    } catch (e: any) {
        console.log("🧲❌Ошибка при загрузке постов🥺", e);
        dispatch(setErrorDescription("Ошибка при загрузке постов"));
    }
};
