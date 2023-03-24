import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import moment from 'moment';

import { AppContext } from '../../context/AppContext';
import { DeleteBookingThunk } from '../../store/thunks/DeleteBookingThunk';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { UpdateBookingThunk } from '../../store/thunks/UpdateBookingThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { Calendar } from '../Calendar/Calendar';

import './BookingForm.scss';

interface IProps {
    bookId: number;
}

export const UpdateBookingForm = (props: IProps) => {
    const { bookId } = props;
    const dispatch = useDispatch();
    const { closeModal, bookId: ContextBookId } = useContext(AppContext);
    const { books } = useSelector((state: IStore) => state.books);
    const { booking } = useSelector((state: IStore) => state.booking);
    const { user } = useSelector((state: IStore) => state.user.user);
    const [selected, setSelected] = useState(moment().startOf('day'));
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const bookBooked = books.find(({ id }) => id === bookId);

        if (bookBooked?.booking) {
            setSelected(selected.set('date', moment(bookBooked?.booking.dateOrder).date()))
        }
    }, [bookId])


    const onSubmit = () => {

        const requestData = {
            order: true,
            dateOrder: `${selected.add(3, 'h').toISOString()}`,
            book: `${bookId}`,
            customer: `${user.id}`
        }

        dispatch(UpdateBookingThunk({ requestData, bookingId: booking.id || 0 }) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.BOOKING_MODAL)
                ContextBookId ? dispatch(GetBooksThunk() as unknown as AnyAction) :
                    dispatch(GetBookThunk(bookId) as unknown as AnyAction)

            })
    }

    const deleteBooking = () => {
        dispatch(DeleteBookingThunk(booking.id) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.BOOKING_MODAL)
                dispatch(GetBookThunk(bookId) as unknown as AnyAction)
                dispatch(GetBooksThunk() as unknown as AnyAction)

            })
    }

    return (
        <div className="booking__box">
            <h3 className="booking__title" data-test-id='modal-title'>Изменение даты бронирования </h3>
            <button
                type='button'
                className="modal-window__close-btn"
                onClick={() => closeModal(CONSTANTS.BOOKING_MODAL)}
                data-test-id='modal-close-button'
            />
            <Calendar
                hasBooking={true}
                setSelected={setSelected}
                selected={selected}
                setDisabled={setDisabled}
            />
            <button
                type="submit"
                className={`booking__btn ${disabled ? 'disabled' : ''}`}
                disabled={disabled}
                onClick={onSubmit}
                data-test-id='booking-button'
            >
                забронировать
            </button>
            <button
                type="submit"
                className="booking__btn remove-booking"
                onClick={deleteBooking}
                data-test-id='booking-cancel-button'
            >
                отменить бронь
            </button>
        </div>
    )
}
