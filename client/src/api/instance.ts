import axios, {AxiosRequestConfig} from 'axios'
import {toast} from "react-toastify";

export const baseURL = process.env.REACT_APP_ENV === 'development'
    ?
    process.env.REACT_APP_DEV_API_URL
    :
    process.env.REACT_APP_PROD_API_URL


export const Instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    // mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
});


export const InstanceAuth = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    // mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
});

export const InstanceUpload = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    // mode: 'cors',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    },
});

export const InstanceDownloadFiles = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    // mode: 'cors',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    },
    responseType: 'blob'
});

InstanceAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Xatolik', {
            toastId: 'AuthResReqError'
        })
        return Promise.reject(error);
    },
);


// Request interceptor for API UPLOAD calls
InstanceUpload.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = await localStorage.getItem('token');
        if (config.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Xatolik', {
            toastId: 'UploadReqError'
        })
        return Promise.reject(error);
    },
);

// Response interceptor for API UPLOAD calls
InstanceUpload.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // localStorage.removeItem('token');
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Xatolik', {
            toastId: 'UploadError'
        })
        return Promise.reject(error);
    },
);

// Request interceptor for API UploadFiles calls
InstanceDownloadFiles.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = await localStorage.getItem('token');
        if (config.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Xatolik', {
            toastId: 'DownloadError'
        })
        return Promise.reject(error);
    },
);

// Response interceptor for API UploadFiles calls
InstanceDownloadFiles.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Xatolik', {
            toastId: 'DownloadResError'
        })
        return Promise.reject(error);
    },
);

// Request interceptor for API calls
Instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = await localStorage.getItem('token');
        if (config.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Xatolik', {
            toastId: 'ReqError'
        })
        return Promise.reject(error);
    },
);

// Response interceptor for API calls
Instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if ((error.response.status === 401 || error.response.status === 403) && (typeof originalRequest._retry === 'undefined' || !originalRequest._retry)) {
            localStorage.clear()
            window.location.replace('/')
        }

        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Xatolik', {
            toastId: 'ResError'
        })
        return Promise.reject(error.response);
    },
)