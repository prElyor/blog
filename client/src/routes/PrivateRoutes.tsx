import React from 'react';
import {observer} from "mobx-react-lite";
import {Outlet, Navigate} from 'react-router-dom'
import {useStore} from "../store";
import {LOGIN_PATH} from "./paths";

const PrivateRoutes = observer(() => {
    const {userStore} = useStore()

    return (
       userStore.token ?
           <Outlet />
           :
           <Navigate to={LOGIN_PATH} />
    );
});

export { PrivateRoutes};