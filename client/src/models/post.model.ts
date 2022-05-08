import {UserModel} from "./user.model";

export interface PostModel {
    _id: string
    createDate: string
    updatedDate: string
    body: string
    author: UserModel
    authorId: string
    media: any
    mediaId: string
    resourceType: string
}

export interface PostModelQueryParams {
    userId?: string
}

export interface PostModelCreate {
    body: string
    media?: any
}

export interface PostModelUpdate extends PostModelCreate{
    id: string
}