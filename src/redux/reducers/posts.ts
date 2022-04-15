import {UserParams} from "./auth";
import {postsInitialState} from "./initialState";
import {LoadingStatus} from "../../modules/loadingStatus";

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
    photoUrl: string;
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

interface ActionGetUserPagePostsMore {
    type: 'GET_USER_PAGE_POSTS_MORE',
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

interface ActionSetUrlImgEditPost {
    type: 'SET_URL_IMG_EDIT_POST',
    payload: {
        urlImg: string
    }
}

interface ActionChangeStatus {
    type: 'CHANGE_STATUS',
    payload: {
        status: LoadingStatus
    }
}

interface ActionChangeCurrentPage {
    type: 'CHANGE_CURRENT_PAGE',
    payload: {
        n: number
    }
}

interface ActionChangePageSize {
    type: 'CHANGE_PAGE_SIZE',
    payload: {
        n: number
    }
}

type Action =
    ActionGetUserTotalPosts
    | ActionGetUserPagePosts
    | ActionGetUserPagePostsMore
    | ActionChangeValueCreatePost
    | ActionSetUrlImgEditPost
    | ActionChangeStatus
    | ActionChangeCurrentPage
    | ActionChangePageSize;

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
        case 'GET_USER_PAGE_POSTS_MORE': {
            return {
                ...state,
                userPagePosts: [...state.userPagePosts, ...action.payload.items]
            }
        }
        case 'SET_URL_IMG_EDIT_POST': {
            return {
                ...state,
                urlImgEditPost: action.payload.urlImg
            }
        }
        case 'CHANGE_STATUS': {
            return {
                ...state,
                loadingStatus: action.payload.status
            }
        }
        case 'CHANGE_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.payload.n
            }
        }
        case 'CHANGE_PAGE_SIZE': {
            return {
                ...state,
                pageSize: action.payload.n
            }
        }
    }
    return state;
};