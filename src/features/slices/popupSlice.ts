import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {PopupTypes} from '../../types';
import store from "../../store";


const popupSlice = createSlice({
    name: 'popups',
    initialState: [] as { message:string, type: PopupTypes }[],
    reducers: {
        addPopup: (state, action: PayloadAction<{ message: string, duration: number, type:PopupTypes}>) => {
            state.push({message:action.payload.message, type:action.payload.type});

            setTimeout(() => {
                store.dispatch(deletePopup({message:action.payload.message, type:action.payload.type}));
            }, action.payload.duration);
        },
        deletePopup: (state, action: PayloadAction<{ message:string, type: PopupTypes }>) => {
            const index = state.findIndex(popup =>
                popup.message === action.payload.message && popup.type === action.payload.type
            );
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    }
});

export const { addPopup, deletePopup } = popupSlice.actions;

export default popupSlice.reducer;
