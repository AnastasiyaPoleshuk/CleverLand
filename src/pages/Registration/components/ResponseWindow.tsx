import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { IsRegisterAction } from '../../../store/actions/AuthActions';
import { isErrorAction } from '../../../store/actions/ErrorAction';

import './ResponseWindow.scss';

interface IProps {
    title: string,
    message: string,
    btnTitle: string,
    path: string,
    triggerAction: (path: string) => void
}

export const ResponseWindow = (props: IProps) => {
    const { title, message, btnTitle, path, triggerAction } = props;

    return (
        <section className="registration-success__box success-flow" data-test-id='status-block'>
            <h2 className="success-flow__title">{title}</h2>
            <p className="success-flow__message" >{message}</p>
            <button type='button' className="success-flow__button" onClick={() => triggerAction(path)}>{btnTitle}</button>
        </section>
    )
}

