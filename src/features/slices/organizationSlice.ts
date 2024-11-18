import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Organization, PopupTypes} from '../../types';
import {
    fetchOrganizations,
    createOrganization,
    updateOrganizationById,
    deleteOrganizationById,
} from '../api/organizationApi';
import store from "../../store";
import {addPopup} from "./popupSlice";
import {setWorkerFormValueOrganizationId} from "./formSlices/workerFormSlice";

export const fetchOrganizationsThunk = createAsyncThunk('organizations/fetchAll', fetchOrganizations);

export const createOrganizationThunk = createAsyncThunk(
    'organizations/create',
    async (organization: Organization) => {
        const id = await createOrganization(organization);
        store.dispatch(fetchOrganizationsThunk());
        store.dispatch(addPopup({message: `Organization successfully added`, duration: 5000, type: PopupTypes.SUCCESS}))
        store.dispatch(setWorkerFormValueOrganizationId(id))
        return {...organization, id};
    }
);

export const updateOrganizationThunk = createAsyncThunk(
    'organizations/update',
    async (organization: Organization) => {
        await updateOrganizationById(organization);
        store.dispatch(fetchOrganizationsThunk());
        return organization;
    }
);
export const deleteOrganizationByIdThunk = createAsyncThunk(
    'organizations/delete',
    async (id: number) => {
        await deleteOrganizationById(id);
        store.dispatch(fetchOrganizationsThunk());
        return id;
    }
);

const organizationSlice = createSlice({
    name: 'organizations',
    initialState: [] as Organization[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizationsThunk.fulfilled, (state, action: PayloadAction<Organization[]>) => {
                return action.payload
            })
            .addCase(createOrganizationThunk.fulfilled, (state, action: PayloadAction<Organization>) => {
                state.push(action.payload);
            })
            .addCase(updateOrganizationThunk.fulfilled, (state, action: PayloadAction<Organization>) => {
                const index = state.findIndex((org) => org.id === action.payload.id);
                if (index !== -1) state[index] = action.payload;
            })
            .addCase(deleteOrganizationByIdThunk.fulfilled, (state, action: PayloadAction<number>) => {
                const index = state.findIndex(org => org.id === action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            })
    },
});

export default organizationSlice.reducer;