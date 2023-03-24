/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { GetFullUserThunk } from '../../store/thunks/GetFullUserThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { AlertModal } from '../AlertModal/AlertModal';
import { BookingForm } from '../BookingForm/BookingForm';
import { UpdateBookingForm } from '../BookingForm/UpdateBookingForm';
import { Loader } from '../Loader/Loader';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Menu } from '../NavigationMenu/Menu';

import './LayoutMainPage.scss';

export const LayoutMainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isBookingModalOpen, bookId } = useContext(AppContext);
    const { isLoading: isLoadingState } = useSelector((state: IStore) => state.isLoading);
    const { alert } = useSelector((state: IStore) => state.alert);
    const { isAuth } = useSelector((state: IStore) => state.isAuth)
    const { books } = useSelector((state: IStore) => state.books);
    const { user } = useSelector((state: IStore) => state.user.user);
    const { isError: isErrorState } = useSelector((state: IStore) => state.isError);
    const { categories } = useSelector((state: IStore) => state.categories);
    const { jwt } = useSelector((state: IStore) => state.user.user);
    const [isLoading, setIsLoading] = useState(isLoadingState);
    const [isError, setIsError] = useState(isErrorState);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        if (isAuth) {
            categories.length > 0 ? dispatch(GetBooksThunk() as unknown as AnyAction).then(() => {
                setIsLoading(false);
            })
                : (dispatch(GetCategoriesThunk() as unknown as AnyAction),
                    dispatch(GetBooksThunk() as unknown as AnyAction)
                ).then(() => {
                    setIsLoading(false);
                })
            dispatch(GetFullUserThunk() as unknown as AnyAction);
        } else {
            navigate('/auth');
        }

    }, [])

    useEffect(() => {
        const bookBooked = books.find(item => item.id === bookId);

        if (bookBooked?.booking) {
            setIsBooking(bookBooked?.booking.customerId === user.id)
        } else {
            setIsBooking(false);
        }
    }, [isBookingModalOpen])

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
            </main>
            {
                isLoading && <Loader />
            }
            {
                (alert.text && !isLoading) && <AlertModal />
            }
            {
                isBookingModalOpen &&
                <ModalWindow type={CONSTANTS.BOOKING_MODAL} >
                    {
                        isBooking ? <UpdateBookingForm bookId={bookId} /> : <BookingForm bookId={bookId} />
                    }
                </ModalWindow>
            }
        </React.Fragment>
    )
}
