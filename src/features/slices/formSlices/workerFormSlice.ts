import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Position, Status} from "../../../types";
import {format} from "date-fns";
import dayjs from "dayjs";

const workerFormSlice = createSlice({
    name: 'workerForm',
    initialState: {
        open: false,
        valueCreationDate: null,
        valueName: "",
        valueStatus: "",
        valuePosition: "",
        valueSalary: null,
        valueRating: null,
        valueCoordinatesId: null,
        valueOrganizationId: null,
        valuePersonId: null,
        creatorName: "",
        valueStartDate: format(dayjs().toDate(), 'dd.MM.yyyy'),
        type: 'create',
        currentWorkerId: -1,
        canUpdateObject: false
    } as {
        open: boolean,
        valueCreationDate: string | null,
        valueName: string,
        valueStatus: Status | string,
        valuePosition: Position | string,
        valueSalary: number | null,
        valueRating: number | null,
        valueCoordinatesId: number | null,
        valueOrganizationId: number | null,
        valuePersonId: number | null,
        valueStartDate: string | null,
        creatorName: string,
        type: 'update' | 'create',
        currentWorkerId: number,
        canUpdateObject: boolean
    },
    reducers: {
        setWorkerFormOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setWorkerFormValueCreationDate: (state, action: PayloadAction<string | null>) => {
            state.valueCreationDate = action.payload;
        },
        setWorkerFormValueName: (state, action: PayloadAction<string>) => {
            state.valueName = action.payload;
        },
        setWorkerFormValueStatus: (state, action: PayloadAction<Status | string>) => {
            state.valueStatus = action.payload;
        },
        setWorkerFormValuePosition: (state, action: PayloadAction<Position | string>) => {
            state.valuePosition = action.payload;
        },
        setWorkerFormValueSalary: (state, action: PayloadAction<number | null>) => {
            state.valueSalary = action.payload;
        },
        setWorkerFormValueRating: (state, action: PayloadAction<number | null>) => {
            state.valueRating = action.payload;
        },
        setWorkerFormValueStartDate: (state, action: PayloadAction<string | null>) => {
            state.valueStartDate = action.payload;
        },
        setWorkerFormType: (state, action: PayloadAction<'update' | 'create'>) => {
            state.type = action.payload;
        },
        setCurrentWorkerId: (state, action: PayloadAction<number>) => {
            state.currentWorkerId = action.payload;
        },
        setWorkerFormValueCoordinatesId: (state, action: PayloadAction<number | null>) => {
            state.valueCoordinatesId = action.payload;
        },
        setWorkerFormValueOrganizationId: (state, action: PayloadAction<number | null>) => {
            state.valueOrganizationId = action.payload;
        },
        setWorkerFormCreatorName: (state, action: PayloadAction<string>) => {
            state.creatorName = action.payload
        },
        setWorkerFormCanUpdateObject: (state, action: PayloadAction<boolean>) => {
            state.canUpdateObject = action.payload
        },
        setWorkerFormValuePersonId: (state, action: PayloadAction<number | null>) => {
            state.valuePersonId = action.payload;
        },
        resetWorkerForm: (state) => {
            return {
                open: state.open,
                valueCreationDate: null,
                valueName: "",
                valueStatus: "",
                valueSalary: null,
                valueRating: null,
                valuePosition: "",
                valueCoordinatesId: null,
                valueOrganizationId: null,
                valuePersonId: null,
                valueStartDate: format(dayjs().toDate(), 'dd.MM.yyyy'),
                creatorName: "",
                type: state.type,
                currentWorkerId: -1,
                canUpdateObject: state.canUpdateObject
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
    resetWorkerForm,
    setWorkerFormValueOrganizationId,
    setWorkerFormValuePersonId,
    setWorkerFormCreatorName,
    setWorkerFormCanUpdateObject,
    setWorkerFormValuePosition,
    setWorkerFormValueCreationDate,
    setWorkerFormValueStartDate
} = workerFormSlice.actions;

export default workerFormSlice.reducer;