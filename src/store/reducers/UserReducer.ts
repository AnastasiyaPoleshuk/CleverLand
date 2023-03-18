import { IUserResponse } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { AUTH_USER, AUTH_USER_REQUEST, IS_AUTH, IS_CHANGE_PASSWORD_SUCCESS, IS_REGISTRATION,REGISTER_USER, REGISTER_USER_REQUEST, RESET_PASSWORD } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: IUserResponse | boolean,
}

export const UserReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                user: action.payload,
                isError: false,
            };
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                isError: false,
            };
        case RESET_PASSWORD:
            return {
                ...state,
                user: action.payload,
                isError: false,
            };
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                registrationRequest: action.payload,
                isLoading: false,
                isError: false,
            };
        case AUTH_USER_REQUEST:
            return {
                ...state,
                authRequest: action.payload,
                isLoading: false,
                isError: false,
            };
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.payload,
            };
        case IS_REGISTRATION:
            return {
                ...state,
                isRegistration: action.payload,
            };
        case IS_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isChangePasswordSuccess: action.payload,
            };
        default:
            return state;
    }
};
