const initialState = {
    user: {},
    isAuth: false,
    isLoading: false,
    errorText: "",
};
export interface UserParams {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    token: string;
}
interface ActionSetAuth {
    type: 'SET_AUTH',
    payload: {
        user: UserParams,
        isAuth: boolean
    }
}

type Action = ActionSetAuth;

export const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_AUTH': {
            return {
                ...state,
                user: action.payload.user,
                isAuth: action.payload.isAuth,
            }
        }
    }
    return state;
};