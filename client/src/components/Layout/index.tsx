import React from 'react';
import {Outlet} from 'react-router-dom'

const Layout = () => {
    return (
        <>
           <header>Header</header>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </>
    );
};

export { Layout };