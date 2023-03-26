import React, { createContext, useMemo, useState } from 'react';

import { CONSTANTS } from '../utils/constants';

interface IAppContext {
    isBurgerModalOpen: boolean,
    isNavModalOpen: boolean,
    isCommentModalOpen: boolean,
    isBookingModalOpen: boolean,
    isList: boolean,
    bookId: number,
    sortType: string,
    searchString: string,
    changeCardsView: (value: boolean) => void,
    changeSortType: () => void,
    changeSearchString: (value: string) => void,
    openModal: (type: string) => void,
    closeModal: (type: string) => void,
    setIdForBooking: (type: number) => void,
}

export const AppContext = createContext<IAppContext>({
    isBurgerModalOpen: false,
    isNavModalOpen: false,
    isCommentModalOpen: false,
    isBookingModalOpen: false,
    isList: false,
    bookId: 0,
    sortType: 'descending',
    searchString: '',
    changeCardsView: () => { },
    changeSortType: () => { },
    changeSearchString: () => { },
    openModal: () => { },
    closeModal: () => { },
    setIdForBooking: () => { },
});

export const AppState = ({ children }: { children: React.ReactNode }) => {
    const [isList, setIsList] = useState(false);
    const [isBurgerModalOpen, setIsBurgerModalOpen] = useState(false);
    const [isNavModalOpen, setIsNavModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookId, setBookId] = useState(0);
    const [sortType, setSortType] = useState('descending');
    const [searchString, setSearchString] = useState('');

    const openModal = (type: string) => {
        window.scrollTo({ top: 0 });

        switch (type) {
            case CONSTANTS.BURGER_MODAL:
                setIsBurgerModalOpen(true);
                break
            case CONSTANTS.BOOKING_MODAL:
                setIsBookingModalOpen(true);
                document.body.style.overflow = 'hidden';
                break
            case CONSTANTS.COMMENT_MODAL:
                setIsCommentModalOpen(true);
                document.body.style.overflow = 'hidden';
                break
            case CONSTANTS.NAV_MODAL:
                setIsNavModalOpen(true)
                break
        };
    };

    const closeModal = (type: string) => {
        switch (type) {
            case CONSTANTS.BURGER_MODAL:
                setIsBurgerModalOpen(false);
                break
            case CONSTANTS.BOOKING_MODAL:
                setIsBookingModalOpen(false);
                document.body.style.overflow = 'visible';
                break
            case CONSTANTS.COMMENT_MODAL:
                setIsCommentModalOpen(false);
                document.body.style.overflow = 'visible';
                break
            case CONSTANTS.NAV_MODAL:
                setIsNavModalOpen(false)
                break
        };
    };

    const changeCardsView = (value: boolean) => {
        setIsList(value);
    };

    const changeSearchString = (value: string) => {
        setSearchString(value);
    };

    const setIdForBooking = (value: number) => {
        setBookId(value);
    };

    const changeSortType = () => {
        switch (sortType) {
            case 'descending':
                setSortType('ascending');
                break
            case 'ascending':
                setSortType('descending')
                break
        }
    };

    const contextValue = useMemo(() => ({
        isBurgerModalOpen,
        isNavModalOpen,
        isCommentModalOpen,
        isBookingModalOpen,
        isList,
        bookId,
        sortType,
        searchString,
        changeCardsView,
        changeSortType,
        changeSearchString,
        openModal,
        closeModal,
        setIdForBooking,
    }), [
        isList,
        isBurgerModalOpen,
        isNavModalOpen,
        bookId,
        sortType,
        searchString,
        isCommentModalOpen,
        isBookingModalOpen,
    ]
    );

    return (
        <AppContext.Provider value={contextValue}
        >
            {children}
        </AppContext.Provider>
    );
};
