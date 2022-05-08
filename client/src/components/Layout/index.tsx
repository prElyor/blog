import React from 'react';
import {Outlet} from 'react-router-dom'
import {Navbar} from "../Navbar";
import {styled} from "@mui/material";

const Main = styled('main')(() => ({
    maxWidth: '1300px',
    margin: '10px auto',
    width: '100%'
}))

const Layout = () => {
    return (
        <div>
           <header>
               <Navbar />
           </header>
            <Main>
                <Outlet />
            </Main>
            <footer></footer>
        </div>
    );
};

export { Layout };