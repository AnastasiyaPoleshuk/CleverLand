import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { getCategories } from '../../api/getCategories';
import { ICategories, IError } from '../../types/apiTypes';
import { ICategoriesResponse } from '../../types/storeTypes';
import { AlertAction } from '../actions/AlertActions';
import { CategoriesActions } from '../actions/CategoriesActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const GetCategoriesThunk = () => async function (dispatch: Dispatch) {
    const response: ICategoriesResponse = await getCategories();

    if (response.status === StatusCodes.OK) {
        dispatch(CategoriesActions(response.data as ICategories));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(AlertAction({ isError: true, text: 'Что-то пошло не так. Обновите страницу через некоторое время.' }));
    }
};
