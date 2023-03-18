import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import { CONSTANTS } from '../../utils/constants';
import { HeaderNav } from '../HeaderNav/HeaderNav';

import './Header.scss';

export const Header = () => {
    const { isBurgerModalOpen, isNavModalOpen, closeModal, openModal } = useContext(AppContext);

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
                <h1 className="header__title">Библиотека</h1>
                <div className="header__profile-block profile-block">
                    <h5 className="profile__greetings">Привет, Иван!</h5>
                    <div
                        className="profile__link"
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
