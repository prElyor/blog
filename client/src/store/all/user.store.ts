import {makeAutoObservable, runInAction} from "mobx";
import {IAuthParams, UserModel} from "../../models/user.model";
import {ValidationClass} from "../../helpers/validation.helper";
import {apiAuthLogin, apiAuthRegistration} from "../../api";

const initial: UserModel = {
    _id: '',
    username: '',
    email: ''
}

export class UserStore {

    currentUser: UserModel = JSON.parse(localStorage.getItem('currentUser') || JSON.stringify(initial))

    authParams: IAuthParams = {
        username: '',
        email: '',
        password: ''
    }

    validationError: boolean = false

    token: string  = localStorage.getItem('token') || ''

    constructor(private readonly validation: ValidationClass) {
        makeAutoObservable(this)
    }

    setAuthParams (params: IAuthParams) {
        this.authParams = params
    }

    setValidationError (error: boolean) {
        this.validationError = error
    }

    validateUserFields (): boolean {
        this.validationError =  (
            this.validation.email(this.authParams.email)
            &&
            this.validation.password(this.authParams.password)
            &&
            this.validation.username(this.authParams.username)
        )

        console.log(this.validationError, this.validation.email(this.authParams.email))

        return this.validationError
    }

    async login () {
        try {
            if(!this.validationError){
                return
            }

            const response = await apiAuthLogin(this.authParams)

            runInAction(() => {
                this.currentUser = response.data.user
                this.token = response.data.token

                localStorage.setItem('currentUser', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.token)

            })

            return Promise.resolve(response)
        }catch (e) {
            return Promise.reject(e)
        }
    }

    async registration () {
        try {
            if (!this.validationError) {
                return
            }

            const response = await apiAuthRegistration(this.authParams)

            return Promise.resolve(response)

        }catch (e) {
            return Promise.reject(e)
        }
    }

    logout () {
        this.currentUser = {...initial}
        this.token = ''

        localStorage.clear()
    }

}