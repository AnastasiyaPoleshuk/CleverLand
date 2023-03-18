import axios from 'axios';

import { IError, IGetBook } from '../types/apiTypes';

import { api } from './api';

export const getBook = async (id: number) => {
    try {
        const { data, status } = await api.get<IGetBook | IError>(
            `/api/books/${id}`,
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
