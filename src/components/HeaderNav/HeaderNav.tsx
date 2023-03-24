import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { AuthAction, IsAuthAction } from '../../store/actions/AuthActions';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { GetFullUserThunk } from '../../store/thunks/GetFullUserThunk';
import { CONSTANTS } from '../../utils/constants';

import './HeaderNav.scss';

export const HeaderNav = ({ styleType }: { styleType: string }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useContext(AppContext);

    const logout = () => {
        dispatch(AuthAction(
            {
                jwt: '',
                user: {
                    id: 0,
                    username: '',
                    email: '',
                    provider: '',
                    confirmed: false,
                    blocked: false,
                    createdAt: '',
                    updatedAt: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                },
            }
        ))
        dispatch(IsAuthAction(false));
        navigate('/auth');
    }

    const goToProfile = () => {
        // dispatch(GetCategoriesThunk() as unknown as AnyAction)
        // dispatch(GetBooksThunk() as unknown as AnyAction)
        // dispatch(GetFullUserThunk() as unknown as AnyAction)
        closeModal(CONSTANTS.NAV_MODAL);

    }

    return (
        <section className={`header-nav ${styleType}`}>
            <NavLink
                to='profile'
                className="header-nav__profile"
                onClick={goToProfile}
                data-test-id='profile-button'
            >
                Профиль
            </NavLink>
            <button type='button' className="header-nav__exit-btn" data-test-id='exit-button' onClick={logout}>Выход</button>
        </section>
    )
}
