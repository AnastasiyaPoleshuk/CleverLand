/* eslint-disable func-names */
import { Action, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import StatusCodes from 'http-status-codes';

import { getBooks } from '../../api/getBooks';
import { IError, IGetBooks } from '../../types/apiTypes';
import { IGetBooksResponse } from '../../types/storeTypes';
import { GetBooksAction } from '../actions/BooksActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';
import { RootState } from '../store';

// export const GetBooksThunk = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async function (dispatch: Dispatch<AnyAction>) {
export const GetBooksThunk = () => async function (dispatch: Dispatch<AnyAction>) {
    dispatch(LoadingAction(true));
    const response: IGetBooksResponse = await getBooks();

    if (response.status === StatusCodes.OK) {
        dispatch(GetBooksAction(response.data as IGetBooks));
    } else {
        dispatch(ErrorAction(response.data as IError));
    }
    dispatch(LoadingAction(false));
};
