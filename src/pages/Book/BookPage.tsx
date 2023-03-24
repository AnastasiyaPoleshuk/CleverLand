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
    const { isLoading: isLoadingState } = useSelector((state: IStore) => state.isLoading);
    const { alert } = useSelector((state: IStore) => state.alert);
    const { isError: isErrorState } = useSelector((state: IStore) => state.isError);
    const { book } = useSelector((state: IStore) => state.book);
    const { user } = useSelector((state: IStore) => state.user);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const [isError, setIsError] = useState(isErrorState);
    const { bookId } = useParams();
    const { category } = useParams();
    const id = bookId ? +bookId : 2;


    useEffect(() => {
        dispatch(GetBookThunk(id) as unknown as AnyAction)
    }, [bookId])

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
                isLoading && <Loader />
            }
            {
                (alert.text && !isLoading) && <AlertModal />
            }
            {
                book ? <BookComponent book={book} /> : null
            }
            {
                isBookingModalOpen &&
                <ModalWindow type={CONSTANTS.BOOKING_MODAL} >

                    {
                        book ? book.booking?.customerId === user.user.id ? <UpdateBookingForm bookId={book.id} /> : <BookingForm bookId={book.id} /> : <BookingForm bookId={id} />
                    }
                </ModalWindow>
            }

        </React.Fragment>

    );
}
