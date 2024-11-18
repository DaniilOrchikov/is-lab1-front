import api from './index';
import { Person } from '../../types';

export const fetchPersons = async (): Promise<Person[]> => {
    const response = await api.get('/persons');
    return response.data;
};

export const createPerson = async (person: Person): Promise<number> => {
    const response = await api.post('/persons', person);
    return response.data;
};

export const updatePersonById = async (person: Person): Promise<void> => {
    await api.put(`/persons/${person.id}`, person);
};

export const deletePersonById = async (id: number): Promise<void> => {
    await api.delete(`/persons/${id}`);
};