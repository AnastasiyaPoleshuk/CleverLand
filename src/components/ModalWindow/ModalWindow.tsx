import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

import './ModalWindow.scss';

interface IProps {
    children: React.ReactNode,
    type: string,
}

export const ModalWindow = ({ children, type }: IProps) => {
    const { closeModal } = useContext(AppContext);

    return (
        <section className="overlay" onClick={() => closeModal(type)} data-test-id='modal-outer'>
            <div className="modal-window" onClick={(e) => e.stopPropagation()} data-test-id='booking-modal'>
                {children}
            </div>
        </section>
    );

}
