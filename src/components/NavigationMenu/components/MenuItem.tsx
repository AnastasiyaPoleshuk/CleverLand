import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext } from '../../../context/AppContext';
import { CONSTANTS } from '../../../utils/constants';

import '../Menu.scss';

interface IProps {
    path: string,
    name: string,
    bookCount: string,
    dataTestIdValue: string,
}


export const MenuItem = (props: IProps) => {
    const { path, name, bookCount, dataTestIdValue } = props;
    const { closeModal } = useContext(AppContext);

    return (
        <NavLink className="book-type__item-wrap" to={`/books/${path}`} onClick={() => closeModal(CONSTANTS.BURGER_MODAL)}>
            <span className="book-type__item" data-test-id={`${dataTestIdValue}-${path === 'all' ? 'books' : path}`}>{name}</span>
            <span className='book-type__bookCount' data-test-id={`${dataTestIdValue}-book-count-for-${path}`}>{bookCount}</span>
        </NavLink>
    )
}
