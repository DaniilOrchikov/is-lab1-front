import api from './index';
import { Location } from '../../types';

export const fetchLocations = async (): Promise<Location[]> => {
    const response = await api.get('/locations');
    return response.data;
};

export const createLocation = async (location: Location): Promise<number> => {
    const response = await api.post('/locations', location);
    return response.data;
};

export const updateLocationById = async (location: Location): Promise<void> => {
    await api.put(`/locations/${location.id}`, location);
};

export const deleteLocationById = async (id: number): Promise<void> => {
    await api.delete(`/locations/${id}`);
};