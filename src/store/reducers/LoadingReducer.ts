import { IStore } from '../../types/storeTypes';
import { IS_LOADING } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: boolean,
}

export const LoadingReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};
