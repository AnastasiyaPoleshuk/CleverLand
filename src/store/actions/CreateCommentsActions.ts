import { ICommentsResponse } from '../../types/apiTypes';
import { CREATE_COMMENT, CREATE_COMMENT_SUCCESS } from '../actionTypes';

export const CreateCommentsAction = (payload: ICommentsResponse) => ({ type: CREATE_COMMENT, payload });

export const IsCommentsAction = (payload: boolean) => ({ type: CREATE_COMMENT_SUCCESS, payload });
