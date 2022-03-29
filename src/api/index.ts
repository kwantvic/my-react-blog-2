import axios, {AxiosRequestHeaders} from "axios";

interface HeadersProperties extends AxiosRequestHeaders {
    Authorization: string;
}

export let instance = axios.create({
    baseURL: "http://localhost:5656",
    headers: {
        Authorization: localStorage.getItem("token")
    } as HeadersProperties
});

export function currentInstance() {
    instance = axios.create({
        baseURL: "http://localhost:5656",
        headers: {
            Authorization: localStorage.getItem("token")
        } as HeadersProperties
    });
}