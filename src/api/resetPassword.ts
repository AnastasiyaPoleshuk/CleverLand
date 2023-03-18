import axios from 'axios';

import { IError, IResetPasswordRequest, IUserResponse } from '../types/apiTypes';
import { CONSTANTS } from '../utils/constants';

export const resetPassword = async (request: IResetPasswordRequest) => {
    try {
        const { data, status } = await axios.post<IUserResponse | IError>(
            `${CONSTANTS.URL}/api/auth/reset-password`,
            request
        );

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: error.response?.data || {
                    data: null,
                    error: {
                        status: 502,
                        name: '',
                        message: error.message,
                        details: {}
                    }
                },
                status: error.response?.status || 502
            }
        }

        return {
            data: {
                data: null,
                error: {
                    status: 502,
                    name: 'uncached error',
                    message: '',
                    details: {}
                }
            },
            status: 502
        }
    }
}
