import {Dispatch} from "redux";

import {UserParams} from "../reducers/auth";
import {FormInput} from "../../components/AuthModal/LogIn";
import {currentInstance} from "../../api";
import {authApi} from "../../api/auth"

import {getUserPagePosts, getUserTotalPosts} from "./posts";
import {LoadingStatus} from "../../modules/loadingStatus";

export const logInAuth = (user: UserParams, isAuth: boolean) => ({
    type: "SET_AUTH",
    payload: {
        user,
        isAuth
    },
});
export const getDataAt = (user: UserParams) => ({
    type: "GET_DATA_AT",
    payload: {
        user
    },
});
export const changeStatusReady = (x: LoadingStatus) => ({
    type: "CHANGE_STATUS_READY",
    payload: {
        x
    },
});
export const setErrorDescription = (errorDescription: string) => ({
    type: "SET_ERROR_DESCRIPTION",
    payload: {
        errorDescription
    }
})

export const registrationThunk = (data: FormInput) => async (dispatch: Dispatch) => {
    try {
        dispatch(changeStatusReady(0));
        await authApi.registration(data)
            .then((resp) => {
                localStorage.setItem('token', resp.token);
                dispatch(logInAuth(resp, true));
                currentInstance();
            })
            .then(() => dispatch(changeStatusReady(1)));
    } catch (e: any) {
        console.log("🧲❌Ошибка при регистрации.", e.response.data.error);
        dispatch(setErrorDescription(e.response.data.error));
    }
}
export const logInThunk = (data: FormInput) => async (dispatch: Dispatch) => {
    try {
        dispatch(changeStatusReady(0));
        await authApi.logIn(data)
            .then((resp) => {
                localStorage.setItem('token', resp.token);
                dispatch(logInAuth(resp, true));
                currentInstance();
            })
            .then(await (async () => {
                    try {
                        await authApi.getUserData()
                            .then((resp) => {
                                dispatch(getDataAt(resp));
                            })
                    } catch (e: any) {
                        console.log("🧲❌Ошибка при загрузке данных пользователя.", e.response.data.error);
                        dispatch(setErrorDescription("Ошибка при загрузке данных пользователя, повторите попытку"));
                    }
                })
            )
            .then(() => dispatch(changeStatusReady(1)));
    } catch (e: any) {
        console.log("🧲❌Ошибка при входе.", e);
        dispatch(setErrorDescription("Неверный логин или пароль, повторите попытку"));
    }
};
export const AuthMeThunk = () => async (dispatch: Dispatch) => {
    dispatch(changeStatusReady(0));
    try {
        await authApi.authMe()
            .then((resp) => {
                dispatch(logInAuth(resp.data, true));
            })
            .then(() => dispatch(changeStatusReady(1)));
    } catch (e: any) {
        console.log("🧲❌Ошибка при авторизации.", e.message);
        dispatch(setErrorDescription(e.message));
    }
}
export const logOutThunk = () => (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(logInAuth({}, false));
    dispatch(getUserTotalPosts(0));
    dispatch(getUserPagePosts([]));
    currentInstance();
};