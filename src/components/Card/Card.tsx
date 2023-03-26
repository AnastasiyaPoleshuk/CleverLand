/* eslint-disable complexity */
import { MouseEvent, useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import altPath from '../../assets/icon_cat.png';
import { AppContext } from '../../context/AppContext';
import { IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

import { CardButtonDefault } from './components/CardButtonDefault';
import { CardDeliveryButton } from './components/CardDeliveryButton';
import { CardFeedbackButton } from './components/CardFeedbackButton';
import { CardsBookingButton } from './components/CardsBookingButton';
import { Hightlight } from './components/Hightlight';

import './Card.scss';

interface IProps {
    book: IGetBooks,
    isList: boolean,
    buttonType: string,
}

export const Card = (props: IProps) => {
    const { id, image, rating, title, authors, booking, delivery } = props.book;
    const { isList, buttonType } = props;
    const ratingNum = Math.floor(+rating);
    const { fullUser: user } = useSelector((state: IStore) => state.fullUser);
    const { searchString } = useContext(AppContext);
    const navigate = useNavigate();
    const { category } = useParams();
    const bookCategory = category ? category : 'all';
    const light = useCallback((str: string) => Hightlight(searchString, str), [searchString]);
    const [button, setButton] = useState(<CardButtonDefault booking={booking} delivery={delivery} userId={user.id} cardId={id} />)



    useEffect(() => {
        const hasComment = !!user?.comments?.find(comment => comment.bookId === id);

        switch (buttonType) {
            case CONSTANTS.DEFAULT_BUTTON: // isList={isList}
                setButton(<CardButtonDefault booking={booking} delivery={delivery} userId={user.id} cardId={id} />)
                break;
            case CONSTANTS.BOOKING_BUTTON:
                setButton(<CardsBookingButton bookingId={booking?.id || 0} bookId={id} />)
                break;
            case CONSTANTS.DELIVERY_BUTTON:
                setButton(<CardDeliveryButton text={user.delivery.dateHandedTo || ''} />)
                break;
            case CONSTANTS.COMMENT_BUTTON:
                setButton(<CardFeedbackButton hasComment={hasComment} bookId={id} />)
                break;
            default:
                break;
        }
    }, [user, booking])


    // useEffect(() => {
    //     const hasComment = !!user.comments.find(comment => comment.bookId === id);

    //     switch (buttonType) {
    //         case CONSTANTS.DEFAULT_BUTTON:

    //             break;
    //         case CONSTANTS.BOOKING_BUTTON:
    //             setButton(<CardsBookingButton bookingId={booking.id || 0} bookId={id} />)
    //             break;
    //         case CONSTANTS.DELIVERY_BUTTON:
    //             setButton(<CardDeliveryButton text={user.delivery.dateHandedTo || ''} />)
    //             break;
    //         case CONSTANTS.COMMENT_BUTTON:
    //             setButton(<CardFeedbackButton hasComment={hasComment} bookId={id} />)
    //             break;
    //         default:
    //             break;
    //     }
    // }, [isList])

    const changePage = () => {
        navigate(`/books/${bookCategory}/${id}`)
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

                    {
                        button
                    }
                </div>
            </div>
        </div>
    )
}
