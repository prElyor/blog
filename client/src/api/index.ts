import {Instance, InstanceAuth, InstanceUpload} from "./instance";
import {IAuthParams} from "../models/user.model";
import {PostModelCreate, PostModelQueryParams, PostModelUpdate} from "../models/post.model";

// Authentication
export const apiAuthRegistration = (params: IAuthParams) => InstanceAuth.post(`/auth/registration`, params)
export const apiAuthLogin = (params: IAuthParams) => InstanceAuth.post(`/auth/login`, params)

// Posts
export const apiGetPosts = (params: PostModelQueryParams) => Instance.get(`/post`, {params})
export const apiGetPostById = (id: string) => Instance.get(`/post/${id}`)
export const apiCreatePost = (params: PostModelCreate) => InstanceUpload.post(`/post`, params)
export const apiUpdatePost = (params: PostModelUpdate) => InstanceUpload.put(`/post`, params)
export const apiDeletePost = (id: string) => Instance.delete(`/post/${id}`)