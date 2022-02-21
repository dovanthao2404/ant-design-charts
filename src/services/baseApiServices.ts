import axios from "axios";
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { DOMAIN, TOKEN_CLASS } from "../utils/config/setting";

const api = axios.create({
    baseURL: DOMAIN,
});


const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers = {
        ...config.headers,
        "TokenCybersoft": TOKEN_CLASS
    };
    return config;
};


const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};



const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};


api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);

export default api;