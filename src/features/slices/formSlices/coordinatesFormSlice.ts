import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const coordinatesFormSlice = createSlice({
    name: 'coordinatesForm',
    initialState: {open: false, valueX: null, valueY: null, type: 'create', currentCoordinatesId: -1} as {
        open: boolean,
        valueX: number | null,
        valueY: number | null,
        type: 'update' | 'create',
        currentCoordinatesId: number
    },
    reducers: {
        setCoordinatesFormOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        },
        setCoordinatesFormValueX: (state, action: PayloadAction<number | null>) => {
            state.valueX = action.payload
        },
        setCoordinatesFormValueY: (state, action: PayloadAction<number | null>) => {
            state.valueY = action.payload
        },
        setCoordinatesFormType: (state, action: PayloadAction<'update' | 'create'>) => {
            state.type = action.payload
        },
        setCurrentCoordinatesId: (state, action: PayloadAction<number>) => {
            state.currentCoordinatesId = action.payload
        },
        resetCoordinatesForm:(state) => {
            return {open: state.open, valueX: null, valueY: null, type: state.type, currentCoordinatesId: -1}
        },
    }
});

export const {
    setCoordinatesFormOpen,
    setCoordinatesFormValueY,
    setCoordinatesFormValueX,
    setCoordinatesFormType,
    setCurrentCoordinatesId,
    resetCoordinatesForm
} = coordinatesFormSlice.actions;

export default coordinatesFormSlice.reducer;
