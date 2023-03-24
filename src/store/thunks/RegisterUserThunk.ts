import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { registerUser } from '../../api/registerUser';
import { IError, IRegistrationRequest, IUserResponse } from '../../types/apiTypes';
import { IsRegisterAction, RegisterAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const RegisterUserThunk = (requestData: IRegistrationRequest) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: IUserResponse | IError, status: number } = await registerUser(requestData);

    if (response.status === StatusCodes.OK) {
        dispatch(RegisterAction(response.data as IUserResponse));
        dispatch(IsRegisterAction(true));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(IsRegisterAction(false));
    }
    dispatch(LoadingAction(false));
};
