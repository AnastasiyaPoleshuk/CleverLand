/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { AlertModal } from '../AlertModal/AlertModal';
import { BookingForm } from '../BookingForm/BookingForm';
import { UpdateBookingForm } from '../BookingForm/UpdateBookingForm';
import { HeaderNav } from '../HeaderNav/HeaderNav';
import { Loader } from '../Loader/Loader';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Menu } from '../NavigationMenu/Menu';

import './LayoutMainPage.scss';

export const LayoutMainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isNavModalOpen, isBookingModalOpen, bookId } = useContext(AppContext);
    const isLoadingState = useSelector((state: IStore) => state.isLoading.isLoading);
    const alert = useSelector((state: IStore) => state.alert.alert);
    const isAuth = useSelector((state: IStore) => state.isAuth.isAuth);
    const isBooking = useSelector((state: IStore) => state.isBookingSuccess.isBookingSuccess);
    const booking = useSelector((state: IStore) => state.booking.booking);
    const books = useSelector((state: IStore) => state.books.books);
    const user = useSelector((state: IStore) => state.user.user.user);
    const isErrorState = useSelector((state: IStore) => state.isError.isError);
    const categories = useSelector((state: IStore) => state.categories.categories);
    const jwt = useSelector((state: IStore) => state.user.user.jwt);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const [isError, setIsError] = useState(isErrorState);

    useEffect(() => {
        if (isAuth) {
            categories.length > 0 ? dispatch(GetBooksThunk() as unknown as AnyAction).then(() => {
                setIsLoading(false);
            })
                : (dispatch(GetCategoriesThunk(jwt) as unknown as AnyAction),
                    dispatch(GetBooksThunk() as unknown as AnyAction)
                ).then(() => {
                    setIsLoading(false);
                })
        } else {
            navigate('/auth');
        }

    }, [])

    useEffect(() => {
        setIsError(isErrorState);
    }, [isErrorState])

    useEffect(() => {
        setIsLoading(isLoadingState);
    }, [isLoadingState])

    return (
        <React.Fragment>
            <main className='main'>
                <div className='main__container'>
                    <div className="menu-wrapp">
                        <Menu isOpen={true} dataTestId='navigation' />
                    </div>
                    <Outlet />

                </div>
                {
                    isNavModalOpen && <HeaderNav styleType='header-nav__block' />
                }
            </main>
            {
                isLoading ? <Loader /> : null
            }
            {
                alert.text ? isLoading ? null : <AlertModal /> : null
            }
            {
                isBookingModalOpen &&
                <ModalWindow type={CONSTANTS.BOOKING_MODAL} >
                    {
                        // isBooking ? <UpdateBookingForm bookId={bookId} /> : <BookingForm bookId={bookId} />
                        // @ts-ignore
                        booking.id ? <UpdateBookingForm bookId={bookId} /> : <BookingForm bookId={bookId} />
                        // books[bookId] ? books[bookId].booking?.customerId === user.id ? <UpdateBookingForm bookId={bookId} /> : <BookingForm bookId={bookId} />
                    }
                </ModalWindow>
            }
        </React.Fragment>
    )
}
