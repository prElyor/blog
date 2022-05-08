import React from "react";
import {ValidationClass} from "../helpers/validation.helper";
import {UserStore} from "./all/user.store";

const validation = new ValidationClass()
const userStore = new UserStore(validation)

export const StoresContext = React.createContext({
    userStore
});

export const useStore = () => React.useContext(StoresContext);