import { createContext } from "react";
import { InitialStateType } from "../types";

const initialState = {
    currentCategory: null,
    state: {},
    dispatch: () => {},
};

export const AppContext = createContext<InitialStateType>(initialState);
