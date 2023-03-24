import { IGetBook, IGetBooks } from '../../types/apiTypes';
import { GET_BOOK,GET_BOOKS } from '../actionTypes';

export const GetBooksAction = (payload: IGetBooks) => ({ type: GET_BOOKS, payload });

export const GetBookAction = (payload: IGetBook) => ({ type: GET_BOOK, payload });
