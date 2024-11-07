import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from "../../../types";

const workerFormSlice = createSlice({
    name: 'workerForm',
    initialState: {
        open: false,
        valueName: null,
        valueStatus: null,
        valueSalary: null,
        valueRating: null,
        valueCoordinatesId:null,
        type: 'create',
        currentWorkerId: -1
    } as {
        open: boolean,
        valueName: string | null,
        valueStatus: Status | null,
        valueSalary: number | null,
        valueRating: number | null,
        valueCoordinatesId:number|null,
        type: 'update' | 'create',
        currentWorkerId: number
    },
    reducers: {
        setWorkerFormOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setWorkerFormValueName: (state, action: PayloadAction<string | null>) => {
            state.valueName = action.payload;
        },
        setWorkerFormValueStatus: (state, action: PayloadAction<Status | null>) => {
            state.valueStatus = action.payload;
        },
        setWorkerFormValueSalary: (state, action: PayloadAction<number | null>) => {
            state.valueSalary = action.payload;
        },
        setWorkerFormValueRating: (state, action: PayloadAction<number | null>) => {
            state.valueRating = action.payload;
        },
        setWorkerFormType: (state, action: PayloadAction<'update' | 'create'>) => {
            state.type = action.payload;
        },
        setCurrentWorkerId: (state, action: PayloadAction<number>) => {
            state.currentWorkerId = action.payload;
        },
        setWorkerFormValueCoordinatesId: (state, action: PayloadAction<number|null>) => {
            state.valueCoordinatesId = action.payload;
        },
        resetWorkerForm: (state) => {
            return{
                open: state.open,
                valueName: null,
                valueStatus: null,
                valueSalary: null,
                valueRating: null,
                valueCoordinatesId:null,
                type: state.type,
                currentWorkerId: -1
            }
        },
    },
});

export const {
    setWorkerFormOpen,
    setWorkerFormValueName,
    setWorkerFormValueStatus,
    setWorkerFormValueSalary,
    setWorkerFormValueRating,
    setWorkerFormType,
    setCurrentWorkerId,
    setWorkerFormValueCoordinatesId,
    resetWorkerForm
} = workerFormSlice.actions;

export default workerFormSlice.reducer;