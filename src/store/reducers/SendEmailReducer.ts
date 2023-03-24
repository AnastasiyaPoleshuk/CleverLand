import { ISendEmailResponse } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { SEND_EMAIL_SUCCESS } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: ISendEmailResponse,
}

export const SendEmailReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case SEND_EMAIL_SUCCESS:
            return { ...state, SendEmailSuccess: action.payload.ok };
        default:
            return state;
    }
};
