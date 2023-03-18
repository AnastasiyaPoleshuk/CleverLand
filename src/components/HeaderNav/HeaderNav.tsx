import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthAction, IsAuthAction } from '../../store/actions/AuthActions';

import './HeaderNav.scss';

export const HeaderNav = ({ styleType }: { styleType: string }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <section className={`header-nav ${styleType}`}>
            <NavLink to='profile' className="header-nav__profile">Профиль</NavLink>
            <button type='button' className="header-nav__exit-btn" data-test-id='exit-button' onClick={() => logout()}>Выход</button>
        </section>
    )
}
