import {UserModel} from "./user.model";

export interface PostModel {
    _id: string
    createDate: string
    updatedDate: string
    body: string
    author: UserModel
    authorId: string
    media: string
    mediaId: string
    resourceType: string
}