import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { booking } from '../../api/booking';
import { updateBooking } from '../../api/updateBooking';
import { IBookingRequestData, IBookingResponse, IError } from '../../types/apiTypes';
import { AlertAction } from '../actions/AlertActions';
import { BookingAction, isBookingSuccessAction } from '../actions/BookingActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const BookingThunk = (requestData: IBookingRequestData) => async function (dispatch: Dispatch) {

    dispatch(LoadingAction(true));
    const response: { data: IBookingResponse | IError, status: number } = await booking(requestData)

    if (response.status === StatusCodes.OK) {
        dispatch(BookingAction(response.data as IBookingResponse));
        dispatch(isBookingSuccessAction(true));
        dispatch(AlertAction({ isError: false, text: 'Книга забронирована. Подробности можно посмотреть на странице Профиль' }));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(isBookingSuccessAction(false));
        dispatch(AlertAction({ isError: true, text: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!' }));
    }
    dispatch(LoadingAction(false));
};
