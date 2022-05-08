export interface UserModel {
    _id: string
    username: string
    email: string
}

export interface IAuthParams {
    username: string
    email: string
    password: string
}