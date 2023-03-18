import { IAlert } from '../../types/storeTypes';
import { SET_ALERT_DATA } from '../actionTypes';

export const AlertAction = (payload: IAlert) => ({ type: SET_ALERT_DATA, payload });
