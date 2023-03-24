import { ICategories } from '../../types/apiTypes';
import { GET_CATEGORIES } from '../actionTypes';

export const CategoriesActions = (payload: ICategories) => ({ type: GET_CATEGORIES, payload });
