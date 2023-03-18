import { IGetBooks } from '../types/apiTypes';

export const FilteredBooksCount = (books: IGetBooks[], category: string) => books
        .filter((book: IGetBooks) => book.categories.includes(category))
        .map((item: IGetBooks) => item.id).length
