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
import locationReducer from "./features/slices/locationSlice";
import organizationFormReducer from "./features/slices/formSlices/organizationFormSlice";
import personFormReducer from "./features/slices/formSlices/personFormSlice";
import locationFormReducer from "./features/slices/formSlices/locationFormSlice";
import addressReducer from './features/slices/addressSlice';
import addressFormReducer from './features/slices/formSlices/addressFormSlice';


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
        locations: locationReducer,
        popups: popupReducer,
        coordinatesList: coordinatesReducer,
        coordinatesForm: coordinatesFormReducer,
        organizationForm: organizationFormReducer,
        workerForm: workerFormReducer,
        personForm: personFormReducer,
        locationForm: locationFormReducer,
        user: persistedUserReducer,
        addresses: addressReducer,
        addressForm: addressFormReducer,
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