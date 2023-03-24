import axios from 'axios';

import { IAuthRequest, IUserResponse } from '../types/apiTypes';

import { api, apiSetHeader } from './api';

export const authUser = async (request: IAuthRequest) => {
    try {
        const { data, status } = await api.post<IUserResponse>(
            '/api/auth/local',
            request
        );

        apiSetHeader('Authorization', `Bearer ${data.jwt}`)

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: {
                    data: error.response?.data || null,
                    error: {
                        status: error.response?.status || 502,
                        name: error.response?.data.name || '',
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
