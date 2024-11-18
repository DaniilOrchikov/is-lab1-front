import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Address, PopupTypes } from '../../types';
import {
    fetchAddresses,
    createAddress,
    updateAddressById,
    deleteAddressById,
} from '../api/addressApi';
import store from "../../store";
import { addPopup } from "./popupSlice";
import {setOrganizationFormValueAddressId} from "./formSlices/organizationFormSlice";

export const fetchAddressesThunk = createAsyncThunk('addresses/fetchAll', fetchAddresses);

export const createAddressThunk = createAsyncThunk(
    'addresses/create',
    async (address: Address) => {
        const id = await createAddress(address);
        store.dispatch(fetchAddressesThunk());
        store.dispatch(addPopup({message: `Address successfully added`, duration: 5000, type: PopupTypes.SUCCESS}));
        store.dispatch(setOrganizationFormValueAddressId(id))
        return { ...address, id };
    }
);

export const updateAddressThunk = createAsyncThunk(
    'addresses/update',
    async (address: Address) => {
        await updateAddressById(address);
        store.dispatch(fetchAddressesThunk());
        return address;
    }
);

export const deleteAddressByIdThunk = createAsyncThunk(
    'addresses/delete',
    async (id: number) => {
        await deleteAddressById(id);
        store.dispatch(fetchAddressesThunk());
        return id;
    }
);

const addressSlice = createSlice({
    name: 'addresses',
    initialState: [] as Address[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddressesThunk.fulfilled, (state, action: PayloadAction<Address[]>) => {
                return action.payload;
            })
            .addCase(createAddressThunk.fulfilled, (state, action: PayloadAction<Address>) => {
                state.push(action.payload);
            })
            .addCase(updateAddressThunk.fulfilled, (state, action: PayloadAction<Address>) => {
                const index = state.findIndex((addr) => addr.id === action.payload.id);
                if (index !== -1) state[index] = action.payload;
            })
            .addCase(deleteAddressByIdThunk.fulfilled, (state, action: PayloadAction<number>) => {
                const index = state.findIndex(addr => addr.id === action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            })
    },
});

export default addressSlice.reducer;