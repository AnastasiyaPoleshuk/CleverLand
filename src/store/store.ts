import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
}
  from 'redux';
import thunk from 'redux-thunk';

import { AlertReducer } from './reducers/AlertReducer';
import { BookingReducer } from './reducers/BookingReducer';
import { BooksReducer } from './reducers/BooksReducer';
import { CategoriesReducer } from './reducers/CategoriesReducer';
import { CreateCommentsReducer } from './reducers/CreateCommentsReducer';
import { ErrorReducer } from './reducers/ErrorReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { SendEmailReducer } from './reducers/SendEmailReducer';
import { UserReducer } from './reducers/UserReducer';

const rootReducer = combineReducers({
    books: BooksReducer,
    book: BooksReducer,
    error: ErrorReducer,
    categories: CategoriesReducer,
    user: UserReducer,
    fullUser: UserReducer,
    avatar: UserReducer,
    isAuth: UserReducer,
    isRegistration: UserReducer,
    isLoading: LoadingReducer,
    isError: ErrorReducer,
    SendEmailSuccess: SendEmailReducer,
    registrationRequest: UserReducer,
    isChangePasswordSuccess: UserReducer,
    isCommentsSuccess: CreateCommentsReducer,
    comments: CreateCommentsReducer,
    authRequest: UserReducer,
    booking: BookingReducer,
    isBookingSuccess: BookingReducer,
    alert: AlertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware<object, RootState>(thunk));
