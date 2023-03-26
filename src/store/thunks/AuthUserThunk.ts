import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { authUser } from '../../api/authUser';
import { IAuthRequest, IError, IUserResponse } from '../../types/apiTypes';
import { AuthAction, IsAuthAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const AuthUserThunk = (requestData: IAuthRequest) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: IUserResponse | IError, status: number } = await authUser(requestData);

    if (response.status === StatusCodes.OK) {
        dispatch(AuthAction(response.data as IUserResponse));
        dispatch(IsAuthAction(true));
        const token = response.data as IUserResponse;

        localStorage.setItem('cypressTestAuthToken', token.jwt as string);
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(IsAuthAction(false));
    }
    dispatch(LoadingAction(false));
};

