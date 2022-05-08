import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {CREATE_UPDATE_POST_PATH, LOGIN_PATH, POST_PATH, REGISTRATION_PATH} from "./routes/paths";
import {Registration} from "./pages/Registration";
import {Login} from "./pages/Login";
import {PrivateRoutes} from "./routes/PrivateRoutes";
import {Layout} from "./components/Layout";
import {Posts} from "./pages/Posts";
import {CreateUpdatePost} from "./pages/Posts/CreateUpdate";

function App() {
    return (
        <Routes>
            <Route path={REGISTRATION_PATH} element={<Registration/>}/>
            <Route path={LOGIN_PATH} element={<Login/>}/>
            <Route element={<PrivateRoutes />}>
                <Route element={<Layout />}>
                    <Route path={''} element={<Navigate to={POST_PATH} />} />
                    <Route path={POST_PATH} element={<Posts/>}/>
                    <Route path={CREATE_UPDATE_POST_PATH} element={<CreateUpdatePost/>}/>
                </Route>
            </Route>
            <Route path={'*'} element={<Navigate to={'/'} />} />
        </Routes>
    );
}

export default App;
