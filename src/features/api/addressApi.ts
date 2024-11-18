import api from './index';
import { Address } from '../../types';

export const fetchAddresses = async (): Promise<Address[]> => {
    const response = await api.get('/addresses');
    return response.data;
};

export const createAddress = async (address: Address): Promise<number> => {
    const response = await api.post('/addresses', address);
    return response.data;
};

export const updateAddressById = async (address: Address): Promise<void> => {
    await api.put(`/addresses/${address.id}`, address);
};

export const deleteAddressById = async (id: number): Promise<void> => {
    await api.delete(`/addresses/${id}`);
};