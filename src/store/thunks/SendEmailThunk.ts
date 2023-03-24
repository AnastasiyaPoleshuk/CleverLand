import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { sendEmail } from '../../api/sendEmail';
import { IError, ISendEmailResponse } from '../../types/apiTypes';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';
import { SendEmailAction } from '../actions/SendEmailAction';

export const SendEmailThunk = (requestData: string) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: { data: ISendEmailResponse | IError, status: number } = await sendEmail(requestData);

    if (response.status === StatusCodes.OK) {
        dispatch(SendEmailAction({ ok: true } as ISendEmailResponse));
        dispatch(LoadingAction(false));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(LoadingAction(false));
    }

};
