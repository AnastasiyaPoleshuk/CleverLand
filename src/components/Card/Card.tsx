/* eslint-disable complexity */
import { MouseEvent, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import altPath from '../../assets/icon_cat.png';
import { AppContext } from '../../context/AppContext';
import { IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

import { Hightlight } from './components/Hightlight';

import './Card.scss';



export const Card = (props: { book: IGetBooks }) => {
    const { id, image, rating, title, authors, booking, delivery } = props.book;
    const ratingNum = Math.floor(+rating);
    const user = useSelector((state: IStore) => state.user.user.user);
    const { isList, searchString, openModal, setIdForBooking } = useContext(AppContext);
    const navigate = useNavigate();
    const { category } = useParams();
    const bookCategory = category ? category : 'all';
    const light = useCallback((str: string) => Hightlight(searchString, str), [searchString])

    const changePage = () => {
        navigate(`/books/${bookCategory}/${id}`)
    };

    const openBookingForm = (e: MouseEvent) => {
        console.log(e.target);

        e.stopPropagation();
        setIdForBooking(id);
        openModal(CONSTANTS.BOOKING_MODAL);
    };

    return (
        <div className={`${isList ? 'list-item' : 'card'}`} data-test-id='card' onClick={changePage}>
            {
                image ?
                    <img src={`${CONSTANTS.URL}${image.url}`} alt='фото книги' className={`${isList ? 'list-item__img' : 'card__img'}`} />
                    : <img src={altPath} alt='фото книги' className={`${isList ? 'list-item__img-alt' : 'card__img-alt'}`} />
            }
            <div className={`${isList ? 'list-item__info-box' : null}`}>
                {
                    ratingNum ?
                        <div className={`${isList ? 'hide' : 'rating-stars'}`}>
                            <i className="star-fill" />
                            <i className={`star${ratingNum - 1 > 0 ? '-fill' : ''}`} />
                            <i className={`star${ratingNum - 2 > 0 ? '-fill' : ''}`} />
                            <i className={`star${ratingNum - 3 > 0 ? '-fill' : ''}`} />
                            <i className={`star${ratingNum - 4 > 0 ? '-fill' : ''}`} />
                        </div>
                        :
                        <p className={`${isList ? 'hide' : 'card__rating'}`}>нет оценок</p>
                }
                <h2 className={`${isList ? 'list-item__title' : 'card__title'}`}>{light(title)}</h2>
                <h3 className={`${isList ? 'list-item__author' : 'card__author'}`}>{authors.join(' ')}</h3>
                <div className={`${isList ? 'list-item__button-block' : null}`}>
                    {
                        ratingNum ?
                            <div className={`${isList ? null : 'hide'}`}>
                                <i className="star-fill" />
                                <i className={`star${ratingNum - 1 > 0 ? '-fill' : ''}`} />
                                <i className={`star${ratingNum - 2 > 0 ? '-fill' : ''}`} />
                                <i className={`star${ratingNum - 3 > 0 ? '-fill' : ''}`} />
                                <i className={`star${ratingNum - 4 > 0 ? '-fill' : ''}`} />
                            </div>
                            :
                            <p className={`${isList ? 'list-item__rating' : 'hide'}`}>нет оценок</p>
                    }
                    <button
                        type='button'
                        className={
                            `${isList ? 'list-item__btn' : 'card__btn'} ${delivery ? 'busy' : booking ? booking.customerId === user.id ? 'booked-user' : 'booked' : ''}`
                        }
                        disabled={booking ? (booking.customerId !== user.id ? true : (delivery ? true : false)) : (delivery ? true : false)}
                        onClick={(e) => openBookingForm(e as MouseEvent)}
                        data-test-id='booking-button'
                    >
                        {
                            delivery ? `занята до ${moment(delivery.dateHandedTo).format('DD.MM')}` : booking ? 'Забронирована' : 'Забронировать'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
