import api from './index';

export const fetchAdminApplications = async (): Promise<{ id:number, userName: string}[]> => {
    const response = await api.get('/admin/applications');
    return response.data;
};

export const approveAdminApplication = async (applicationId: number): Promise<number> => {
    const response =  await api.post(`/admin/applications/${applicationId}/approve`);
    return response.status
};

export const rejectAdminApplication = async (applicationId: number): Promise<number> => {
    const response =  await api.post(`/admin/applications/${applicationId}/reject`);
    return response.status
};