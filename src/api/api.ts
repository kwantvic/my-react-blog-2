import axios, {AxiosRequestHeaders} from "axios";
import {FormInput} from "../components/AuthModal/LogIn";

interface HeadersProperties extends AxiosRequestHeaders {
    Authorization: string;
}

let instance = axios.create({
    baseURL: "http://localhost:5656",
    headers: {
        Authorization: localStorage.getItem("token")
    } as HeadersProperties
});
export function currentInstance() {
    instance = axios.create({
        baseURL: "http://localhost:5656",
        headers: { Authorization: localStorage.getItem("token")
        } as HeadersProperties
    });
}

export const authApi = {
    registration(data: FormInput) {
        return instance
            .post('auth/register', data)
            .then((resp) => {
                return resp.data;
            })
    },
    logIn(data: FormInput) {
        return instance
            .post('auth/login', data)
            .then((resp) => {
                return resp.data;
            })
    },
    authMe() {
        return instance
            .get('auth/me')
            .then((resp) => {
                return resp;
            })
    },
    getUserData() {
        return instance
            .get('/auth/me')
            .then((resp) => {
                return resp.data;
            })
    }
}
export const postsApi = {
    getUserPagePosts(currentPage: number, pageSize: number, id: string | undefined) {
        return instance
            .get(`posts?userId=${id}&page=${currentPage}&limit=${pageSize}`)
            .then((resp) => {
                return resp.data;
            })
    }
}