import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { updateUser } from '../../api/updateUser';
import { IError, IFullUserResponse, IUpdateUserRequest } from '../../types/apiTypes';
import { AlertAction } from '../actions/AlertActions';
import { GetFullUserAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

interface IData { 
    requestData: IUpdateUserRequest, 
    userId: number, 
    message: {
        success: string,
        fail: string
    } 
}

export const UpdateUserThunk = ({ requestData, userId, message }: IData) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: IFullUserResponse | IError, status: number } = await updateUser({ requestData, userId })

    if (response.status === StatusCodes.OK) {
        dispatch(GetFullUserAction(response.data as IFullUserResponse));
        dispatch(AlertAction({ isError: false, text: message.success }));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(AlertAction({ isError: true, text: message.fail }));
    }
    dispatch(LoadingAction(false));
};
