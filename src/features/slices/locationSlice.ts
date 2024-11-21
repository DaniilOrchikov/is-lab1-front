import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Location, PopupTypes} from '../../types';
import {
    fetchLocations, createLocation, updateLocationById, deleteLocationById
} from '../api/locationApi';
import store from "../../store";
import {addPopup} from "./popupSlice";
import {setPersonFormValueLocationId} from "./formSlices/personFormSlice";

export const fetchLocationsThunk = createAsyncThunk('location/fetch', async () => {
    return await fetchLocations();
});

export const createLocationThunk = createAsyncThunk(
    'location/create',
    async (location: Location) => {
        const id = await createLocation(location) as number;
        store.dispatch(fetchLocationsThunk());
        store.dispatch(addPopup({message: `Location successfully added`, duration: 5000, type: PopupTypes.SUCCESS}))
        store.dispatch(setPersonFormValueLocationId(id))
        return {...location, id: id} as Location
    }
);

export const updateLocationThunk = createAsyncThunk(
    'location/update',
    async (location: Location) => {
        await updateLocationById(location);
        store.dispatch(fetchLocationsThunk());
        store.dispatch(addPopup({message: `Location successfully updated`, duration: 5000, type: PopupTypes.SUCCESS}))
        return location;
    }
);

export const deleteLocationByIdThunk = createAsyncThunk(
    'location/delete',
    async (id: number) => {
        await deleteLocationById(id);
        store.dispatch(fetchLocationsThunk());
        store.dispatch(addPopup({message: `Location successfully deleted`, duration: 5000, type: PopupTypes.SUCCESS}))
        return id;
    }
);


const locationSlice = createSlice({
    name: 'location',
    initialState: [] as Location[],
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLocationsThunk.fulfilled, (state, action: PayloadAction<Location[]>) => {
                return action.payload;
            })
            .addCase(createLocationThunk.fulfilled, (state, action: PayloadAction<Location>) => {
                state.push(action.payload);
            })
            .addCase(updateLocationThunk.fulfilled, (state, action: PayloadAction<Location>) => {
                const index = state.findIndex(worker => worker.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteLocationByIdThunk.fulfilled, (state, action: PayloadAction<number>) => {
                const index = state.findIndex(location => location.id === action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            });
    },
});


export default locationSlice.reducer;
