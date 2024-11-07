import {configureStore} from '@reduxjs/toolkit'
import workerReducer from './features/slices/workersSlice'
import popupReducer from './features/slices/popupSlice'
import {useDispatch} from 'react-redux';
import {Coordinates, PopupTypes, Worker} from './types'
import coordinatesReducer from "./features/slices/coordinatesSlice";
import createCoordinatesReducer from "./features/slices/formSlices/createCoordinatesSlice";
import createWorkerReducer from "./features/slices/formSlices/createWorkerSlice";


export interface State {
    workers: Worker[];
    popups: { message: string, type: PopupTypes }[];
    coordinatesList: Coordinates[],
    createCoordinatesFormOpen: boolean,
    createWorkerFormOpen: boolean
}

const store = configureStore({
    reducer: {
        workers: workerReducer,
        popups: popupReducer,
        coordinatesList: coordinatesReducer,
        createCoordinatesFormOpen: createCoordinatesReducer,
        createWorkerFormOpen:createWorkerReducer
    },
})

export default store
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;