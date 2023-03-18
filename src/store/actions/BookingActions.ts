import { IBookingResponse } from '../../types/apiTypes';
import { BOOKING, IS_BOOKING_SUCCESS } from '../actionTypes';

export const BookingAction = (payload: IBookingResponse) => ({ type: BOOKING, payload });

export const isBookingSuccessAction = (payload: boolean) => ({ type: IS_BOOKING_SUCCESS, payload });
