import { IGetBooks } from '../types/apiTypes';

export const FilteredBooks = (books: IGetBooks[], category: string) => {

    if (category) {
        return books.filter(book => book.categories.includes(category))
    }

    return books;
}
