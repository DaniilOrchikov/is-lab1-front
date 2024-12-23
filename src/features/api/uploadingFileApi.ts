import api from './index';

export const fetchHistory = async (): Promise<{
    id: number,
    status: string
}[]> => {
    const response = await api.get(`/import/history`);
    return response.data;
};

export const uploadFile = async (formData: FormData): Promise<number | null> => {
    const response = await api.post(`/import/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }});
    return response.data;
};
