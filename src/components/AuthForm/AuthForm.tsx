import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { StatusCodes } from 'http-status-codes';

import { SetUserAuthRequestAction } from '../../store/actions/AuthActions';
import { AuthUserThunk } from '../../store/thunks/AuthUserThunk';
import { GetFullUserThunk } from '../../store/thunks/GetFullUserThunk';
import { IAuthRequest } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';

import './AuthForm.scss';


export const AuthForm = () => {
    const { isAuth: isAuthState } = useSelector((state: IStore) => state.isAuth);
    const { error } = useSelector((state: IStore) => state.error.error);
    const [isAuth, setIsAuth] = useState(isAuthState);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [inputError, setInputError] = useState('');
    const [identifierError, setIdentifierError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<IAuthRequest>({
        mode: 'all'
    });


    useEffect(() => {
        if (error.status === StatusCodes.BAD_REQUEST) {
            setError('identifier', { type: 'BAD_REQUEST', message: 'Неверный логин или пароль!' })
            setError('password', { type: 'BAD_REQUEST' })
            setInputError('Неверный логин или пароль!')
        }
    }, [error])

    useEffect(() => {
        setIsAuth(!isAuth);
        isAuth ? navigate('/') : null;
    }, [isAuthState])

    const onSubmit: SubmitHandler<IAuthRequest> = (data) => {
        dispatch(AuthUserThunk(data) as unknown as AnyAction)
            .then(() => {
                dispatch(SetUserAuthRequestAction(data));
                dispatch(GetFullUserThunk() as unknown as AnyAction);
                reset();
            })
    };

    const checkPassword = (data: string) => {
        if (data) {
            setPasswordValue(data);
            clearErrors('password');

        } else {
            setError('password', { type: 'empty value', message: 'Поле не может быть пустым' });
            setPasswordValue('')
        }
    };

    const validateIdentifier = (data: string) => {
        if (!data.trim()) {
            setIdentifierError('Поле не может быть пустым');
        } else {
            setIdentifierError('')
        }
    };


    return (
        <div className='auth-form__wrap '>
            <form className='auth-form' data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form__title">Вхoд в личный кабинет</h2>
                <div className='form__inputs-box'>
                    <input
                        className={`form__input ${errors.identifier ? 'form__highlight-error' : ''}`}
                        placeholder="Логин"
                        {...register('identifier', {
                            required: true,
                            onChange: (e) => validateIdentifier(e.target.value),
                            onBlur: (e) => validateIdentifier(e.target.value),
                        })}
                        name='identifier'
                    />
                    <p
                        className={`form__warn ${errors.identifier ? 'highlight-error' : 'hide-error'}`}
                        data-test-id='hint'
                    >
                        {errors.identifier?.message || identifierError}
                    </p>

                    <label className='form__lable'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Пароль"
                            className={`form__input ${errors.password ? 'form__highlight-error' : ''}`}
                            {...register('password', { required: 'Поле не может быть пустым' })}
                            name='password'
                            onChange={(e) => checkPassword(e.target.value)}
                        />
                        {
                            passwordValue &&
                            <i
                                className={`password-eye ${showPassword ? 'eye-open' : 'eye-close'}`}
                                onClick={() => setShowPassword(!showPassword)}
                                data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
                            />
                        }

                    </label>
                    {
                        errors.password && <p className='form__warn' data-test-id='hint' >{errors.password?.message}</p>
                    }

                    {
                        inputError && <p className='form__warn' data-test-id='hint' >{inputError}</p>
                    }
                    <NavLink to='/forgot-pass' className={`forgot-pass${Object.keys(errors).length ? '-active' : ''}`}>
                        {
                            Object.keys(errors).length ? 'Восстановить?' : 'Забыли логин или пароль?'
                        }
                    </NavLink>
                    <button type="submit" className="form-btn">Вход</button>
                </div>
            </form>

            <p className="registration__redirect">
                Нет учётной записи?
                <NavLink to="/registration" className="registration__redirect-link">
                    Регистрация
                </NavLink>
            </p>
        </div>
    )
}

