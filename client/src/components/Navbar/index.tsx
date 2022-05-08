import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {styled} from "@mui/material";
import {LOGIN_PATH, MY_POSTS_PATH, POST_PATH} from "../../routes/paths";
import {useStore} from "../../store";

const Wrapper = styled('ul')(() => ({
    background: '#7186ff',
    height: '60px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'fixed',
    zIndex: 15
}))

const Item = styled('li')(() => ({
    paddingRight: '20px'
}))

const CustomLink = styled(Link)(() => ({
    color: '#fff'
}))

const CustomBtn = styled('span')(() => ({
    color: '#fff',
    cursor: 'pointer'
}))


const Navbar = () => {

    const navigate = useNavigate()

    const {userStore} = useStore()

    const handleLogout = () => {
        userStore.logout()

        navigate(LOGIN_PATH)
    }

    return (
        <Wrapper>
            <Item>
                <CustomLink to={POST_PATH}>
                    Блоги
                </CustomLink>
            </Item>
            <Item>
                <CustomLink to={MY_POSTS_PATH}>
                    Мои посты
                </CustomLink>
            </Item>
            <Item>
                <CustomBtn onClick={handleLogout}>
                    Выйти
                </CustomBtn>
            </Item>

        </Wrapper>
    );
};

export { Navbar };