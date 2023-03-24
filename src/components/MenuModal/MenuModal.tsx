import { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import { CONSTANTS } from '../../utils/constants';
import { HeaderNav } from '../HeaderNav/HeaderNav';
import { Menu } from '../NavigationMenu/Menu';

import './MenuModal.scss';

export const MenuModal = () => {
    const { isBurgerModalOpen, closeModal } = useContext(AppContext);

    return (
        <section className={`menu-modal-overlay ${isBurgerModalOpen ? 'open-menu' : null}`} onClick={() => closeModal(CONSTANTS.BURGER_MODAL)}>
            <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
                <Menu isOpen={true} dataTestId='burger' />
                <hr />
                <HeaderNav styleType='modal-nav__block' />
            </div>
        </section>
    );
};
