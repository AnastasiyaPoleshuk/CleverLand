import { IGetBook, IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { GET_BOOK, GET_BOOKS } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: IGetBooks | IGetBook,
}

export const BooksReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case GET_BOOKS:
            return { ...state, books: action.payload, isLoading: false, isError: false };
        case GET_BOOK:
            return { ...state, book: action.payload, isLoading: false, isError: false };
        default:
            return state;
    }
};
