import { IAuthRequest, IBookingResponse, ICategories, ICommentsResponse, IError, IGetBook, IGetBooks, IRegistrationRequest, IUserResponse } from './apiTypes';

export interface IStore {
    books: {
        books: IGetBooks[],
    },
    book: {
        book: IGetBook,
    },
    error: {
        error: IError,
    },
    categories: {
        categories: ICategories[],
    },
    user: {
        user: IUserResponse,
    },
    isAuth: {
        isAuth: boolean,
    },
    isRegistration: {
        isRegistration: boolean,
    },
    registrationRequest: {
        registrationRequest: IRegistrationRequest,
    },
    authRequest: {
        authRequest: IAuthRequest,
    },
    isLoading: {
        isLoading: boolean,
    },
    isError: {
        isError: boolean,
    },
    SendEmailSuccess: {
        SendEmailSuccess: boolean,
    },
    isChangePasswordSuccess: {
        isChangePasswordSuccess: boolean,
    },
    isCommentsSuccess: {
        isCommentsSuccess: boolean,
    },
    isBookingSuccess: {
        isBookingSuccess: boolean,
    },
    comments: {
        comments: ICommentsResponse,
    },
    booking: {
        booking: IBookingResponse,
    },
    alert: {
        alert: IAlert,
    },
}

export interface IGetBooksResponse {
    data: IGetBooks | IError;
    status: number;
}

export interface IGetBookResponse {
    data: IGetBook | IError;
    status: number;
}

export interface ICategoriesResponse {
    data: ICategories | IError;
    status: number;
}

export interface ISetError {
    data: IError;
    isError: boolean;
}

export interface IAlert {
    isError: boolean;
    text: string
}



