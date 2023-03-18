import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CardsWraper } from '../../components/CardsWraper/CardsWraper';
import { Navigation } from '../../components/Navigation/Navigation';
import { ICategories } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';

import './MainPage.scss';

export const MainPage = () => {
    const books = useSelector((state: IStore) => state.books.books);
    const categories = useSelector((state: IStore) => state.categories.categories);
    const { category } = useParams();
    const [categoryType, setCategoryType] = useState('');
    let CurrentCategory: ICategories | undefined;

    useEffect(() => {
        categories.length > 0 ?
            CurrentCategory = categories.find(item => item.path === category)
        : null;
        CurrentCategory ? setCategoryType(CurrentCategory.name) : setCategoryType('');
    }, [categories, category])


    return (
        <section className="content-wrap">
            <Navigation />
            {
                books.length > 0 ? <CardsWraper category={`${categoryType}`} /> : null
            }
        </section>
    )
}
