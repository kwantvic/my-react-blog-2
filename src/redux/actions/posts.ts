import {Dispatch} from "redux";

import {ItemsParams} from "../reducers/posts";
import {DataCreatePostParams, postsApi} from "../../api/posts";
import {setErrorDescription} from "./auth";
import {createPostNameValues} from "../../utils/variables";

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
export const setUrlImgEditPost = (urlImg: string) => ({
    type: "SET_URL_IMG_EDIT_POST",
    payload: {
        urlImg
    }
});
export const addPost = (data: DataCreatePostParams) => ({
    type: "ADD_POST",
    payload: {
        data
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
        console.log("🧲❌Ошибка при загрузке постов.", e);
        dispatch(setErrorDescription("Ошибка при загрузке постов"));
    }
};
export const uploadImgFileThunk = (formData: any) => async (dispatch: Dispatch) => {
    try {
        await postsApi.addImgFilePost(formData)
            .then((resp) => {
                dispatch(setUrlImgEditPost('http://localhost:5656' + resp.url));
                localStorage.setItem(`values-imgUrl`, 'http://localhost:5656' + resp.url);
            })
    } catch (e: any) {
        console.log("🧲❌Ошибка при загрузке изображения поста.", e);
        dispatch(setErrorDescription("Ошибка при загрузке изображения поста"));
    }
}
export const addPostThunk = (data: DataCreatePostParams) => async (dispatch: Dispatch) => {
    try {
        await postsApi.addPost(data)
            .then((resp) => {
                console.log("🧲resp", resp)
            })
            .then(() => {
                createPostNameValues.forEach((value) => {
                    localStorage.removeItem(`values-${value}`);
                });
            })
    } catch (e: any) {
        console.log("🧲❌Ошибка при загрузке поста.", e);
        dispatch(setErrorDescription("Ошибка при загрузке поста"));
    }
}
