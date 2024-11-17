import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';
import workerReducer from './features/slices/workersSlice';
import popupReducer from './features/slices/popupSlice';
import coordinatesReducer from './features/slices/coordinatesSlice';
import coordinatesFormReducer from './features/slices/formSlices/coordinatesFormSlice';
import workerFormReducer from './features/slices/formSlices/workerFormSlice';
import userReducer from './features/slices/userSlice';
import organizationReducer from "./features/slices/organizationSlice";
import personReducer from "./features/slices/personSlice";
import organizationFormReducer from "./features/slices/formSlices/organizationFormSlice";
import personFormReducer from "./features/slices/formSlices/personFormSlice";

const userPersistConfig = {
    key: 'user',
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
    reducer: {
        workers: workerReducer,
        organizations: organizationReducer,
        persons: personReducer,
        popups: popupReducer,
        coordinatesList: coordinatesReducer,
        coordinatesForm: coordinatesFormReducer,
        organizationForm: organizationFormReducer,
        workerForm: workerFormReducer,
        personForm: personFormReducer,
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;