import { ISendEmailResponse } from '../../types/apiTypes';
import { SEND_EMAIL_SUCCESS } from '../actionTypes';

export const SendEmailAction = (payload: ISendEmailResponse) => ({ type: SEND_EMAIL_SUCCESS, payload });
