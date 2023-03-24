import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { updateComment } from '../../api/updateComment';
import { ICommentsRequest, ICommentsResponse, IError } from '../../types/apiTypes';
import { AlertAction } from '../actions/AlertActions';
import { CreateCommentsAction, IsCommentsAction } from '../actions/CreateCommentsActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const UpdateCommentsThunk = (requestData: { request: ICommentsRequest, commentId: number }) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: ICommentsResponse | IError, status: number } = await updateComment(requestData);

    if (response.status === StatusCodes.OK) {
        dispatch(CreateCommentsAction(response.data as ICommentsResponse));
        dispatch(IsCommentsAction(true));
        dispatch(AlertAction({ isError: false, text: 'Спасибо, что нашли время изменить оценку!' }));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(IsCommentsAction(false));
        dispatch(AlertAction({ isError: true, text: 'Изменения не были сохранены. Попробуйте позже!' }));
    }
    dispatch(LoadingAction(false));
};
