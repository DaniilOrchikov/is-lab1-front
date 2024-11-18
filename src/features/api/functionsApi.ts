import api from './index';

export const deleteByPerson = async (personId: number): Promise<boolean> => {
    const response = await api.delete(`/worker/person/${personId}`);
    return response.data;
};

export const countByPerson = async (personId: number): Promise<number> => {
    const response = await api.get(`/worker/person/${personId}`);
    return response.data;
};

export const filterByStartDate = async (startDate: string): Promise<number[]> => {
    const response = await api.get(`/worker/started_before/${startDate}`);
    return response.data;
};

export const hireEmployee = async (workerId: number, organizationId: number): Promise<void> => {
    await api.post(`/organization/hire`, {workerId, organizationId});
};

export const adjustEmployeeSalary = async (workerId: number, coefficient: number): Promise<number> => {
    const response = await api.post(`/worker/index`, {workerId, coefficient});
    return response.data;
};