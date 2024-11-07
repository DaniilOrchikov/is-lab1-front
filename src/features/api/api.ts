import axios from 'axios';
import {Coordinates, Worker} from '../../types';
import {Md5} from "ts-md5";
import store from "../../store";
import {logout} from "../slices/userSlice";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);
export const configureApiWithAuth = (username: string, password: string) => {
    const hashedPassword = Md5.hashStr(password);
    api.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ':' + hashedPassword)}`;
};
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


export const createCoordinates = async (coordinates: Coordinates): Promise<number> => {
    const response = await api.post('/coordinates', coordinates);
    return response.data;
};

export const updateCoordinatesById = async (coordinates: Coordinates): Promise<void> => {
    const response = await api.put(`/coordinates/${coordinates.id}`, coordinates);
};

export const deleteCoordinatesById = async (id: number): Promise<void> => {
    await api.delete(`/coordinates/${id}`);
};