import React from 'react';
import {useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";
import {AuthForm} from "../../components/AuthForm";
import {useStore} from "../../store";
import {POST_PATH, REGISTRATION_PATH} from "../../routes/paths";

const Login = observer(() => {

    const navigate = useNavigate()

    const {userStore} = useStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const name = e.target.name
        const val = e.target.value

        userStore.setAuthParams({
            ...userStore.authParams,
            [name]: val
        })
    }

    const handleSubmit = async () => {
        try {
            if(!userStore.validateUserFields()){
                toast.error('Не валидные данные', {
                    toastId: 'CustomLoginToastId'
                })

                return
            }

            await userStore.login()
            navigate(`/${POST_PATH}`)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <AuthForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                text={'Войти'}
                linkText={'Регистрация'}
                linkHref={REGISTRATION_PATH}
            />
        </>
    );
});

export { Login };