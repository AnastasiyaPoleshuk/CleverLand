import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

import { AppContext } from '../../context/AppContext';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { CommentsForm } from '../CommentsForm/CommentsForm';
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { MenuModal } from '../MenuModal/MenuModal';
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const Layout = () => {
    const isAuth = useSelector((state: IStore) => state.isAuth.isAuth);
    const navigate = useNavigate();
    const { isCommentModalOpen } = useContext(AppContext);

    useEffect(() => {
        isAuth  ? null : navigate('/auth');
    }, [isAuth])

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
