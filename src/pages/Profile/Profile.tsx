import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import moment from 'moment';

import { AlertModal } from '../../components/AlertModal/AlertModal';
import { Card } from '../../components/Card/Card';
import { CardsSlider } from '../../components/CardsSlider/CardsSlider';
import { Loader } from '../../components/Loader/Loader';
import { AppContext } from '../../context/AppContext';
import { GetBooksThunk } from '../../store/thunks/GetBooksThunk';
import { GetCategoriesThunk } from '../../store/thunks/GetCategoriesThunk';
import { GetFullUserThunk } from '../../store/thunks/GetFullUserThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';
import { findBooksHistory } from '../../utils/findBooksHistory';

import { ProfileBooks } from './components/ProfileBooks/ProfileBooks';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { UpdateUserForm } from './components/UpdateUserForm/UpdateUserForm';

import './Profile.scss';

export const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((store: IStore) => store.isAuth);
    const { fullUser: user } = useSelector((state: IStore) => state.fullUser);
    const { isLoading } = useSelector((state: IStore) => state.isLoading);
    const { alert } = useSelector((state: IStore) => state.alert);
    const { books } = useSelector((state: IStore) => state.books);
    const [booksInfoComponents, setBooksInfoComponents] = useState<IProfileBooksData[]>([])
    const [alertText, setAlertText] = useState<string>('');
    // const { changeCardsView } = useContext(AppContext);

    interface IProfileBooksData {
        title: string;
        subtitle: string;
        warningTitle: string;
        warningSubtitle: string;
        isWarning: boolean;
        emptyFieldText: string[];
        isEmpty: boolean;
        component?: JSX.Element;
    }

    useEffect(() => {
        const profileBooksData = createProfileBooksData();

        setBooksInfoComponents(profileBooksData);

    }, [books]);

    useEffect(() =>{
        setAlertText(alert.text);
    },[alert])

    function createProfileBooksData () {
        const profileBooksArr = [];

        if (user.booking && books.length > 0) {
            const CardComponent = books.find(book => book.id === user.booking.book?.id);

            const profileBooksInfo = {
                title: 'Забронированная книга',
                subtitle: 'Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь',
                warningTitle: 'Дата бронирования книги истекла ',
                warningSubtitle: 'Через 24 часа книга будет  доступна всем',
                isWarning: moment().startOf('day') > moment(user.booking.dateOrder),
                emptyFieldText: ['Забронируйте книгу', ' и она отобразится'],
                isEmpty: CardComponent ? false : true,
                component: CardComponent && <Card book={CardComponent} isList={true} buttonType={CONSTANTS.BOOKING_BUTTON} />,
            }

            profileBooksArr.push(profileBooksInfo);
        }

        if (user.delivery && books.length > 0) {
            const CardComponent = books.find(book => book.id === user.delivery.book?.id);
            const profileBooksInfo = {
                title: 'Книга которую взяли',
                subtitle: 'Здесь можете просмотреть информацию о книге и узнать сроки возврата',
                warningTitle: 'Вышел срок пользования книги',
                warningSubtitle: 'Верните книгу, пожалуйста',
                isWarning: moment() > moment(user.delivery.dateHandedTo),
                emptyFieldText: ['Прочитав книгу,', 'она отобразится в истории'],
                isEmpty: CardComponent ? false : true,
                component: CardComponent && <Card book={CardComponent} isList={true} buttonType={CONSTANTS.DELIVERY_BUTTON} />,
            }

            profileBooksArr.push(profileBooksInfo);

        }

        if (user.history && books.length > 0) {
            const BooksInHistory = user.history.books ? findBooksHistory(books, user.history.books) : [];

            const profileBooksInfo = {
                title: 'История',
                subtitle: 'Список прочитанных книг',
                warningTitle: '',
                warningSubtitle: '',
                isWarning: false,
                emptyFieldText: ['Вы не читали книг', 'из нашей библиотеки'],
                isEmpty: BooksInHistory.length !== 0 ? false : true,
                component: <CardsSlider cards={BooksInHistory} />,
            }

            profileBooksArr.push(profileBooksInfo);
        }

        return profileBooksArr;
    }


    return (
        <React.Fragment>
            <div className="profile__container"  >
                <ProfileHeader
                    firstName={user.firstName}
                    lastName={user.lastName}
                    img={user.avatar}
                    userId={user?.id}
                />
                <UpdateUserForm
                    firstName={user.firstName}
                    lastName={user.lastName}
                    userPhone={user.phone}
                    userId={user.id}
                />
                {
                    booksInfoComponents.length  > 0 && booksInfoComponents.map(profileBook => <ProfileBooks key={profileBook.title} data={profileBook} />)
                }
            </div>
            {
                (alertText && !isLoading) && <AlertModal />
            }
            {
                isLoading && <Loader />
            }
        </React.Fragment>

    )
}
