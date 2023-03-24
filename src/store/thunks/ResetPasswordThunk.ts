import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { resetPassword } from '../../api/resetPassword';
import { IError, IResetPasswordRequest, IUserResponse } from '../../types/apiTypes';
import { IsChangePasswordSuccessAction, ResetPasswordAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const ResetPasswordThunk = (requestData: IResetPasswordRequest) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: IUserResponse | IError, status: number } = await resetPassword(requestData);

    if (response.status === StatusCodes.OK) {
        dispatch(ResetPasswordAction(response.data as IUserResponse));
        dispatch(IsChangePasswordSuccessAction(true));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(IsChangePasswordSuccessAction(false));
    }
    dispatch(LoadingAction(false));
};
