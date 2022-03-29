import {instance} from "./index";
import {FormInput} from "../components/AuthModal/LogIn";

export const authApi = {
    registration(data: FormInput) {
        return instance
            .post('auth/register', data)
            .then((resp) => resp.data);
    },
    logIn(data: FormInput) {
        return instance
            .post('auth/login', data)
            .then((resp) => resp.data);
    },
    authMe() {
        return instance
            .get('auth/me')
            .then((resp) => resp);
    },
    getUserData() {
        return instance
            .get('/auth/me')
            .then((resp) => resp.data);
    }
}