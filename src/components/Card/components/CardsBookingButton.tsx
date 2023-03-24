import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';

import { AppContext } from '../../../context/AppContext';
import { DeleteBookingThunk } from '../../../store/thunks/DeleteBookingThunk';
import { GetBooksThunk } from '../../../store/thunks/GetBooksThunk';
import { GetBookThunk } from '../../../store/thunks/GetBookThunk';
import { CONSTANTS } from '../../../utils/constants';

interface IProps {
    bookingId: number,
    bookId: number,
}

export const CardsBookingButton = (props: IProps) => {
    const { bookingId, bookId } = props;
    const dispatch = useDispatch();
    const { closeModal } = useContext(AppContext);

    const deleteBooking = (e: MouseEvent) => {
        e.stopPropagation();

        dispatch(DeleteBookingThunk(bookingId) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.BOOKING_MODAL);
                dispatch(GetBookThunk(bookId) as unknown as AnyAction);
                dispatch(GetBooksThunk() as unknown as AnyAction);

            })
    }

    return (
        <button
            type="button"
            className="list-item__btn"
            onClick={(e) => deleteBooking(e as unknown as MouseEvent)}
            data-test-id='cancel-booking-button'
        >
            Отменить бронь
        </button>
    )
}
