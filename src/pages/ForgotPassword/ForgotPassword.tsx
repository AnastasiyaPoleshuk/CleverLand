import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ForgotPasswordForm } from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import { Loader } from '../../components/Loader/Loader';
import { IStore } from '../../types/storeTypes';
import { ResetPassword } from '../ResetPassword/ResetPassword';

import './ForgotPassword.scss';

export const ForgotPassword = () => {
    const isAuth = useSelector((state: IStore) => state.isAuth.isAuth);
    const isLoading = useSelector((state: IStore) => state.isLoading.isLoading);
    const SendEmailSuccessState = useSelector((state: IStore) => state.SendEmailSuccess.SendEmailSuccess);
    const [sendEmailSuccess, setSendEmailSuccess] = useState(SendEmailSuccessState);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

        isAuth ? navigate('/') : null;
    }, [])

    useEffect(() => {
        setSendEmailSuccess(SendEmailSuccessState);
    }, [SendEmailSuccessState])

    return (
        <div className="reset-password" data-test-id='auth'>
            <h1 className="reset-password__title">CleverLand</h1>
            <section className="reset-password__block">
                {
                    searchParams.get('code') ?
                        <ResetPassword /> :
                        sendEmailSuccess ?
                            <div className="success-message__wrapp" data-test-id="status-block">
                                <h4 className="success-message__title">Письмо выслано</h4>
                                <p className="success-message__message">Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
                            </div>
                            : <ForgotPasswordForm />
                }
            </section>
            {
                isLoading && <Loader />
            }
        </div>
    )
}
