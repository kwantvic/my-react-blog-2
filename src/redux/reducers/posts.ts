import {UserParams} from "./auth";
import {postsInitialState} from "./initialState";

export interface ItemsParams {
    user: UserParams;
    createdAt: string;
    description: string;
    text: string;
    title: string;
    updateAt: string;
    views: number;
    __v: number;
    _id: string;
    imgUrl: string;
}
interface ActionGetUserTotalPosts {
    type: 'GET_USER_TOTAL_POSTS',
    payload: {
        userTotalPosts: number
    }
}
interface ActionGetUserPagePosts {
    type: 'GET_USER_PAGE_POSTS',
    payload: {
        items: ItemsParams[]
    }
}
interface ActionChangeValueCreatePost {
    type: 'CHANGE_VALUE_CREATE_POST',
    payload: {
        name: string,
        value: string
    }
}

type Action = ActionGetUserTotalPosts | ActionGetUserPagePosts | ActionChangeValueCreatePost;

export const postsReducer = (state = postsInitialState, action: Action) => {
    switch (action.type) {
        case 'GET_USER_TOTAL_POSTS': {
            return {
                ...state,
                userTotalPosts: action.payload.userTotalPosts
            }
        }
        case 'GET_USER_PAGE_POSTS': {
            return {
                ...state,
                userPagePosts: action.payload.items
            }
        }
    }
    return state;
};