import { IAlert, IStore } from '../../types/storeTypes';
import { SET_ALERT_DATA } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: IAlert,
}

export const AlertReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case SET_ALERT_DATA:
            return { ...state, alert: action.payload };
        default:
            return state;
    }
};
