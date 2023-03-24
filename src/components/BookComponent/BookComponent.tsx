import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { AppContext } from '../../context/AppContext';
import { IGetBook } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { Feedbacks } from '../Feedbacks/Feedbacks';
import { ImgSlider } from '../ImgSlider/ImgSlider';

import './BookComponent.scss';

export const BookComponent = ({ book }: { book: IGetBook }) => {
    const [disabled, setDisabled] = useState(false);
    const { openModal, setIdForBooking } = useContext(AppContext);
    const { user } = useSelector((state: IStore) => state.user.user);

    useEffect(() => {
        setDisabled(book.booking ? (book.booking.customerId !== user.id ? true : (book.delivery ? true : false)) : (book.delivery ? true : false));
    }, [book])

    const openFeedbacksModal = () => {
        setIdForBooking(book.id);
        openModal(CONSTANTS.COMMENT_MODAL);
    }

    return (
        <main className='book__container'>
            <div className="book__main-info">
                <ImgSlider img={book.images} />
                <div className="main-info__block">
                    <h3 className="main-info__title" data-test-id='book-title'>
                        {book.title ? ` / ${book.title}` : ' / '}
                    </h3>
                    <h5 className="main-info__author">{book.authors?.join(' ')}</h5>
                    <button
                        type='button'
                        className={`main-info-book  ${book.delivery ? 'busy' : book.booking ? book.booking.customerId === user.id ? 'booked-user' : 'booked' : ''}`}
                        disabled={disabled}
                        onClick={() => openModal(CONSTANTS.BOOKING_MODAL)}
                        data-test-id='booking-button'
                    >
                        {
                            book.booking ? 'Забронирована' : book.delivery ? `занята до ${moment(book.delivery.dateHandedTo).format('DD.MM')}` : 'Забронировать'
                        }
                    </button>

                    <article className='about-book__article'>
                        <h5 className="about-book__title">О книге</h5>
                        <p className="about-book__p">{book.description}</p>
                    </article>
                </div>
            </div>
            <div className="book__additional-info">
                <section className="rating__section">
                    <h5 className="rating__title">Рейтинг</h5>
                    <div className='rating__stars'>
                        <i className="star-fill" />
                        <i className="star-fill" />
                        <i className="star-fill" />
                        <i className="star-fill" />
                        <i className="star" />
                        <span className='rating'>{book.rating ? book.rating : 'еще нет оценок'}</span>
                    </div>
                </section>
                <section className="detailed-info__section">
                    <h5 className="detailed-info__title">Подробная информация</h5>
                    <div className="detailed-info__table">
                        <table>
                            <tr>
                                <td className='table-key'>Издательство</td>
                                <td className='table-value'>{book.publish}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Год издания</td>
                                <td className='table-value'>{book.issueYear}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Страниц</td>
                                <td className='table-value'>{book.pages}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Переплёт</td>
                                <td className='table-value'>{book.cover}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Формат</td>
                                <td className='table-value'>{book.format}</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td className='table-key'>Жанр</td>
                                <td className='table-value'>{book.categories?.join(' ')}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Вес</td>
                                <td className='table-value'>{book.weight}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>ISBN</td>
                                <td className='table-value'>{book.ISBN}</td>
                            </tr>
                            <tr>
                                <td className='table-key'>Изготовитель</td>
                                <td className='table-value'>{book.producer}</td>
                            </tr>
                            <tr>
                                <td />
                                <td />
                            </tr>
                        </table>
                    </div>

                </section>
                <section className="feedbacks__section" data-test-id='reviews'>
                    <Feedbacks comments={book.comments} />
                    <button
                        type='button'
                        className='feedbacks__button'
                        data-test-id='button-rate-book'
                        disabled={book.booking?.customerId === user.id}
                        onClick={openFeedbacksModal}
                    >
                        Оценить книгу
                    </button>
                </section>
            </div>
        </main >
    )
}
