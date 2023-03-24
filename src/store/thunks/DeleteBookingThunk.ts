import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { deleteBooking } from '../../api/deleteBooking';
import { IBookingResponse, IError } from '../../types/apiTypes';
import { AlertAction } from '../actions/AlertActions';
import { BookingAction, isBookingSuccessAction } from '../actions/BookingActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const DeleteBookingThunk = (bookingId: number) => async function (dispatch: Dispatch) {
    window.scrollTo({ top: 0 });
    dispatch(LoadingAction(true));
    const response: { data: IBookingResponse | IError, status: number } = await deleteBooking(bookingId)

    if (response.status === StatusCodes.OK) {
        dispatch(BookingAction(response.data as IBookingResponse));
        dispatch(isBookingSuccessAction(false));
        dispatch(AlertAction({ isError: false, text: 'Бронирование книги успешно отменено!' }));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(AlertAction({ isError: true, text: 'Не удалось снять бронирование книги. Попробуйте позже!' }));

    }
    dispatch(LoadingAction(false));
};

