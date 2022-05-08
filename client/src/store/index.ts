import React from "react";
import {ValidationClass} from "../helpers/validation.helper";
import {UserStore} from "./all/user.store";
import {PostStore} from "./all/post.store";

const validation = new ValidationClass()

const userStore = new UserStore(validation)
const postStore = new PostStore()

export const StoresContext = React.createContext({
    userStore,
    postStore
});

export const useStore = () => React.useContext(StoresContext);