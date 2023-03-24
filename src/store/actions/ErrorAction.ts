import { IError } from '../../types/apiTypes';
import { ERROR, IS_ERROR } from '../actionTypes';

export const ErrorAction = (payload: IError) => ({ type: ERROR, payload });
export const isErrorAction = (payload: boolean) => ({ type: IS_ERROR, payload });
