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
}
interface ActionGetUserTotalPosts {
    type: 'GET_USER_TOTAL_POSTS',
    payload: {
        total: number
    }
}
interface ActionGetUserPagePosts {
    type: 'GET_USER_PAGE_POSTS',
    payload: {
        items: ItemsParams[]
    }
}

type Action = ActionGetUserTotalPosts | ActionGetUserPagePosts;

export const postsReducer = (state = postsInitialState, action: Action) => {
    switch (action.type) {
        case 'GET_USER_TOTAL_POSTS': {
            return {
                ...state,
                total: action.payload.total
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