import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const createWorkerSlice = createSlice({
    name: 'popups',
    initialState: false,
    reducers: {
        setCreateWorkerOpen: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }
});

export const {setCreateWorkerOpen} = createWorkerSlice.actions;

export default createWorkerSlice.reducer;
