import {authInitialState} from "./initialState";
import {LoadingStatus} from "../../modules/loadingStatus";

export interface UserParams {
    _id?: string;
    fullName?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    token?: string;
}
interface ActionSetAuth {
    type: 'SET_AUTH',
    payload: {
        user: UserParams,
        isAuth: boolean
    }
}
interface ActionGetDataAt {
    type: 'GET_DATA_AT',
    payload: {
        user: UserParams
    }
}
interface ActionSetErrorDescription {
    type: 'SET_ERROR_DESCRIPTION',
    payload: {
        errorDescription: string
    }
}
interface ActionChangeStatusReady {
    type: 'CHANGE_STATUS_READY',
    payload: {
        x: LoadingStatus
    }
}

type Action = ActionSetAuth | ActionGetDataAt | ActionSetErrorDescription | ActionChangeStatusReady;

export const authReducer = (state = authInitialState, action: Action) => {
    switch (action.type) {
        case 'SET_AUTH': {
            return {
                ...state,
                user: action.payload.user,
                isAuth: action.payload.isAuth
            }
        }
        case 'GET_DATA_AT': {
            return {
                ...state,
                user: {
                   ...state.user, createdAt: action.payload.user.createdAt
                }
            }
        }
        case 'SET_ERROR_DESCRIPTION': {
            return {
                ...state,
                errorDescription: action.payload.errorDescription
            }
        }
        case 'CHANGE_STATUS_READY': {
            return {
                ...state,
                loadingStatus: action.payload.x
            }
        }
    }
    return state;
};