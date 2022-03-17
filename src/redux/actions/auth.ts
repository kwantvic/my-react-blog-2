import {Dispatch} from "redux";

import {UserParams} from "../reducers/auth";
import {FormInput} from "../../components/AuthModal/LogIn";
import {authApi, currentInstance} from "../../api/api";

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
export const setErrorDescription = (errorDescription: string) => ({
    type: "SET_ERROR_DESCRIPTION",
    payload: {
        errorDescription
    }
})

export const registrationThunk = (data: FormInput) => async (dispatch: Dispatch) => {
    try {
        await authApi.registration(data)
            .then((resp) => {
                localStorage.setItem('token', resp.token);
                dispatch(logInAuth(resp, true));
                currentInstance();
            })
    } catch (e: any) {
        console.log("🧲❌Ошибка при регистрации🥺", e.response.data.error);
        dispatch(setErrorDescription(e.response.data.error));
    }
}
export const logInThunk = (data: FormInput) => async (dispatch: Dispatch) => {
    try {
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
                        console.log("🧲❌Ошибка при загрузке данных пользователя🥺", e.response.data.error);
                        dispatch(setErrorDescription("Ошибка при загрузке данных пользователя, повторите попытку"));
                    }
                })
            )
    } catch (e: any) {
        console.log("🧲❌Ошибка при входе🥺", e);
        dispatch(setErrorDescription("Неверный логин или пароль, повторите попытку"));
    }
};
export const AuthMeThunk = () => async (dispatch: Dispatch) => {
    try {
        await authApi.authMe()
            .then((resp) => {
                dispatch(logInAuth(resp.data, true));
            })
    } catch (e: any) {
        console.log("🧲❌Ошибка при авторизации🥺", e.message);
        dispatch(setErrorDescription(e.message));
    }
}
export const logOutThunk = () => (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(logInAuth({}, false));
    currentInstance();
};