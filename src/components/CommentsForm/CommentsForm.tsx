import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AnyAction } from 'redux';

import { AppContext } from '../../context/AppContext';
import { CreateCommentsThunk } from '../../store/thunks/CreateCommentsThunk';
import { GetBookThunk } from '../../store/thunks/GetBookThunk';
import { UpdateCommentsThunk } from '../../store/thunks/UpdateCommentsThunk';
import { IStore } from '../../types/storeTypes';
import { CONSTANTS } from '../../utils/constants';

import './CommentsForm.scss';

const STARS_ID = [0, 1, 2, 3, 4];

export const CommentsForm = () => {
    const dispatch = useDispatch();
    const { fullUser: user } = useSelector((state: IStore) => state.fullUser);
    const { closeModal, bookId } = useContext(AppContext);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(-1);
    const [hasComment, setHasComment] = useState(false);
    const [commentId, setCommentId] = useState(0);


    useEffect(() => {
        const currentBooksComment = user.comments?.find(userComment => userComment.bookId === bookId);

        if (currentBooksComment) {
            setComment(currentBooksComment.text || '');
            setRating(currentBooksComment.rating - 1);
            setHasComment(true);
            setCommentId(currentBooksComment.id)
        }

    }, [])

    const createComment = () => {
        dispatch(CreateCommentsThunk({
            data: {
                rating: rating + 1,
                text: comment,
                book: `${bookId}`,
                user: `${user.id}`
            }
        }) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.COMMENT_MODAL);
                dispatch(GetBookThunk(bookId) as unknown as AnyAction);
            })
    }

    const updateComment = () => {
        const request = {
            data: {
                rating: rating + 1,
                text: comment,
                book: `${bookId}`,
                user: `${user.id}`
            }
        }


        dispatch(UpdateCommentsThunk({ request, commentId }) as unknown as AnyAction)
            .then(() => {
                closeModal(CONSTANTS.COMMENT_MODAL);
                dispatch(GetBookThunk(bookId) as unknown as AnyAction);
            })
    }

    const checkRating = (item: number) => {
        setRating(item)
    }

    return (
        <div className='comments__box' data-test-id='modal-rate-book'>
            <h3 className="comments__title" data-test-id='modal-title'>Оцените книгу</h3>
            <button
                type='button'
                className="modal-window__close-btn"
                onClick={() => closeModal(CONSTANTS.COMMENT_MODAL)}
                data-test-id='modal-close-button'
            />
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

            <textarea
                className='comments__textarea'
                onChange={(e) => setComment(e.target.value)}
                placeholder='Оставить отзыв'
                data-test-id='comment'
                value={comment}
            />

            <button
                type="submit"
                className='comments__btn'
                onClick={hasComment ? updateComment : createComment}
                data-test-id='button-comment'
            >
                {hasComment ? 'изменить оценку' : 'оценить'}
            </button>
        </div>
    )
}
