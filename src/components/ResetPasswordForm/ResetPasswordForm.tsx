import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { ResetPasswordThunk } from '../../store/thunks/ResetPasswordThunk';
import { IResetPasswordRequest } from '../../types/apiTypes';

import './ResetPasswordForm.scss';

export const ResetPasswordForm = ({ getResetPasswordData }: { getResetPasswordData: (data: IResetPasswordRequest) => void }) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [passwordError, setPasswordError] = useState({
        letters: false,
        numbers: false,
        length: false,
        ok: false,
        message: '',
        isHighlighting: false,
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ password: string, passwordConfirmation: string }>({
        mode: 'all'
    });

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
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                ok: false,
            }))
        };

    };

    const checkPasswords = (password: string, passwordConfirmation: string) => {
        if (!password.trim()) {
            setPasswordErrorMessage('Поле не может быть пустым')
        }
        if (password !== passwordConfirmation) {
            setPasswordErrorMessage('Пароли не совпадают');
        } else {
            setPasswordErrorMessage('')
        }

        return true;
    };

    const checkEmptyField = (value: string) => {
        setDisabled(false);

        if (!value.trim()) {
            setPasswordErrorMessage('Поле не может быть пустым')
            setShowError(true)
        }

        if (passwordErrorMessage === 'Пароли не совпадают') {
            setShowError(false)
        }

        return true;
    };

    const checkField = (value: string) => {

        if (!value.trim()) {
            setPasswordErrorMessage('Поле не может быть пустым')
        }

        setShowError(true);

        if (passwordErrorMessage) {
            setDisabled(true)
        }
    };

    const onSubmit: SubmitHandler<{ password: string, passwordConfirmation: string }> = (data) => {
        dispatch(ResetPasswordThunk({
            ...data,
            code: searchParams.get('code') || ' ',
        }) as unknown as AnyAction);
        getResetPasswordData({
            ...data,
            code: searchParams.get('code') || ' ',
        })

        reset();
    };

    return (
        <section className="reset-password-form__block">
            <form action="#" className='reset-password-form form' data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="form__title">Восстановление пароля</h2>
                <label className='form__label'>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Новый пароль"
                        className={`form__input ${errors.password ? 'form__highlight-error' : ''}`}
                        {...register('password', {
                            required: true,
                            onChange: (e) => validatePassword(e.target.value),
                            onBlur: (e) => validatePassword(e.target.value),
                        })}
                        name='password'
                    />
                    <i className={`password-eye ${showPassword ? 'eye-open' : 'eye-close'}`} onClick={() => setShowPassword(!showPassword)} />
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

                <label className='form__label'>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Повторите пароль"

                        className={`form__input ${errors.passwordConfirmation ? 'form__highlight-error' : ''}`}
                        {
                        ...register('passwordConfirmation', {
                            required: true,
                            validate: (value, formValues) => checkPasswords(value, formValues.password),
                            onChange: (e) => checkEmptyField(e.target.value),
                            onBlur: (e) => checkField(e.target.value)
                        })}
                        name='passwordConfirmation'
                    />
                    <i className={`password-eye ${showPassword ? 'eye-open' : 'eye-close'}`} onClick={() => setShowPassword(!showPassword)} />
                </label>

                {
                    showError && <p className={`form__input-info ${passwordErrorMessage ? 'highlight-error' : ''}`} data-test-id='hint'>
                        {
                            passwordErrorMessage || 'Пароли не совпадают'
                        }
                    </p>
                }

                <button type="submit" className="form-btn" disabled={disabled} >сохранить изменения</button>
            </form>
            <p className="reset-password-form__info">
                После сохранения войдите в библиотеку, используя новый пароль
            </p>
        </section>
    )
}
