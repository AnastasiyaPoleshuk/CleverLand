import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import moment from 'moment';

import { AppContext } from '../../context/AppContext';
import { BookingThunk } from '../../store/thunks/BookingThunk';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { Calendar } from '../Calendar/Calendar';

import './BookingForm.scss';

interface IProps {
    bookId: number;
}

export const BookingForm = (props: IProps) => {
    const { bookId } = props;
    const dispatch = useDispatch();
    const { closeModal, bookId: ContextBookId } = useContext(AppContext);
    const [disabled, setDisabled] = useState(true);
    const [selected, setSelected] = useState(moment().startOf('day'));
    const user = useSelector((state: IStore) => state.user.user.user);

    const onSubmit = () => {
        const requestData = {
            order: true,
            dateOrder: `${selected.add(3, 'h').toISOString()}`,
            book: `${bookId}`,
            customer: `${user.id}`
        }

        dispatch(BookingThunk(requestData) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.BOOKING_MODAL)
                ContextBookId ? dispatch(GetBooksThunk() as unknown as AnyAction) :
                    dispatch(GetBookThunk(bookId) as unknown as AnyAction)

            })
    }

    return (
        <div className="booking__box">
            <h3 className="booking__title" data-test-id='modal-title'>Выбор даты бронирования</h3>
            <button type='button' className="modal-window__close-btn" onClick={() => closeModal(CONSTANTS.BOOKING_MODAL)} data-test-id='modal-close-button' />
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
        </div>
    )
}
