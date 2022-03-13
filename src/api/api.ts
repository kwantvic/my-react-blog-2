import axios, {AxiosRequestHeaders, HeadersDefaults} from "axios";
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

export const authApi = {
    login(data: FormInput) {
        return instance
            .post(`auth/login`, data)
            .then((resp) => {
                return resp.data;
            });
    }
}