import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { getCategories } from '../../api/getCategories';
import { ICategories, IError } from '../../types/apiTypes';
import { ICategoriesResponse } from '../../types/storeTypes';
import { CategoriesActions } from '../actions/CategoriesActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const GetCategoriesThunk = (jwt: string) => async function (dispatch: Dispatch) {
    dispatch(LoadingAction(true));
    const response: ICategoriesResponse = await getCategories(jwt);

    if (response.status === StatusCodes.OK) {
        dispatch(CategoriesActions(response.data as ICategories));
    } else {
        dispatch(ErrorAction(response.data as IError));
    }
  };
