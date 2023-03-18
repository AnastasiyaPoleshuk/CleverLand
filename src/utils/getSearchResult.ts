import { IGetBooks } from '../types/apiTypes';

export const getSearchResult = (books: IGetBooks[], searchString: string) => {
    if (books.length < 1 || !searchString) return books;

    return books.filter(book => {
        const title = book.title.toLowerCase();
        const search = searchString.toLowerCase();

        return title.includes(search);
    })
}
