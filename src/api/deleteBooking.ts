import axios from 'axios';

import { IBookingResponse } from '../types/apiTypes';

import { api } from './api';

export const deleteBooking = async (bookingId: number) => {
    try {
        const { data, status } = await api.delete<IBookingResponse>(
            `/api/bookings/${bookingId}`,
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
