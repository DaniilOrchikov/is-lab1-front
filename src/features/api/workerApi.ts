import api from './index';
import { Worker } from '../../types';

export const fetchWorkers = async (): Promise<Worker[]> => {
    const response = await api.get('/workers');
    return response.data;
};

export const createWorker = async (worker: Worker): Promise<{ id: number, creationDate: string }> => {
    const response = await api.post('/workers', worker);
    return response.data;
};

export const updateWorkerById = async (worker: Worker): Promise<void> => {
    await api.put(`/workers/${worker.id}`, worker);
};

export const deleteWorkerById = async (id: number): Promise<void> => {
    await api.delete(`/workers/${id}`);
};