import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { StatusCodes } from 'http-status-codes';

import { AuthForm } from '../../components/AuthForm/AuthForm';
import { Loader } from '../../components/Loader/Loader';
import { AuthUserThunk } from '../../store/thunks/AuthUserThunk';
import { IStore } from '../../types/storeTypes';
import { ResponseWindow } from '../Registration/components/ResponseWindow';

import './AuthorizationPage.scss';

export const AuthorizationPage = () => {
    const dispatch = useDispatch();
    const { isAuth: isAuthState } = useSelector((state: IStore) => state.isAuth);
    const { authRequest: authData } = useSelector((state: IStore) => state.authRequest);
    const { error } = useSelector((state: IStore) => state.error.error);
    const { isLoading } = useSelector((state: IStore) => state.isLoading);
    const [errorOpen, setIsErrorOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(isAuthState);

    useEffect(() => {
        if (error.status !== StatusCodes.BAD_REQUEST && error.status !== StatusCodes.OK) {
            setIsErrorOpen(true);
        };
    }, [error]);

    useEffect(() => {
        setIsAuth(isAuthState);
    }, [isAuthState])

    function repeatRequest() {
        dispatch(AuthUserThunk(authData) as unknown as AnyAction)
    }

    return (
        <div className="auth" data-test-id='auth'>
            <h1 className="registration__title">CleverLand</h1>
            <section className="registration__block ">
                {
                    isAuth ?
                        null
                        : errorOpen ?
                            <ResponseWindow
                                title='Вход не выполнен'
                                message='Что-то пошло не так. Попробуйте ещё раз'
                                btnTitle='повторить'
                                path=''
                                triggerAction={() => repeatRequest()}
                            />
                            : <AuthForm />
                }
            </section>
            {
                isLoading && <Loader />
            }
        </div>
    )
}
