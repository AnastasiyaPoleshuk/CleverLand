
import axios from 'axios';

import { api } from './api';

export const uploadAvatar = async (request: { files: File }) => {
    const avatarData = new FormData();

    avatarData.append('files', request.files)

    try {
        const { data, status } = await api.post(
            '/api/upload',
            avatarData
        );

        return { data: data[0].id, status };
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
