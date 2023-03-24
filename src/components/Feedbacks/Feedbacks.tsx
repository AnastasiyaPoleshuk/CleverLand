/* eslint-disable @typescript-eslint/ban-ts-comment */
import moment from 'moment';

import altImg from '../../assets/userAvatar.png';
import { IBookComments } from '../../types/apiTypes';
import { CONSTANTS } from '../../utils/constants';

import './Feedbacks.scss';

import 'moment/locale/ru';

interface IProps {
    comments: IBookComments[];
}

export const Feedbacks = (props: IProps) => {
    const { comments } = props;
    // @ts-ignore
    const sortedComments = comments?.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));

    const createRating = (comment: IBookComments) => {
        let ratingArr: JSX.Element[] = [];

        for (let i = 0; i < comment.rating; i++) {
            ratingArr = [...ratingArr, <i className="star-fill" data-test-id='star-active' />]
        }

        if (ratingArr.length < 5) {
            for (let i = 0; ratingArr.length !== 5; i++) {
                ratingArr = [...ratingArr, <i className="star" data-test-id='star' />]
            }
        }

        return ratingArr;
    }




    return (
        <details className='feedbacks__details' open={true} data-test-id='button-hide-reviews'>
            <summary className="feedbacks__title">
                Отзывы
                <span className="feedbacks__count">{
                    comments ? comments.length : 0
                }</span>
            </summary>
            <div className="feedbacks__wrap" >
                {
                    comments &&
                    sortedComments.map((comment: IBookComments) => <div className="feedback" key={comment.id} data-test-id='comment-wrapper'>
                        <div className="feedback__header"  >
                            <img src={
                                comment.user.avatarUrl ?
                                    `${CONSTANTS.URL}${comment.user.avatarUrl}`
                                    : altImg
                            } alt="аватар" className="feedback__user-img" />
                            <div className="feedback__header-info">
                                <div className="feedback__user-name" data-test-id='comment-author'>{`${comment.user.firstName} ${comment.user.lastName}`}</div>
                                <div className="feedback__date" data-test-id='comment-date'>&nbsp;{moment(comment.createdAt).locale('ru').format('DD MMMM YYYY')}</div>
                            </div>
                        </div>
                        <div className='rating__stars' data-test-id='rating'>
                            {createRating(comment)}
                        </div>
                        <p className="feedback__text" data-test-id='comment-text'>{comment.text}</p>
                    </div>)
                }
            </div>
        </details>
    )
}
