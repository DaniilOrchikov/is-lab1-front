import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopupTypes } from '../../types';
import store from '../../store';

let popupIdCounter = 0;

const popupSlice = createSlice({
    name: 'popups',
    initialState: [] as { id: number; message: string; type: PopupTypes }[],
    reducers: {
        addPopup: (state, action: PayloadAction<{ message: string; duration: number; type: PopupTypes }>) => {
            const newPopup = {
                id: popupIdCounter++,
                message: action.payload.message,
                type: action.payload.type,
            };
            state.push(newPopup);

            setTimeout(() => {
                store.dispatch(deletePopup({ id: newPopup.id }));
            }, action.payload.duration);
        },
        deletePopup: (state, action: PayloadAction<{ id: number }>) => {
            const index = state.findIndex(popup => popup.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addPopup, deletePopup } = popupSlice.actions;

export default popupSlice.reducer;