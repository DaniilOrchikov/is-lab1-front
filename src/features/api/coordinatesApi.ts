import api from './index';
import { Coordinates } from '../../types';

export const fetchCoordinates = async (): Promise<Coordinates[]> => {
    const response = await api.get('/coordinates');
    return response.data;
};

export const createCoordinates = async (coordinates: Coordinates): Promise<number> => {
    const response = await api.post('/coordinates', coordinates);
    return response.data;
};

export const updateCoordinatesById = async (coordinates: Coordinates): Promise<void> => {
    await api.put(`/coordinates/${coordinates.id}`, coordinates);
};

export const deleteCoordinatesById = async (id: number): Promise<void> => {
    await api.delete(`/coordinates/${id}`);
};