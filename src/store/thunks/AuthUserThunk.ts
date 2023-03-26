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
        localStorage.setItem('cypressTestAuth', 'true');
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(IsAuthAction(false));
        localStorage.setItem('cypressTestAuth', 'false');
    }
    dispatch(LoadingAction(false));
};

