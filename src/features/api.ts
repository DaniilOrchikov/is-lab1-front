import axios from 'axios';
import {Coordinates, Worker} from '../types';


const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchWorkers = async (): Promise<Worker[]> => {
    const response = await api.get('/workers');
    return response.data;
};


export const createWorker = async (worker: Worker): Promise<number> => {
    const response = await api.post('/workers', worker);
    return response.data;
};

export const updateWorkerById = async (worker: Worker): Promise<void> => {
    const response = await api.put(`/workers/${worker.id}`, worker);
};

export const deleteWorkerById = async (id: number): Promise<void> => {
    await api.delete(`/workers/${id}`);
};

export const fetchCoordinates = async (): Promise<Coordinates[]> => {
    const response = await api.get('/coordinates');
    return response.data;
};


export const createCoordinates = async (Coordinates: Coordinates): Promise<number> => {
    const response = await api.post('/coordinates', Coordinates);
    return response.data;
};

export const updateCoordinatesById = async (Coordinates: Coordinates): Promise<void> => {
    const response = await api.put(`/coordinates/${Coordinates.id}`, Coordinates);
};

export const deleteCoordinatesById = async (id: number): Promise<void> => {
    await api.delete(`/coordinates/${id}`);
};