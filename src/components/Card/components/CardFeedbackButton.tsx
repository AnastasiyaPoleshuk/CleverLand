import { useContext } from 'react';

import { AppContext } from '../../../context/AppContext';
import { CONSTANTS } from '../../../utils/constants';

interface IProps {
    hasComment: boolean,
    bookId: number,
}

export const CardFeedbackButton = (props: IProps) => {
    const { hasComment, bookId } = props;
    const { openModal, setIdForBooking } = useContext(AppContext);

    const openCommentsModal = (e: MouseEvent) => {
        e.stopPropagation();
        setIdForBooking(bookId);
        openModal(CONSTANTS.COMMENT_MODAL);
    }

    return (
        <button
            type="button"
            className={`card__btn feedback-btn ${hasComment && 'change'}`}
            onClick={(e) => openCommentsModal(e as unknown as MouseEvent)}
            data-test-id='history-review-button'
        >
            {
                hasComment ? 'Изменить оценку' : 'Оценить'
            }
        </button>
    )
}

