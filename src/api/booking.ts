import axios from 'axios';

import { IBookingRequestData, IBookingResponse } from '../types/apiTypes';

import { api } from './api';

export const booking = async (request: IBookingRequestData) => {

    const req = {
        data: request
    }

    try {
        const { data, status } = await api.post<IBookingResponse>(
            '/api/bookings',
            req
        );
        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: {
                    data: error.response?.data || null,
                    error: {
                        status: error.response?.status || 502,
                        name: error.response?.data?.name || '',
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
