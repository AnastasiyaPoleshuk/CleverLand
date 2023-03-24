import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppContext } from '../../context/AppContext';
import { IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { FilteredBooks } from '../../utils/FilteredBooks';
import { getSearchResult } from '../../utils/getSearchResult';
import { sortBooks } from '../../utils/SortBooks';
import { Card } from '../Card/Card';

import './CardsWraper.scss';

export const CardsWraper = (props: { category: string }) => {
    const { books } = useSelector((state: IStore) => state.books);
    const { category } = props;
    const { sortType, searchString, isList } = useContext(AppContext);
    const FilteredBooksArr = FilteredBooks(books, category);
    const sortedBooksArr = sortBooks(FilteredBooksArr, sortType);
    const searchResult = getSearchResult(sortedBooksArr, searchString);

    return (
        <section className="cards-wraper" data-test-id='content'>
            {
                searchResult.length > 0 ?
                    searchResult.map((item: IGetBooks) =>
                        <Card
                            key={item.id}
                            book={item}
                            isList={isList}
                            buttonType={CONSTANTS.DEFAULT_BUTTON}
                        />
                    )
                    :
                    FilteredBooksArr.length > 0 ?
                        <p className='alternate-text' data-test-id='search-result-not-found'>По запросу ничего не найдено</p>
                        : <p className='alternate-text' data-test-id='empty-category'>В этой категории книг ещё нет</p>
            }
        </section>
    )
}
