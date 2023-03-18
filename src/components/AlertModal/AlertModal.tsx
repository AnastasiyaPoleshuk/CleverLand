import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AlertAction } from '../../store/actions/AlertActions';
import { IStore } from '../../types/storeTypes';

import './AlertModal.scss';

export const AlertModal = () => {
    const dispatch = useDispatch();
    const alert = useSelector((state: IStore) => state.alert.alert);

    useEffect(() => {
        setTimeout(() => {
            close()
        }, 4000)
    }, [])

    function close() {
            dispatch(AlertAction({ isError: false, text: '' }))
    }

    return (
        <div className={`alert-modal__container ${alert.isError ? 'error__box' : 'success__box'}`} data-test-id='error' >
            <h5 className={`alert__text ${alert.isError ? 'alert__text-error' : 'alert__text-success'}`}> {alert.text}</h5>
            <span className="alert__btn-close" onClick={close} data-test-id='alert-close' />
        </div>
    )
}
