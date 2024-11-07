import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const createCoordinatesSlice = createSlice({
    name: 'popups',
    initialState: false,
    reducers: {
        setCreateCoordinatesOpen: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }
});

export const {setCreateCoordinatesOpen} = createCoordinatesSlice.actions;

export default createCoordinatesSlice.reducer;
