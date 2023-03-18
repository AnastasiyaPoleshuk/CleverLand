import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';

import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';
import { ResetPasswordThunk } from '../../store/thunks/ResetPasswordThunk';
import { IResetPasswordRequest } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { ResponseWindow } from '../Registration/components/ResponseWindow';

import './ResetPassword.scss';

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isError = useSelector((state: IStore) => state.isError.isError);
    const isChangePasswordSuccess = useSelector((state: IStore) => state.isChangePasswordSuccess.isChangePasswordSuccess);
    const [isSuccess, setIsSuccess] = useState(isChangePasswordSuccess);
    const [resetPasswordData, setResetPasswordData] = useState({
        password: '',
        passwordConfirmation: '',
        code: ''
    });

    useEffect(() => {
        setIsSuccess(isChangePasswordSuccess);
    }, [isChangePasswordSuccess])

    function redirect(path: string) {
        navigate(path);
    }

    function repeatRequest() {
        dispatch(ResetPasswordThunk(resetPasswordData) as unknown as AnyAction);
    }

    const getResetPasswordData = (data: IResetPasswordRequest) => {
        setResetPasswordData(data);
    }

    return (
        <section >
            {
                isSuccess ?
                    <ResponseWindow
                        title='Новые данные сохранены'
                        message='Зайдите в личный кабинет, используя свои логин и новый пароль'
                        btnTitle='Вход'
                        path='/auth'
                        triggerAction={() => redirect('/auth')}
                    />
                    : isError ?
                        <ResponseWindow
                            title='Данные не сохранились'
                            message='Что-то пошло не так. Попробуйте ещё раз'
                            btnTitle='повторить'
                            path=''
                            triggerAction={() => repeatRequest()}
                        />
                        : <ResetPasswordForm getResetPasswordData={() => getResetPasswordData} />
            }
        </section>
    )
}
