import axios from 'axios';
import {Coordinates, Organization, Person, Worker} from '../types';
import {Md5} from "ts-md5";
import store from "../store";
import {logout} from "./slices/userSlice";

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

export const fetchAdminsQuery = async (): Promise<string[]> => {
    const response = await api.get('/admin_queue');
    return response.data;
}

export const addAdmin = async (name: string): Promise<void> => {
    await api.post('/admin', name);
}
export const deleteAdmin = async (name: string): Promise<void> => {
    await api.delete(`/admin_queue/${name}`);
}

// Worker

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

// Coordinates

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

// Organization

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

// Person

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