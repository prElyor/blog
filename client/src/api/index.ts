import {InstanceAuth} from "./instance";
import {IAuthParams} from "../models/user.model";

// Authentication
export const apiAuthRegistration = (params: IAuthParams) => InstanceAuth.post(`/auth/registration`, params)
export const apiAuthLogin = (params: IAuthParams) => InstanceAuth.post(`/auth/login`, params)