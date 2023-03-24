import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { StatusCodes } from 'http-status-codes';

import { Loader } from '../../components/Loader/Loader';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { IsRegisterAction } from '../../store/actions/AuthActions';
import { isErrorAction } from '../../store/actions/ErrorAction';
import { RegisterUserThunk } from '../../store/thunks/RegisterUserThunk';
import { IStore } from '../../types/storeTypes';

import { ResponseWindow } from './components/ResponseWindow';

import './Registration.scss';

export const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isRegistration: isRegistrationState } = useSelector((state: IStore) => state.isRegistration);
    const { registrationRequest: userRegisterData } = useSelector((state: IStore) => state.registrationRequest);
    const { error } = useSelector((state: IStore) => state.error);
    const { isError } = useSelector((state: IStore) => state.isError);
    const { isAuth } = useSelector((state: IStore) => state.isAuth);
    const { isLoading } = useSelector((state: IStore) => state.isLoading);
    const [isRegistration, setIsRegistration] = useState(isRegistrationState);
    const [failResult, setIsFailResult] = useState({ message: '', btnTitle: '', func: redirect });



    useEffect(() => {
        isAuth && navigate('/');
    }, [])


    useEffect(() => {
        setIsRegistration(isRegistrationState);
    }, [isRegistrationState])

    useEffect(() => {


        error.error.status === StatusCodes.BAD_REQUEST ?
            setIsFailResult({
                message: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail',
                btnTitle: 'назад к регистрации',
                func: redirect,
            })
            :
            setIsFailResult({
                message: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
                btnTitle: 'повторить',
                func: repeatRequest,
            })
    }, [error])

    function redirect(path: string) {

        if (isRegistrationState) {
            navigate(path);
        } else {
            dispatch(IsRegisterAction(false));
            dispatch(isErrorAction(false));
            navigate(path);
        }
    }

    function repeatRequest() {
        dispatch(RegisterUserThunk(userRegisterData) as unknown as AnyAction);
    }


    return (
        <div className="registration" data-test-id='auth'>
            <h1 className="registration__title">CleverLand</h1>
            <section className="registration__block">
                {
                    isRegistration ?
                        <ResponseWindow
                            title='Регистрация успешна'
                            message='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
                            btnTitle='Вход'
                            path='/auth'
                            triggerAction={() => redirect('/auth')}
                        /> :
                        isError ?
                            <ResponseWindow
                                title='Данные не сохранились'
                                message={failResult.message}
                                btnTitle={failResult.btnTitle}
                                path='/registration'
                                triggerAction={failResult.func}
                            />
                            :
                            <RegistrationForm />
                }
            </section>
            {
                isLoading && <Loader />
            }
        </div>
    )
}

