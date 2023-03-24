import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { GetFullUserThunk } from '../../store/thunks/GetFullUserThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { CommentsForm } from '../CommentsForm/CommentsForm';
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { MenuModal } from '../MenuModal/MenuModal';
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const Layout = () => {
    const { isAuth } = useSelector((state: IStore) => state.isAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isCommentModalOpen } = useContext(AppContext);

    useEffect(() => {
        isAuth ? null : navigate('/auth');
        dispatch(GetCategoriesThunk() as unknown as AnyAction)
        dispatch(GetBooksThunk() as unknown as AnyAction)
        dispatch(GetFullUserThunk() as unknown as AnyAction)
    }, [])

    useEffect(() => {
        isAuth ? null : navigate('/auth');
    }, [isAuth])

    return (
        <div data-test-id='main-page'>
            {/* <React.Fragment> */}
            <Header />
            <div className="app">
                <Outlet />
            </div>
            <Footer />
            <MenuModal />
            {
                isCommentModalOpen &&
                <ModalWindow type={CONSTANTS.COMMENT_MODAL} >
                    <CommentsForm />
                </ModalWindow>
            }
            {/* </React.Fragment> */}
        </div>
    )
}
