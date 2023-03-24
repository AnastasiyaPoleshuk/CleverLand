import { IGetBooks } from '../types/apiTypes';

export const sortBooks = (books: IGetBooks[], type: string) => {
    if (books.length < 1) return books;
    if (type === 'ascending') {
        return books.sort((a: IGetBooks, b: IGetBooks) => {
            let firstEl;
            let nextEl;

            a.rating ? firstEl = Math.floor(a.rating) : firstEl = 0;
            b.rating ? nextEl = Math.floor(b.rating) : nextEl = 0;

            return firstEl - nextEl;
        })
    }

    return books.sort((a: IGetBooks, b: IGetBooks) => {
        let firstEl;
        let nextEl;

        a.rating ? firstEl = Math.floor(a.rating) : firstEl = 0;
        b.rating ? nextEl = Math.floor(b.rating) : nextEl = 0;

        return nextEl - firstEl;
    })
}
