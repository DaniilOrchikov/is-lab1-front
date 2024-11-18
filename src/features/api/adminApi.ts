import api from './index';

export const fetchAdminsQuery = async (): Promise<string[]> => {
    const response = await api.get('/admin_queue');
    return response.data;
};

export const addAdmin = async (name: string): Promise<void> => {
    await api.post('/admin', { name });
};

export const deleteAdmin = async (name: string): Promise<void> => {
    await api.delete(`/admin_queue/${name}`);
};