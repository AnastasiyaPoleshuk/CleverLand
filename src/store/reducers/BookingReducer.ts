import { IBookingResponse } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { BOOKING,IS_BOOKING_SUCCESS } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
    type: string,
    payload: IBookingResponse | boolean,
}

export const BookingReducer = (state = initialState as unknown as IStore, action: IAction) => {
    switch (action.type) {
        case BOOKING:
            return { ...state, booking: action.payload, isError: false, isLoading: false, };
        case IS_BOOKING_SUCCESS:
            return { ...state, isBookingSuccess: action.payload, isError: false, isLoading: false, };
        default:
            return state;
    }
};
