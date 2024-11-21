import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const locationFormSlice = createSlice({
    name: 'locationForm',
    initialState: {
        open: false,
        valueX: null,
        valueY: null,
        valueZ: null,
        valueName: "",
        type: 'create',
        currentLocationId: -1,
        canUpdateObject: false
    } as {
        open: boolean,
        valueX: number | null,
        valueY: number | null,
        valueZ: number | null,
        valueName: string,
        type: 'update' | 'create',
        currentLocationId: number,
        creatorName: string | null,
        canUpdateObject: boolean
    },
    reducers: {
        setLocationFormOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        },
        setLocationFormValueX: (state, action: PayloadAction<number | null>) => {
            state.valueX = action.payload
        },
        setLocationFormValueY: (state, action: PayloadAction<number | null>) => {
            state.valueY = action.payload
        },
        setLocationFormValueZ: (state, action: PayloadAction<number | null>) => {
            state.valueZ = action.payload
        },
        setLocationFormValueName: (state, action: PayloadAction<string>) => {
            state.valueName = action.payload
        },
        setLocationFormType: (state, action: PayloadAction<'update' | 'create'>) => {
            state.type = action.payload
        },
        setLocationFormCreatorName: (state, action: PayloadAction<string | null>) => {
            state.creatorName = action.payload
        },
        setLocationFormCanUpdateObject: (state, action: PayloadAction<boolean>) => {
            state.canUpdateObject = action.payload
        },
        setCurrentLocationId: (state, action: PayloadAction<number>) => {
            state.currentLocationId = action.payload
        },
        resetLocationForm: (state) => {
            return {
                open: state.open,
                valueX: null,
                valueY: null,
                valueZ: null,
                valueName: "",
                type: state.type,
                currentLocationId: -1,
                creatorName: null,
                canUpdateObject: state.canUpdateObject
            }
        },
    }
});

export const {
    setLocationFormOpen,
    setLocationFormValueY,
    setLocationFormValueX,
    setLocationFormType,
    setCurrentLocationId,
    setLocationFormCreatorName,
    resetLocationForm,
    setLocationFormCanUpdateObject,
    setLocationFormValueZ,
    setLocationFormValueName
} = locationFormSlice.actions;

export default locationFormSlice.reducer;
