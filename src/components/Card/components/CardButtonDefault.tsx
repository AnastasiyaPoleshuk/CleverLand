import { useContext } from 'react';
import moment from 'moment';

import { AppContext } from '../../../context/AppContext';
import { IBooking, IDelivery } from '../../../types/apiTypes';
import { CONSTANTS } from '../../../utils/constants';

interface IProps {
    // isList: boolean,
    delivery: IDelivery,
    booking: IBooking,
    userId: number,
    cardId: number,
}


export const CardButtonDefault = (props: IProps) => {
    const { delivery, booking, userId, cardId } = props;
    const { isList, openModal, setIdForBooking } = useContext(AppContext);
    console.log(isList);

    const openBookingForm = (e: MouseEvent) => {
        e.stopPropagation();
        setIdForBooking(cardId);
        openModal(CONSTANTS.BOOKING_MODAL);
    };

    return (
        <button
            type='submit'
            className={
                `${isList ? 'list-item__btn' : 'card__btn'} ${delivery ? 'busy' : booking ? booking.customerId === userId ? 'booked-user' : 'booked' : ''}`
            }
            disabled={booking ? (booking.customerId !== userId ? true : (delivery ? true : false)) : (delivery ? true : false)}
            onClick={(e) => openBookingForm(e as unknown as MouseEvent)}
            data-test-id='booking-button'
        >
            {
                delivery ? `занята до ${moment(delivery.dateHandedTo).format('DD.MM')}` : booking ? 'Забронирована' : 'Забронировать'
            }
        </button>
    )
}
