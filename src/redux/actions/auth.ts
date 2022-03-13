import {UserParams} from "../reducers/auth";

export const setAuthAction = (user: UserParams, isAuth: boolean) => ({
    type: "SET_AUTH",
    payload: {
        user,
        isAuth,
    },
});