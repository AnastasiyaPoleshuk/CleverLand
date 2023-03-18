import axios from 'axios';

import { IError, IGetBooks } from '../types/apiTypes';

import { api } from './api';

export const getBooks = async () => {
    try {
        const { data, status } = await api.get<IGetBooks | IError>(
            '/api/books',
        );

        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return {
                data: error.response?.data || {
                    data: null,
                    error: {
                        status: 404,
                        name: '',
                        message: error.message,
                        details: {}
                    }
                },
                status: error.response?.status || 404
            }
        }

        return {
            data: {
                data: null,
                error: {
                    status: 404,
                    name: 'uncached error',
                    message: '',
                    details: {}
                }
            },
            status: 404
        }

    }
};
