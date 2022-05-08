import React from 'react';
import {useNavigate} from "react-router-dom";
import {useStore} from "../../store";
import {LOGIN_PATH} from "../../routes/paths";
import {AuthForm} from "../../components/AuthForm";
import {toast} from "react-toastify";

const Registration = () => {

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

            await userStore.registration()
            navigate(`${LOGIN_PATH}`)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <AuthForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                text={'Регистрация'}
                linkText={'Логин'}
                linkHref={LOGIN_PATH}
            />
        </>
    );
};

export { Registration };