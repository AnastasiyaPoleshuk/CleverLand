import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { getBooks } from '../../api/getBooks';
import { IError, IGetBooks } from '../../types/apiTypes';
import { IGetBooksResponse } from '../../types/storeTypes';
import { GetBooksAction } from '../actions/BooksActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const GetBooksThunk = () => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: IGetBooksResponse = await getBooks();

    if (response.status === StatusCodes.OK) {
        dispatch(GetBooksAction(response.data as IGetBooks));
    } else {
        dispatch(ErrorAction(response.data as IError));
    }
    dispatch(LoadingAction(false));
};
