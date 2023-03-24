/* eslint-disable complexity */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { AnyAction } from 'redux';

import { SetUserRegisterRequestAction } from '../../store/actions/AuthActions';
import { RegisterUserThunk } from '../../store/thunks/RegisterUserThunk';
import { IRegistrationRequest } from '../../types/apiTypes';

import './RegistrationForm.scss'

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const [stepCount, setStepCount] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [phone, setPhone] = useState('');
    const [inputError, setInputError] = useState({
        letters: false,
        numbers: false,
        ok: false,
        message: '',
        isHighlighting: false,
    });
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState({
        letters: false,
        numbers: false,
        length: false,
        ok: false,
        message: '',
        isHighlighting: false,
    });
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<IRegistrationRequest>({
        mode: 'all'
    });

    const onSubmit: SubmitHandler<IRegistrationRequest> = (data) => {

        dispatch(RegisterUserThunk({
            ...data,
            phone
        }) as unknown as AnyAction)
            .then(() => {
                dispatch(SetUserRegisterRequestAction({
                    ...data,
                    phone
                }));
                navigate('/registration');
            })


        reset();
    };

    const CheckInputs = () => {

        if (!Object.keys(errors).length) {
            setStepCount(stepCount + 1);
        }
    }

    const validateLogin = (value: string) => {

        if (!value && inputError.letters && inputError.numbers) {
            setInputError(inputError => ({
                ...inputError,
                message: 'Используйте для логина латинский алфавит и цифры',
                isHighlighting: false
            }));

            return;
        }

        if (!value) {
            setInputError(inputError => ({
                ...inputError,
                message: 'Поле не может быть пустым',
                isHighlighting: true
            }))
        }
        else {
            setInputError(inputError => ({
                ...inputError,
                message: '',
                isHighlighting: false
            }))
        }

        if (!/\d+/.test(value)) {
            setInputError(inputError => ({
                ...inputError,
                numbers: true
            }))
        } else {
            setInputError(inputError => ({
                ...inputError,
                numbers: false
            }))
        };

        if (!/[A-Za-z]/g.test(value)) {
            setInputError(inputError => ({
                ...inputError,
                letters: true
            }))
        } else {
            setInputError(inputError => ({
                ...inputError,
                letters: false
            }))
        };

        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{0,}$/.test(value)) {
            setInputError({
                letters: false,
                numbers: false,
                ok: true,
                message: 'Используйте для логина латинский алфавит и цифры',
                isHighlighting: false
            });
            setDisabled(false)
        } else {
            setInputError(inputError => ({
                ...inputError,
                ok: false,
            }))
            setDisabled(true)
        };


    };

    const validatePassword = (value: string) => {

        if (!value && passwordError.length && passwordError.letters && passwordError.numbers) {
            setPasswordError(passwordError => ({
                ...passwordError,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                isHighlighting: false
            }));

            return;
        }

        if (!value) {
            setPasswordError(passwordError => ({
                ...passwordError,
                message: 'Поле не может быть пустым',
                isHighlighting: true
            }))
        }
        else {
            setPasswordError(passwordError => ({
                ...passwordError,
                message: '',
                isHighlighting: false
            }))
        }

        if (value.length < 8) {
            setPasswordError(passwordError => ({
                ...passwordError,
                length: true
            }))
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                length: false
            }))
        };

        if (!/\d+/.test(value)) {
            setPasswordError(passwordError => ({
                ...passwordError,
                numbers: true
            }))
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                numbers: false
            }))
        };

        if (!/[A-Z]/g.test(value)) {
            setPasswordError(passwordError => ({
                ...passwordError,
                letters: true
            }))
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                letters: false
            }))
        };

        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
            setPasswordError({
                letters: false,
                numbers: false,
                length: false,
                ok: true,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                isHighlighting: false
            })
            setDisabled(false)
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                ok: false,
            }))
            setDisabled(true)
        };

    };

    const toggleEye = () => {
        setShowPassword(!showPassword)
    };

    const checkPhone = (value: string) => {
        !value.trim() ? setPhoneError('Поле не может быть пустым') : setPhoneError('')

        if (value.includes('x')) {
            setPhoneError('В формате +375 (xx) xxx-xx-xx')
        }


    };

    const setPhoneValue = (value: string) => {
        checkPhone(value)
        setPhone(value);

    };

    const checkLogin = (value: string) => {

        if (!value) {
            setInputError(inputError => ({
                ...inputError,
                message: 'Поле не может быть пустым',
                isHighlighting: true
            }))
            return
        }

        if (value && inputError.letters || inputError.numbers) {
            setInputError(inputError => ({
                ...inputError,
                message: 'Используйте для логина латинский алфавит и цифры',
                isHighlighting: true
            }));
        }
    };

    return (
        <React.Fragment>
            <form className="registration__form form" data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form__title">Регистрация</h2>
                <h5 className="form__subtitle">{stepCount} шаг из 3</h5>

                <div className={`form__inputs-box ${stepCount !== 1 ? 'hide-box' : ''}`}>
                    <input

                        className={`form__input ${errors.username ? 'form__highlight-error' : ''}`}
                        placeholder="Придумайте логин для входа"
                        {...register('username', {
                            required: 'Поле не может быть пустым',
                            onChange: (e) => validateLogin(e.target.value),
                            onBlur: (e) => checkLogin(e.target.value),
                        })}
                    />
                    <p className={`form__input-info ${inputError.isHighlighting ? 'highlight-error' : ''}`} data-test-id='hint'>
                        {
                            inputError.message ||
                            <React.Fragment>
                                Используйте для логина
                                <span className={`${inputError.letters ? 'highlight-error' : ''}`}>&nbsp; латинский алфавит &nbsp;</span>
                                и
                                <span className={`${inputError.numbers ? 'highlight-error' : ''}`}>&nbsp;цифры</span>
                            </React.Fragment>
                        }
                    </p>

                    <label className='form__label'>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Пароль"
                            className={`form__input ${errors.password ? 'form__highlight-error' : ''}`}
                            {...register('password', {
                                required: true,
                                onChange: (e) => validatePassword(e.target.value),
                                onBlur: (e) => validatePassword(e.target.value)
                            })}
                        />
                        <i className={`password-eye eye-open ${showPassword ? '' : 'hide-eye'}`} onClick={toggleEye} data-test-id='eye-opened' />
                        <i className={`password-eye eye-close ${showPassword ? 'hide-eye' : ''}`} onClick={toggleEye} data-test-id='eye-closed' />
                        {
                            passwordError.ok && <i className={`password-ok ${passwordError.ok ? 'ok' : ''}`} data-test-id='checkmark' />
                        }
                    </label>

                    <p className={`form__input-info ${passwordError.isHighlighting ? 'highlight-error' : ''}`} data-test-id='hint'>
                        {
                            passwordError.message ||
                            <React.Fragment>
                                Пароль
                                <span className={`${passwordError.length ? 'highlight-error' : ''}`}>&nbsp;не менее 8 символов</span>,
                                с
                                <span className={`${passwordError.letters ? 'highlight-error' : ''}`}>&nbsp;заглавной буквой&nbsp;</span>
                                и
                                <span className={`${passwordError.numbers ? 'highlight-error' : ''}`}>&nbsp;цифрой</span>
                            </React.Fragment>
                        }
                    </p>
                    <button
                        type="button"
                        className="form-btn"
                        onClick={CheckInputs}
                        disabled={disabled}
                    >
                        следующий шаг
                    </button>
                </div>
                <div className={`form__inputs-box ${stepCount !== 2 ? 'hide-box' : ''}`}  >
                    <input
                        className={`form__input ${errors.firstName ? 'form__highlight-error' : null}`}
                        placeholder="Имя"
                        {...register('firstName', { required: 'Поле не может быть пустым' })}
                    />
                    <p className={`form__input-info ${errors.firstName ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                        {errors?.firstName?.message}
                    </p>
                    < input
                        placeholder="Фамилия"
                        className={`form__input ${errors.lastName ? 'form__highlight-error' : null}`}
                        {...register('lastName', { required: 'Поле не может быть пустым' })}
                    />
                    <p className={`form__input-info ${errors.lastName ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                        {errors?.lastName?.message}
                    </p>

                    <button
                        type="button"
                        className="form-btn"
                        onClick={CheckInputs}
                        disabled={!!errors.firstName || !!errors.lastName}
                    >
                        последний шаг
                    </button>
                </div>
                <div className={`form__inputs-box ${stepCount !== 3 ? 'hide-box' : ''}`}>
                    {
                        stepCount === 3 && <MaskedInput
                            className={`form__input ${errors.phone ? 'input-error' : null}`}
                            name='phone'
                            placeholderChar="x"
                            mask={['+', '3', '7', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            type='tel'
                            showMask={false}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            onBlur={(e) => checkPhone(e.target.value)}
                        />
                    }

                    <p className={`form__input-info ${phoneError ? 'highlight-error' : ''}`} data-test-id='hint'>
                        {
                            phoneError || 'В формате +375 (xx) xxx-xx-xx'
                        }
                    </p>
                    < input
                        placeholder="E-mail"
                        className={`form__input ${errors.email ? 'input-error' : null}`}
                        {...register('email', { required: 'Поле не может быть пустым', pattern: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/ })}
                    />
                    <p className={`form__input-info ${errors.email ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                        {
                            errors.email?.message || 'Введите корректный e-mail'
                        }
                    </p>

                    <button type="submit" className="form-btn" disabled={!isValid}>Зарегистрироваться</button>
                </div>

            </form>

            <p className="registration__redirect">
                Есть учётная запись?
                <NavLink to="/auth" className="registration__redirect-link">
                    войти
                </NavLink>
            </p>
        </React.Fragment>
    )
}
