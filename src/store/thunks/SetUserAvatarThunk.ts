import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { uploadAvatar } from '../../api/uploadAvatar';
import { IError } from '../../types/apiTypes';
import { AlertAction } from '../actions/AlertActions';
import { SetUserAvatarAction } from '../actions/AuthActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const SetUserAvatarThunk = (requestData: { files: File }) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: number | IError, status: number } = await uploadAvatar(requestData);

    if (response.status === StatusCodes.OK) {
        dispatch(SetUserAvatarAction(response.data as number));
        dispatch(AlertAction({ isError: false, text: 'Фото успешно сохранено!' }));

    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(AlertAction({ isError: true, text: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!' }));
    }

    dispatch(LoadingAction(false));
};
