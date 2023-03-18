import { ICategories } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { GET_CATEGORIES } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: ICategories,
}

export const CategoriesReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return { ...state, categories: action.payload, isLoading: false, isError: false };
        default:
            return state;
    }
};
