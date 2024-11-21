import api from './index';

export const adminRequest = async (): Promise<number> => {
    const response = await api.post('/admin/request-access');
    return response.status;
};

export const adminApplicationStatus = async (): Promise<{status:string}> => {
    const response =  await api.get(`/admin/application-status`);
    return response.data
};