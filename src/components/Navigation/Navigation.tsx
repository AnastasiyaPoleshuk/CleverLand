import { useContext, useState } from 'react';

import { AppContext } from '../../context/AppContext';

import './Navigation.scss';

export const Navigation = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { isList, sortType, changeCardsView, changeSearchString, changeSortType } = useContext(AppContext);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const getSearch = (inputValue: string) => {
        changeSearchString(inputValue);
        setSearchText(inputValue);
    };

    return (
        <div className="nav__wrap">
            <div className="nav__filter-wrap">
                <input
                    type='text'
                    placeholder='Поиск книги или автора…'
                    className={`nav__filter-search ${isSearchOpen ? 'search-open' : null}`}
                    onChange={e => getSearch(e.target.value)}
                    value={searchText}
                    data-test-id='input-search'
                />
                <i
                    className='search'
                    data-test-id='button-search-open'
                    onClick={toggleSearch}
                />
                <i
                    className={`${isSearchOpen ? 'cross-active' : 'cross'}`}
                    onClick={toggleSearch}
                    data-test-id='button-search-close'
                />
                 <button
                    type='button'
                    className={`nav__filter ${sortType}`}
                    onClick={changeSortType}
                    data-test-id='sort-rating-button'
                >
                    По рейтингу
                </button>
            </div>
            <div className="nav__view-controls view-controls">
                <button
                    type='button'
                    className={`view-controls__control ${isList ? null : 'active'}`}
                    onClick={() => changeCardsView(false)}
                    data-test-id='button-menu-view-window'
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.81818 3.75415C3.36631 3.75415 3 4.12046 3 4.57233V11.1178C3 11.5697 3.36631 11.936 3.81818 11.936H10.3636C10.8155 11.936 11.1818 11.5697 11.1818 11.1178V4.57233C11.1818 4.12046 10.8155 3.75415 10.3636 3.75415H3.81818ZM4.63636 10.2996V5.39051H9.54545V10.2996H4.63636ZM13.6364 3.75415C13.1845 3.75415 12.8182 4.12046 12.8182 4.57233V11.1178C12.8182 11.5697 13.1845 11.936 13.6364 11.936H20.1818C20.6337 11.936 21 11.5697 21 11.1178V4.57233C21 4.12046 20.6337 3.75415 20.1818 3.75415H13.6364ZM14.4545 10.2996V5.39051H19.3636V10.2996H14.4545ZM3 14.3905C3 13.9386 3.36631 13.5723 3.81818 13.5723H10.3636C10.8155 13.5723 11.1818 13.9386 11.1818 14.3905V20.936C11.1818 21.3878 10.8155 21.7542 10.3636 21.7542H3.81818C3.36631 21.7542 3 21.3878 3 20.936V14.3905ZM4.63636 15.2087V20.1178H9.54545V15.2087H4.63636ZM13.6364 13.5723C13.1845 13.5723 12.8182 13.9386 12.8182 14.3905V20.936C12.8182 21.3878 13.1845 21.7542 13.6364 21.7542H20.1818C20.6337 21.7542 21 21.3878 21 20.936V14.3905C21 13.9386 20.6337 13.5723 20.1818 13.5723H13.6364ZM14.4545 20.1178V15.2087H19.3636V20.1178H14.4545Z" fill="#363636" />
                    </svg>
                </button>
                <button type='button' className={`view-controls__control ${isList ? 'active' : null}`} onClick={() => changeCardsView(true)} data-test-id='button-menu-view-list'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 12.7542C2 12.2019 2.44772 11.7542 3 11.7542H21C21.5523 11.7542 22 12.2019 22 12.7542C22 13.3064 21.5523 13.7542 21 13.7542H3C2.44772 13.7542 2 13.3064 2 12.7542Z" fill="#363636" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 6.75415C2 6.20187 2.44772 5.75415 3 5.75415H21C21.5523 5.75415 22 6.20187 22 6.75415C22 7.30644 21.5523 7.75415 21 7.75415H3C2.44772 7.75415 2 7.30644 2 6.75415Z" fill="#363636" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 18.7542C2 18.2019 2.44772 17.7542 3 17.7542H21C21.5523 17.7542 22 18.2019 22 18.7542C22 19.3064 21.5523 19.7542 21 19.7542H3C2.44772 19.7542 2 19.3064 2 18.7542Z" fill="#363636" />
                    </svg>

                </button>
            </div>
        </div>
    )
}
