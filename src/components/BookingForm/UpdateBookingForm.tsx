/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useState } from 'react';
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
import { IDay } from '../Calendar/components/Day';

import './BookingForm.scss';

interface IProps {
    bookId: number;
}

export const UpdateBookingForm = (props: IProps) => {
    const { bookId } = props;
    const dispatch = useDispatch();
    const { closeModal, bookId: ContextBookId } = useContext(AppContext);
    const [disabled, setDisabled] = useState(true);
    const [month, setMonth] = useState(moment());
    const [selected, setSelected] = useState(moment().startOf('day'));
    const user = useSelector((state: IStore) => state.user.user.user);
    const booking = useSelector((state: IStore) => state.booking.booking);

    const select = (day: IDay) => {
        if (moment(booking?.data.attributes.createdAt) === day.date) {
            setDisabled(true)
        }

        if (day.isToday || day.date.clone().subtract(1, 'd').date() === moment().date()) {
            setMonth(day.date.clone());
            setSelected(day.date);
            setDisabled(false)
        }
    }

    const onSubmit = () => {
        const requestData = {
            order: true,
            dateOrder: `${selected.toISOString()}`,
            book: `${bookId}`,
            customer: `${user.id}`
        }

        // @ts-ignore
        dispatch(UpdateBookingThunk({ requestData, bookingId: booking.id || 0 }) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.BOOKING_MODAL)
                ContextBookId ? dispatch(GetBooksThunk() as unknown as AnyAction) :
                    dispatch(GetBookThunk(bookId) as unknown as AnyAction)

            })
    }

    const deleteBooking = () => {
// @ts-ignore
        dispatch(DeleteBookingThunk(booking.id) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.BOOKING_MODAL)
                dispatch(GetBookThunk(bookId) as unknown as AnyAction)

            })
    }

    return (
        <div className="booking__box">
            <h3 className="booking__title" data-test-id='modal-title'>Изменение даты бронирования </h3>
            <Calendar
                setSelected={setSelected}
                selected={selected}
                setDisabled={setDisabled}
            />
            <button
                type="submit"
                className={`booking__btn ${disabled ? 'disabled' : ''}`}
                disabled={disabled}
                onClick={() => onSubmit()}
                data-test-id='booking-button'
            >
                забронировать
            </button>
            <button
                type="submit"
                className="booking__btn remove-booking"
                onClick={() => deleteBooking()}
                data-test-id='booking-cancel-button'
            >
                отменить бронь
            </button>
        </div>
    )
}
