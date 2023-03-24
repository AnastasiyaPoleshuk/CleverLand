import axios from 'axios';

import { ICategories, IError } from '../types/apiTypes';

import { api } from './api';

export const getCategories = async () => {
    try {
        const { data, status } = await api.get<ICategories | IError>('/api/categories');

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
};
