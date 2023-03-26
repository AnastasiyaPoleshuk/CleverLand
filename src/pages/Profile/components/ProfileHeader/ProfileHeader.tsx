/* eslint-disable @typescript-eslint/ban-ts-comment */
import {  useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import altAvatar from '../../../../assets/avatar.png';
import { SetUserAvatarThunk } from '../../../../store/thunks/SetUserAvatarThunk';
import { UpdateUserThunk } from '../../../../store/thunks/UpdateUserThunk';
import { IStore } from '../../../../types/storeTypes';
import { CONSTANTS } from '../../../../utils/constants';

import './ProfileHeader.scss';

interface IProps {
    userId: number,
    firstName: string,
    lastName: string,
    img: string,
}

export const ProfileHeader = (props: IProps) => {
    const { firstName, lastName, img, userId } = props;
    const { avatar } = useSelector((store: IStore) => store.avatar);
    // @ts-ignore
    const hiddenFileInput = useRef<HTMLInputElement>(<input type="file" />);
    const dispatch = useDispatch();

    useEffect(() => {
        if (avatar) {
            dispatch(UpdateUserThunk(
                { 
                    requestData: { avatar }, 
                    userId, 
                    message:{
                        success: 'Фото успешно сохранено!',
                        fail: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
                    } 
                }) as unknown as AnyAction);
        }
    }, [avatar])

    const changeAvatar = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = (elem: HTMLInputElement) => {
        if (elem.files) {
            dispatch(SetUserAvatarThunk({ files: elem.files[0] }) as unknown as AnyAction);
        }
    };

    return (
        <header className="profile-header" data-test-id='profile-avatar'>
            <div className="profile-header__avatar-box" onClick={changeAvatar} >
                <img src={img ? `${CONSTANTS.URL}${img}` : altAvatar} alt="avatar" className="profile-header__avatar-img" />
                <button type='button' className="add-photo" />
                <input
                    type="file"
                    accept='image/*, .png, .jpg'
                    ref={hiddenFileInput}
                    onChange={(event) => handleChange(event.target)}
                    className='hidden'
                />
            </div>
            <div className="profile-header__fullname-box">
                <h3 className="profile-header__firstName">{firstName}</h3>
                <h3 className="profile-header__lastName">{lastName}</h3>
            </div>
        </header>
    )
}
