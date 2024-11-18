import api from './index';
import { Organization } from '../../types';

export const fetchOrganizations = async (): Promise<Organization[]> => {
    const response = await api.get('/organizations');
    return response.data;
};

export const createOrganization = async (organization: Organization): Promise<number> => {
    const response = await api.post('/organizations', organization);
    return response.data;
};

export const updateOrganizationById = async (organization: Organization): Promise<void> => {
    await api.put(`/organizations/${organization.id}`, organization);
};

export const deleteOrganizationById = async (id: number): Promise<void> => {
    await api.delete(`/organizations/${id}`);
};