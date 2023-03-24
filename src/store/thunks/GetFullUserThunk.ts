import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { getUser } from '../../api/getUser';
import { IError, IFullUserResponse } from '../../types/apiTypes';
import { GetFullUserAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const GetFullUserThunk = () => async function (dispatch: Dispatch) {
    const response: { data: IFullUserResponse | IError, status: number }  = await getUser()

    if (response.status === StatusCodes.OK) {
        dispatch(GetFullUserAction(response.data as IFullUserResponse));
    } else {
        dispatch(ErrorAction(response.data as IError));
    }
};
