import { IAuthRequest, IRegistrationRequest,IUserResponse } from '../../types/apiTypes';
import {
    AUTH_USER,
    AUTH_USER_REQUEST,
    IS_AUTH,
    IS_CHANGE_PASSWORD_SUCCESS,
    IS_REGISTRATION,
    REGISTER_USER,
    REGISTER_USER_REQUEST,
    RESET_PASSWORD
} from '../actionTypes';

export const IsAuthAction = (payload: boolean) => ({ type: IS_AUTH, payload });

export const AuthAction = (payload: IUserResponse) => ({ type: AUTH_USER, payload });

export const RegisterAction = (payload: IUserResponse) => ({ type: REGISTER_USER, payload });

export const SetUserRegisterRequestAction = (payload: IRegistrationRequest) => ({ type: REGISTER_USER_REQUEST, payload });

export const SetUserAuthRequestAction = (payload: IAuthRequest) => ({ type: AUTH_USER_REQUEST, payload });

export const IsRegisterAction = (payload: boolean) => ({ type: IS_REGISTRATION, payload });

export const ResetPasswordAction = (payload: IUserResponse) => ({ type: RESET_PASSWORD, payload });

export const IsChangePasswordSuccessAction = (payload: boolean) => ({ type: IS_CHANGE_PASSWORD_SUCCESS, payload });
