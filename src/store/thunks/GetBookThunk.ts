import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { getBook } from '../../api/getBook';
import { IError, IGetBook } from '../../types/apiTypes';
import { IGetBookResponse } from '../../types/storeTypes';
import { GetBookAction } from '../actions/BooksActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const GetBookThunk = (reqData: number) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: IGetBookResponse = await getBook(reqData)

    if (response.status === StatusCodes.OK) {
        dispatch(GetBookAction(response.data as IGetBook));
    } else {
        dispatch(ErrorAction(response.data as IError));
    }
    dispatch(LoadingAction(false));
};
