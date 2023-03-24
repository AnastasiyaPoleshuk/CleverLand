import { Card } from '../components/Card/Card';
import { IGetBooks, IUserBookingBookInfo } from '../types/apiTypes';

import { CONSTANTS } from './constants';

export const findBooksHistory = (books: IGetBooks[], historyBooks: IUserBookingBookInfo[]) => {
    const cardsArr: JSX.Element[] = [];

    historyBooks.forEach(historyBook => {
        const CardComponent = books.find(book => book.id === historyBook.id);

        if (CardComponent) {
            cardsArr.push(<Card book={CardComponent} isList={false} buttonType={CONSTANTS.COMMENT_BUTTON} />)
        }

    });

    return cardsArr;
}
