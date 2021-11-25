export type TPost = {
    category: {
        name: string;
    };
};

export type TCategory = {
    category: {
        id: string;
        slug: string;
        avatar: any;
        name: string;
    };
    onFilter:  (e:any, category:any) => void;
    clrChange: boolean;
};

export type InitialStateType = {
    dispatch: any;
    state: any;
    currentCategory?: TCategory;
};

export enum actionType {
    CURRENT_CATEGORY
}

export interface ReducerAction {
    type: actionType;
    payload: any;
}
