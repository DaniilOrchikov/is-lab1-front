import {configureStore} from '@reduxjs/toolkit'
import workerReducer from './features/slices/workersSlice'
import popupReducer from './features/slices/popupSlice'
import {useDispatch} from 'react-redux';
import coordinatesReducer from "./features/slices/coordinatesSlice";
import coordinatesFormReducer from "./features/slices/formSlices/coordinatesFormSlice";
import workerFormReducer from "./features/slices/formSlices/workerFormSlice";


const store = configureStore({
    reducer: {
        workers: workerReducer,
        popups: popupReducer,
        coordinatesList: coordinatesReducer,
        coordinatesForm: coordinatesFormReducer,
        workerForm: workerFormReducer,
    },
})

export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;