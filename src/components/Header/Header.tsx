import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import AltAvatar from '../../assets/avatar.png';
import { AppContext } from '../../context/AppContext';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { HeaderNav } from '../HeaderNav/HeaderNav';

import './Header.scss';

export const Header = () => {
    const location = useLocation()
    const { isBurgerModalOpen, isNavModalOpen, closeModal, openModal } = useContext(AppContext);
    const { fullUser: user } = useSelector((state: IStore) => state.fullUser);
    const avatar = user.avatar ? `${CONSTANTS.URL}${user.avatar}` : AltAvatar;

    const toggleMenu = (type: string, modal: boolean) => {
        if (!modal) {
            openModal(type)
        } else {
            closeModal(type)
        }
    }

    return (
        <header className="header">
            <div className="header__container">
                <NavLink to="/" className="header__link" />
                <button
                    type='button'
                    className={isBurgerModalOpen ? 'header__burger-active' : 'header__burger'}
                    onClick={() => toggleMenu(CONSTANTS.BURGER_MODAL, isBurgerModalOpen)}
                    data-test-id='button-burger'
                />
                <h1 className="header__title">{location.pathname === 'profile' ? 'Личный кабинет' : 'Библиотека'}</h1>
                <div className="header__profile-block profile-block">
                    <h5 className="profile__greetings">Привет, {user.firstName}!</h5>
                    <img
                        className="profile__link"
                        src={avatar}
                        alt='avatar'
                        onClick={() => toggleMenu(CONSTANTS.NAV_MODAL, isNavModalOpen)}
                    />
                </div>
                {
                    isNavModalOpen && <HeaderNav styleType='header-nav__block' />
                }
            </div>

        </header>
    )
}
