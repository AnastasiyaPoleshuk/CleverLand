import axios from 'axios';

import { IError, IRegistrationRequest, IUserResponse } from '../types/apiTypes';
import { CONSTANTS } from '../utils/constants';

export const registerUser = async (request: IRegistrationRequest) => {
    try {
        const { data, status } = await axios.post<IUserResponse | IError>(
            `${CONSTANTS.URL}/api/auth/local/register`,
            request
        );

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: error.response?.data || {
                    data: null,
                    error: {
                        status: 400,
                        name: '',
                        message: error.message,
                        details: {}
                    }
                },
                status: error.response?.status || 400
            }
        }

        return {
            data: {
                data: null,
                error: {
                    status: 400,
                    name: 'uncached error',
                    message: '',
                    details: {}
                }
            },
            status: 400
        }
    }
}
