import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Coordinates, PopupTypes} from '../../types';
import {
    fetchCoordinates, createCoordinates, updateCoordinatesById, deleteCoordinatesById
} from '../api/coordinatesApi';
import store from "../../store";
import {addPopup} from "./popupSlice";
import {setWorkerFormValueCoordinatesId} from "./formSlices/workerFormSlice";

export const fetchCoordinatesThunk = createAsyncThunk('coordinates/fetchCoordinates', async () => {
    return await fetchCoordinates();
});

export const createCoordinatesThunk = createAsyncThunk(
    'coordinates/createCoordinates',
    async (coordinates: Coordinates) => {
        const id = await createCoordinates(coordinates) as number;
        store.dispatch(fetchCoordinatesThunk());
        store.dispatch(addPopup({message: `Coordinates successfully added`, duration: 5000, type: PopupTypes.SUCCESS}))
        store.dispatch(setWorkerFormValueCoordinatesId(id))
        return {...coordinates, id: id} as Coordinates
    }
);

export const updateCoordinatesThunk = createAsyncThunk(
    'coordinates/updateCoordinates',
    async (coordinates: Coordinates) => {
        await updateCoordinatesById(coordinates);
        store.dispatch(fetchCoordinatesThunk());
        store.dispatch(addPopup({message: `Coordinates successfully updated`, duration: 5000, type: PopupTypes.SUCCESS}))
        return coordinates;
    }
);

export const deleteCoordinatesByIdThunk = createAsyncThunk(
    'coordinates/deleteCoordinates',
    async (id: number) => {
        await deleteCoordinatesById(id);
        store.dispatch(fetchCoordinatesThunk());
        store.dispatch(addPopup({message: `Coordinates successfully deleted`, duration: 5000, type: PopupTypes.SUCCESS}))
        return id;
    }
);


const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState: [] as Coordinates[],
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCoordinatesThunk.fulfilled, (state, action: PayloadAction<Coordinates[]>) => {
                return action.payload;
            })
            .addCase(createCoordinatesThunk.fulfilled, (state, action: PayloadAction<Coordinates>) => {
                state.push(action.payload);
            })
            .addCase(updateCoordinatesThunk.fulfilled, (state, action: PayloadAction<Coordinates>) => {
                const index = state.findIndex(worker => worker.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteCoordinatesByIdThunk.fulfilled, (state, action: PayloadAction<number>) => {
                const index = state.findIndex(coordinates => coordinates.id === action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            });
    },
});


export default coordinatesSlice.reducer;
