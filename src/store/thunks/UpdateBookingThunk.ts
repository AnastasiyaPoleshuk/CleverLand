import { Dispatch } from 'redux';
import StatusCodes from 'http-status-codes';

import { booking } from '../../api/booking';
import { updateBooking } from '../../api/updateBooking';
import { IBookingRequestData, IBookingResponse, IError } from '../../types/apiTypes';
import { AlertAction } from '../actions/AlertActions';
import { BookingAction, isBookingSuccessAction } from '../actions/BookingActions';
import { ErrorAction } from '../actions/ErrorAction';
import { LoadingAction } from '../actions/LoadingAction';

export const UpdateBookingThunk = ({ requestData, bookingId }: { requestData: IBookingRequestData, bookingId: number }) => async function (dispatch: Dispatch) {

    dispatch(LoadingAction(true));
    const response: { data: IBookingResponse | IError, status: number } = await updateBooking({ requestData, bookingId })

    if (response.status === StatusCodes.OK) {
        dispatch(BookingAction(response.data as IBookingResponse));
        dispatch(isBookingSuccessAction(true));
        dispatch(AlertAction({ isError: false, text: 'Бронирование новой даты успешно изменено. Подробности можно посмотреть на странице Профиль' }));
    } else {
        dispatch(ErrorAction(response.data as IError));
        dispatch(isBookingSuccessAction(false));
        dispatch(AlertAction({ isError: true, text: 'Что-то пошло не так, дату бронирования не удалось изменить. Попробуйте позже!' }));
    }
    dispatch(LoadingAction(false));
};
