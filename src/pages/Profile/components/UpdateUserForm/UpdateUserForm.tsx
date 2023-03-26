/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable complexity */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { AnyAction } from 'redux';

import { SetUserRegisterRequestAction } from '../../../../store/actions/AuthActions';
import { RegisterUserThunk } from '../../../../store/thunks/RegisterUserThunk';
import { UpdateUserThunk } from '../../../../store/thunks/UpdateUserThunk';
import { IRegistrationRequest, IUpdateUserRequest } from '../../../../types/apiTypes';

import './UpdateUserForm.scss';

interface IProps {
    userId: number,
    firstName: string,
    lastName: string,
    userPhone: string
}

export const UpdateUserForm = (props: IProps) => {
    const { userId, firstName, lastName, userPhone } = props;
    const navigate = useNavigate();
    const [stepCount, setStepCount] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
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
        formState: { errors },
    } = useForm<IUpdateUserRequest>({
        mode: 'all'
    });

    const onSubmit: SubmitHandler<IUpdateUserRequest> = (data) => {
        const requestData = {
            email: data.email,
            username: data.login,
            password: data.password,
            firstName: data.firstName || firstName,
            lastName: data.lastName || lastName,
            phone: phone || userPhone,
        }

        dispatch(UpdateUserThunk({
            requestData,
            userId,
            message: {
                success: 'Изменения успешно сохранены!',
                fail: 'Изменения не были сохранены. Попробуйте позже!'
            }
        }) as unknown as AnyAction);
        setDisabled(true);
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
        } else {
            setInputError(inputError => ({
                ...inputError,
                ok: false,
            }))
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
        } else {
            setPasswordError(passwordError => ({
                ...passwordError,
                ok: false,
                isHighlighting: true
            }))
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

            return;
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
        <form className="update-user__form form" onSubmit={handleSubmit(onSubmit)} data-test-id='profile-form'>
            <h4 className="form__title">Учётные данные</h4>
            <h5 className="form__subtitle">Здесь вы можете отредактировать информацию о себе</h5>
            <div className="form__section-wrap">
                <section className="form__section">
                    <label className="form__section-label">
                        <input
                            disabled={disabled}
                            className={`form__input ${errors.login ? 'form__highlight-error' : ''}`}
                            placeholder="Придумайте логин для входа"
                            {...register('login', {
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
                    </label>
                    <label className="form__section-label">
                        <label className='form__label'>

                            <input
                                type={showPassword ? 'text' : 'password'}
                                disabled={disabled}
                                placeholder="Пароль"
                                className={`form__input ${errors.password ? 'form__highlight-error' : ''}`}
                                {...register('password', {
                                    required: true,
                                    onChange: (e) => validatePassword(e.target.value),
                                    onBlur: (e) => validatePassword(e.target.value)
                                })}
                            />
                            <i
                                className={`password-eye ${showPassword ? 'eye-open' : 'eye-close'}`}
                                onClick={() => setShowPassword(!showPassword)}
                                data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
                            />
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
                    </label>

                </section>
                <section className="form__section">
                    <label className="form__section-label">
                        <input
                            disabled={disabled}
                            className={`form__input ${errors.firstName ? 'form__highlight-error' : null}`}
                            placeholder="Имя"
                            {...register('firstName')}
                        />
                        <p className={`form__input-info ${errors.firstName ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                            {errors?.firstName?.message}
                        </p>
                    </label>
                    <label className="form__section-label">
                        <label className='form__label'>
                            < input
                                disabled={disabled}
                                placeholder="Фамилия"
                                className={`form__input ${errors.lastName ? 'form__highlight-error' : null}`}
                                {...register('lastName')}
                            />
                            <p className={`form__input-info ${errors.lastName ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                                {errors?.lastName?.message}
                            </p>
                        </label>
                    </label>

                </section>
                <section className="form__section">
                    <label className="form__section-label">
                        <MaskedInput
                            className={`form__input ${errors.phone ? 'input-error' : null}`}
                            name='phone'
                            disabled={disabled}
                            placeholderChar="x"
                            mask={['+', '3', '7', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            type='tel'
                            showMask={false}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            onBlur={(e) => checkPhone(e.target.value)}
                        />
                        <p className={`form__input-info ${phoneError ? 'highlight-error' : ''}`} data-test-id='hint'>
                            {
                                phoneError || 'В формате +375 (xx) xxx-xx-xx'
                            }
                        </p>
                    </label>
                    <label className="form__section-label">
                        <label className='form__label'>
                            < input
                                disabled={disabled}
                                placeholder="E-mail"
                                className={`form__input ${errors.email ? 'form__highlight-error' : null}`}
                                {...register('email', { required: 'Поле не может быть пустым', pattern: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/ })}
                            />
                            <p className={`form__input-info ${errors.email ? 'highlight-error' : 'hide-error'}`} data-test-id='hint'>
                                {
                                    errors.email?.message || 'Введите корректный e-mail'
                                }
                            </p>
                        </label>
                    </label>

                </section>
                {/* <section className="form__section-left"> </section>
                <section className="form__section-right"> </section> */}
            </div>
            <button
                type='button'
                className="form__update-btn"
                onClick={() => setDisabled(!disabled)}
                data-test-id='edit-button'
            >
                Редактировать
            </button>
            <button
                type='submit'
                className="form__submit-btn"
                disabled={disabled}
                data-test-id='save-button'
            >
                Сохранить изменения
            </button>
        </form>
    )
}
