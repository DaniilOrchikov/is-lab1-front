import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {PopupTypes, Worker} from '../../types';
import {fetchWorkers, createWorker, updateWorkerById, deleteWorkerById} from '../api/workerApi';
import store from "../../store";
import {addPopup} from "./popupSlice";
import {format} from 'date-fns';

export const fetchWorkersThunk = createAsyncThunk('workers/fetchWorkers', async () => {
    return (await fetchWorkers()).map((worker) => {
        console.log(worker)
        worker.creationDate = format(new Date(worker.creationDate), 'dd.MM.yyyy')
        worker.startDate = format(new Date(worker.startDate), 'dd.MM.yyyy')
        return worker
    });
});

export const createWorkerThunk = createAsyncThunk(
    'workers/createWorker',
    async (worker: Worker) => {
        const {id, creationDate} = await createWorker(worker);
        store.dispatch(fetchWorkersThunk());
        store.dispatch(addPopup({message: `Worker successfully added`, duration: 5000, type: PopupTypes.SUCCESS}))
        return {...worker, id: id, creationDate: format(new Date(creationDate), 'dd.MM.yyyy')}
    }
);

export const updateWorkerThunk = createAsyncThunk(
    'workers/updateWorker',
    async (worker: Worker) => {
        await updateWorkerById(worker);
        store.dispatch(fetchWorkersThunk());
        store.dispatch(addPopup({message: `Worker successfully updated`, duration: 5000, type: PopupTypes.SUCCESS}))
        return worker;
    }
);

export const deleteWorkerByIdThunk = createAsyncThunk(
    'workers/deleteWorker',
    async (id: number) => {
        await deleteWorkerById(id);
        store.dispatch(fetchWorkersThunk());
        store.dispatch(addPopup({message: `Worker successfully deleted`, duration: 5000, type: PopupTypes.SUCCESS}))
        return id;
    }
);


const workerSlice = createSlice({
    name: 'workers',
    initialState: [] as Worker[],
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWorkersThunk.fulfilled, (state, action: PayloadAction<Worker[]>) => {
                return action.payload;
            })
            .addCase(createWorkerThunk.fulfilled, (state, action: PayloadAction<Worker>) => {
                state.push(action.payload);
            })
            .addCase(updateWorkerThunk.fulfilled, (state, action: PayloadAction<Worker>) => {
                const index = state.findIndex(worker => worker.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteWorkerByIdThunk.fulfilled, (state, action: PayloadAction<number>) => {
                const index = state.findIndex(worker => worker.id === action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            });
    },
});


export default workerSlice.reducer;
