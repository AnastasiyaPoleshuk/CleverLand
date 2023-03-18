import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { CreateCommentsThunk } from '../../store/thunks/CreateCommentsThunk';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

import './CommentsForm.scss';

const STARS_ID = [0, 1, 2, 3, 4];

export const CommentsForm = () => {
    const dispatch = useDispatch();
    const book = useSelector((state: IStore) => state.book.book);
    const user = useSelector((state: IStore) => state.user.user.user);
    const jwt = useSelector((state: IStore) => state.user.user.jwt);
    const { closeModal } = useContext(AppContext);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(-1);
    const { bookId } = useParams();
    const id = bookId ? +bookId : 2;

    const onSubmit = () => {
        dispatch(CreateCommentsThunk({
            data: {
                rating: rating + 1,
                text: comment,
                book: `${book.id}`,
                user: `${user.id}`
            }
        }) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.COMMENT_MODAL);
                dispatch(GetBookThunk(id) as unknown as AnyAction);
            })
    }

    const checkRating = (item: number) => {
        // rating === item ? setRating(0) : setRating(item)
        console.log(item);

        setRating(item)
    }

    return (
        <div className='comments__box' data-test-id='modal-rate-book'>
            <h3 className="comments__title" data-test-id='modal-title'>Оцените книгу</h3>
            <button type='button' className="modal-window__close-btn" onClick={() => closeModal(CONSTANTS.COMMENT_MODAL)} data-test-id='modal-close-button' />
            <div className="rating__box">
                <h4 className="rating__title">Ваша оценка</h4>

                <div className="rating__stars-wrap" data-test-id='rating'>
                    {
                        STARS_ID.map((item) =>
                            <span data-test-id='star' key={item}>
                                <i
                                    className={`stars${item <= rating ? '-active' : ''}`}
                                    data-test-id={`${item <= rating ? 'star-active' : ''}`}
                                    onClick={() => checkRating(item)}
                                />
                            </span>
                        )
                    }
                </div>
            </div>

            <textarea className='comments__textarea' onChange={(e) => setComment(e.target.value)} placeholder='Оставить отзыв' data-test-id='comment' />

            <button type="submit" className='comments__btn' onClick={() => onSubmit()} data-test-id='button-comment'>оценить</button>
        </div>
    )
}
