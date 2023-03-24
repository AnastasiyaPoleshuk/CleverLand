import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { updateUser } from '../../api/updateUser';
import { IError, IFullUserResponse, IUpdateUserRequest } from '../../types/apiTypes';
import { AlertAction } from '../actions/AlertActions';
import { GetFullUserAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const UpdateUserThunk = ({ requestData, userId }: { requestData: IUpdateUserRequest, userId: number }) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: IFullUserResponse | IError, status: number } = await updateUser({ requestData, userId })

    if (response.status === StatusCodes.OK) {
        dispatch(GetFullUserAction(response.data as IFullUserResponse));
        dispatch(AlertAction({ isError: false, text: 'Изменения успешно сохранены!' }));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(AlertAction({ isError: true, text: 'Изменения не были сохранены. Попробуйте позже!' }));
    }
    dispatch(LoadingAction(false));
};
