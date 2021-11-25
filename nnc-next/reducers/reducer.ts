import { InitialStateType, ReducerAction, actionType } from "../types";

export const AppReducer = (
    state: InitialStateType,
    action: ReducerAction
) => {
    switch (action.type) {
        case actionType.CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            };
        default:
            return state;
    }
};
