import { ICommentsResponse } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { CREATE_COMMENT, CREATE_COMMENT_SUCCESS } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: ICommentsResponse,
}

export const CreateCommentsReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case CREATE_COMMENT:
            return { ...state, comments: action.payload, isError: false };
        case CREATE_COMMENT_SUCCESS:
            return { ...state, isCommentsSuccess: action.payload };
        default:
            return state;
    }
};
