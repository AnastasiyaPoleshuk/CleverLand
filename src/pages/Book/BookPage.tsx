import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AlertModal } from '../../components/AlertModal/AlertModal';
import { BookComponent } from '../../components/BookComponent/BookComponent';
import { BookingForm } from '../../components/BookingForm/BookingForm';
import { UpdateBookingForm } from '../../components/BookingForm/UpdateBookingForm';
import { Loader } from '../../components/Loader/Loader';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { AppContext } from '../../context/AppContext';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

export const BookPage = () => {
    const dispatch = useDispatch();
    const { isBookingModalOpen } = useContext(AppContext);
    const isLoadingState = useSelector((state: IStore) => state.isLoading.isLoading);
    const alert = useSelector((state: IStore) => state.alert.alert);
    const isCommentsSuccess = useSelector((state: IStore) => state.isCommentsSuccess.isCommentsSuccess);
    const isErrorState = useSelector((state: IStore) => state.isError.isError);
    const book = useSelector((state: IStore) => state.book.book);
    const user = useSelector((state: IStore) => state.user.user);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const [isError, setIsError] = useState(isErrorState);
    const { bookId } = useParams();
    const { category } = useParams();
    const id = bookId ? +bookId : 2;


    useEffect(() => {
        dispatch(GetBookThunk(id) as unknown as AnyAction)
    }, [])

    useEffect(() => {
        setIsError(isErrorState);
    }, [isErrorState])

    useEffect(() => {
        setIsLoading(isLoadingState);
    }, [isLoadingState])

    return (
        <React.Fragment>
            <section className="book__path">
                <div className="book__path__container">
                    <NavLink
                        to={`/books/${category}`}
                        data-test-id='breadcrumbs-link'
                    >
                        {book ? category === 'all' ? 'Все книги' : book.categories.join('') : 'Программирование'}
                    </NavLink>
                    <span data-test-id='book-name'>
                        {book ? ` / ${book.title}` : ' / '}
                    </span>
                </div>
            </section>
            {
                isLoading ? <Loader /> : null
            }
            {
                alert.text ? isLoading ? null : <AlertModal /> : null
            }
            {
                book ? <BookComponent book={book} /> : null
            }
            {
                isBookingModalOpen &&
                <ModalWindow type={CONSTANTS.BOOKING_MODAL} >

                    {
                        book ? book.booking?.customerId === user.user.id ? <UpdateBookingForm bookId={book.id} /> : <BookingForm bookId={book.id} /> : <BookingForm bookId={id} />
                        // books[bookId].booking?.customerId === 85 ? <UpdateBookingForm bookId={bookId} /> : <BookingForm bookId={bookId} />
                    }
                </ModalWindow>
            }

        </React.Fragment>

    );
}
